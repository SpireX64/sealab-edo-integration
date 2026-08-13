import { describe, expect, it } from "vitest";
import {
    DriverLicenseCategory,
    EmployeeGender,
    EmployeeRole,
    type TEmployeeInput,
} from "../src/index";
import { createClient, ETRN_CREDENTIALS } from "./helpers";

describe("Сотрудники (СБИС.ЗаписатьСотрудника и др.)", () => {
    it("проходит цикл: создание → чтение → список → обновление", async () => {
        const client = createClient();
        try {
            console.log("[СОТР] Логин:", ETRN_CREDENTIALS.login);
            await client.login(ETRN_CREDENTIALS);

            // Уникальный внешний идентификатор, чтобы не задевать чужие записи.
            const externalId = `e2e-emp-${Date.now()}`;

            const input: TEmployeeInput = {
                externalId,
                lastName: "Петров",
                firstName: "Иван",
                middleName: "Сидорович",
                gender: EmployeeGender.Male,
                birthDate: new Date("1990-05-15"),
                roles: [EmployeeRole.Driver],
                passport: {
                    series: "4510",
                    number: "123456",
                    issueDate: new Date("2010-01-01"),
                    issuedBy: "ОУФМС",
                },
                driverLicense: {
                    seriesNumber: "9901123456",
                    validFrom: new Date("2015-02-03"),
                    categories: [DriverLicenseCategory.B, DriverLicenseCategory.C],
                },
            };

            // 1. Создание сотрудника.
            console.log("[СОТР] 1. Запись сотрудника (СБИС.ЗаписатьСотрудника)...");
            const created = await client.employees.write({ ...input });
            console.log("[СОТР] 1. Ответ:", JSON.stringify(created));

            expect(created.id).toBeTypeOf("string");
            expect(created.id.length).toBeGreaterThan(0);
            expect(created.externalId).toBe(externalId);
            expect(created.lastName).toBe("Петров");
            expect(created.firstName).toBe("Иван");
            expect(created.middleName).toBe("Сидорович");
            expect(created.birthDate).toBe("15.05.1990");

            // 2. Чтение по внешнему идентификатору.
            console.log("[СОТР] 2. Чтение сотрудника (СБИС.ПрочитатьСотрудника)...");
            const read = await client.employees.get({ externalId });
            console.log("[СОТР] 2. Ответ:", JSON.stringify(read));

            expect(read.id).toBe(created.id);
            expect(read.externalId).toBe(externalId);
            expect(read.lastName).toBe("Петров");

            // 3. Список сотрудников с пагинацией.
            console.log("[СОТР] 3. Список сотрудников (СБИС.СписокСотрудников)...");
            const list = await client.employees.getList({ pagination: { page: 0, pageSize: 500 } });
            const items = list["Сотрудник"];
            console.log("[СОТР] 3. Всего записей:", Array.isArray(items) ? items.length : "n/a");

            expect(Array.isArray(items)).toBe(true);
            if (Array.isArray(items)) {
                expect(items.length).toBeGreaterThan(0);
                const first = items[0]!;
                expect(first.id).toBeTypeOf("string");
                expect(first.lastName).toBeTypeOf("string");
                expect(first.firstName).toBeTypeOf("string");
                expect(Array.isArray(first.roles)).toBe(true);
            }

            // 4. Обновление — тот же externalId, новое значение поля.
            console.log("[СОТР] 4. Обновление сотрудника...");
            const updated = await client.employees.write({ ...input, lastName: "Петров-Изменённый" });
            console.log("[СОТР] 4. Ответ:", JSON.stringify(updated));

            expect(updated.id).toBe(created.id);
            expect(updated.externalId).toBe(externalId);
            expect(updated.lastName).toBe("Петров-Изменённый");
        } finally {
            client.dispose();
        }
    });
});
