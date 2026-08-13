import { describe, expect, it } from "vitest";
import { Document1110361 } from "./fixtures/ezz";
import { ezzFixture } from "./fixtures/ezz";
import { EzzAction } from "../src/index";
import { CERT_THUMBPRINT, createClient, EZZ_CREDENTIALS } from "./helpers";

describe("ЭЗЗ Т1 (заказчик)", () => {
    it("проходит цикл: генерация → запись → подготовка", async () => {
        const client = createClient();
        try {
            console.log("[ЭЗЗ] 0. Логин:", EZZ_CREDENTIALS.login);
            const sessionId = await client.login(EZZ_CREDENTIALS);
            console.log("[ЭЗЗ] 0. Ответ СБИС.Аутентифицировать:", JSON.stringify(sessionId));

            // 1. Генерация вложения из конструктора документа
            console.log("[ЭЗЗ] 1. Генерация вложения (СБИС.СгенерироватьВложение)...");
            const attachment = await client.generateAttachment(Document1110361(ezzFixture));
            console.log("[ЭЗЗ] 1. Ответ СБИС.СгенерироватьВложение:", JSON.stringify(attachment));

            expect(attachment.Вложение.length).toBeGreaterThan(0);
            expect(attachment.Вложение[0]!.Файл.Имя).toMatch(/\.xml$/i);

            // 2. Создание нового документа (Т1)
            console.log("[ЭЗЗ] 2. Запись документа (СБИС.ЗаписатьДокумент)...");
            const card = await client.writeDocument(attachment);
            console.log("[ЭЗЗ] 2. Ответ СБИС.ЗаписатьДокумент:", JSON.stringify(card));

            expect(card.Идентификатор).toBeTypeOf("string");
            expect(card.Идентификатор.length).toBeGreaterThan(0);

            // 3. Подготовка действия (подписи)
            console.log("[ЭЗЗ] 3. Подготовка действия (СБИС.ПодготовитьДействие)...");
            const prepared = await client.prepareAction(card, {
                action: EzzAction.Send,
                comment: "e2e-тест saby-tms-client",
                certificateThumbprint: CERT_THUMBPRINT,
            });
            console.log("[ЭЗЗ] 3. Ответ СБИС.ПодготовитьДействие:", JSON.stringify(prepared));
        } finally {
            client.dispose();
        }
    });
});
