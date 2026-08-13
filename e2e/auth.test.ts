import { describe, expect, it } from "vitest";
import { createClient, ETRN_CREDENTIALS } from "./helpers";

describe("СБИС.Аутентифицировать", () => {
    it("возвращает идентификатор сессии по логину и паролю", async () => {
        const client = createClient();
        try {
            console.log("[АУТ] Логин:", ETRN_CREDENTIALS.login);
            const sessionId = await client.login(ETRN_CREDENTIALS);
            console.log("[АУТ] Ответ СБИС.Аутентифицировать:", JSON.stringify(sessionId));

            expect(sessionId).toBeTypeOf("string");
            expect(sessionId.length).toBeGreaterThan(0);
            expect(client.sessionId).toBe(sessionId);
        } finally {
            client.dispose();
        }
    });
});
