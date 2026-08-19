import { describe, expect, it } from "vitest";
import { Document1110380 } from "./fixtures/epl";
import { eplFixture } from "./fixtures/epl";
import { EplAction, mapDocument1110380 } from "../src/index";
import { CERT_THUMBPRINT, createClient, EPL_CREDENTIALS } from "./helpers";

describe("ЭПЛ Т1 (обстоятельства и особенности рейса)", () => {
    it("проходит цикл: генерация → запись → подготовка", async () => {
        const client = createClient();
        try {
            console.log("[ЭПЛ] 0. Логин:", EPL_CREDENTIALS.login);
            const sessionId = await client.login(EPL_CREDENTIALS);
            console.log("[ЭПЛ] 0. Ответ СБИС.Аутентифицировать:", JSON.stringify(sessionId));

            // 1. Генерация вложения из конструктора документа
            console.log("[ЭПЛ] 1. Генерация вложения (СБИС.СгенерироватьВложение)...");
            const attachment = await client.generateAttachment(mapDocument1110380(Document1110380(eplFixture)));
            console.log("[ЭПЛ] 1. Ответ СБИС.СгенерироватьВложение:", JSON.stringify(attachment));

            expect(attachment.Вложение.length).toBeGreaterThan(0);
            expect(attachment.Вложение[0]!.Файл.Имя).toMatch(/\.xml$/i);

            // 2. Создание нового документа (Т1)
            console.log("[ЭПЛ] 2. Запись документа (СБИС.ЗаписатьДокумент)...");
            const card = await client.writeDocument(attachment);
            console.log("[ЭПЛ] 2. Ответ СБИС.ЗаписатьДокумент:", JSON.stringify(card));

            expect(card.Идентификатор).toBeTypeOf("string");
            expect(card.Идентификатор.length).toBeGreaterThan(0);

            // 3. Подготовка действия (подписи)
            console.log("[ЭПЛ] 3. Подготовка действия (СБИС.ПодготовитьДействие)...");
            const prepared = await client.prepareAction(card, {
                action: EplAction.Send,
                comment: "e2e-тест saby-tms-client",
                certificateThumbprint: CERT_THUMBPRINT,
            });
            console.log("[ЭПЛ] 3. Ответ СБИС.ПодготовитьДействие:", JSON.stringify(prepared));
        } finally {
            client.dispose();
        }
    });
});
