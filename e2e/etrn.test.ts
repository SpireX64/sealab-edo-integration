import { describe, expect, it } from "vitest";
import { Document111339 } from "./fixtures/etrn";
import { etrnFixture } from "./fixtures/etrn";
import { EtRnAction, mapDocument1110339 } from "../src/index";
import { CERT_THUMBPRINT, createClient, ETRN_CREDENTIALS } from "./helpers";

describe("ЭТрН Т1 (грузоотправитель)", () => {
    it("проходит цикл: генерация → запись → подготовка → чтение → статусы", async () => {
        const client = createClient();
        try {
            console.log("[ЭТрН] 0. Логин:", ETRN_CREDENTIALS.login);
            const sessionId = await client.login(ETRN_CREDENTIALS);
            console.log("[ЭТрН] 0. Ответ СБИС.Аутентифицировать:", JSON.stringify(sessionId));

            // 1. Генерация вложения из конструктора документа
            console.log("[ЭТрН] 1. Генерация вложения (СБИС.СгенерироватьВложение)...");
            const attachment = await client.generateAttachment(mapDocument1110339(Document111339(etrnFixture)));
            console.log("[ЭТрН] 1. Ответ СБИС.СгенерироватьВложение:", JSON.stringify(attachment));

            expect(attachment.Вложение.length).toBeGreaterThan(0);

            const file = attachment.Вложение[0]!;
            console.log("[ЭТрН] 1. Имя файла:", file.Файл.Имя, "| размер base64:", file.Файл.ДвоичныеДанные.length);
            expect(file.Файл.ДвоичныеДанные.length).toBeGreaterThan(0);
            expect(file.Файл.Имя).toMatch(/\.xml$/i);

            // 2. Создание нового документа (Т1)
            console.log("[ЭТрН] 2. Запись документа (СБИС.ЗаписатьДокумент)...");
            const card = await client.writeDocument(attachment);
            console.log("[ЭТрН] 2. Ответ СБИС.ЗаписатьДокумент:", JSON.stringify(card));

            expect(card.Идентификатор).toBeTypeOf("string");
            expect(card.Идентификатор.length).toBeGreaterThan(0);

            // 3. Подготовка действия (подписи) — получение хеша
            console.log("[ЭТрН] 3. Подготовка действия (СБИС.ПодготовитьДействие)...");
            const prepared = await client.prepareAction(card, {
                action: EtRnAction.Loaded,
                comment: "e2e-тест saby-tms-client",
                certificateThumbprint: CERT_THUMBPRINT,
            });
            console.log("[ЭТрН] 3. Ответ СБИС.ПодготовитьДействие:", JSON.stringify(prepared));

            // 4. Чтение карточки документа
            console.log("[ЭТрН] 4. Чтение документа (СБИС.ПрочитатьДокумент)...");
            const read = await client.readDocument(card, "Расширение,ЭПД");
            console.log("[ЭТрН] 4. Ответ СБИС.ПрочитатьДокумент:", JSON.stringify(read));
            expect(read.Идентификатор).toBe(card.Идентификатор);

            // 5. Список изменений по созданному документу
            console.log("[ЭТрН] 5. Список изменений (СБИС.СписокИзменений)...");
            const changes = await client.listChanges(card);
            console.log("[ЭТрН] 5. Ответ СБИС.СписокИзменений:", JSON.stringify(changes));
            expect(changes).toBeDefined();
        } finally {
            client.dispose();
        }
    });
});
