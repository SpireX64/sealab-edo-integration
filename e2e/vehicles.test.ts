import { describe, expect, it } from "vitest";
import { VehicleType } from "../src/index";
import { createClient, EPL_CREDENTIALS } from "./helpers";

describe("Транспортные средства (sabyVehicle.*)", () => {
    it("проходит цикл: создание → чтение → обновление", async () => {
        const client = createClient();
        try {
            console.log("[ТС] Логин:", EPL_CREDENTIALS.login);
            await client.login(EPL_CREDENTIALS);

            // Уникальные значения, чтобы не задевать чужие записи и повторные прогоны.
            const stamp = Date.now().toString();
            const garageNumber = `E2E-${stamp}`;
            const regNumber = `А${stamp.slice(-6)}`;

            const input = {
                garageNumber,
                passportTypeName: "КАМАЗ 5490",
                regCertNumber: stamp.slice(-10),
                regNumber,
                vin: `XTC54900M${stamp.slice(-8)}`,
                type: VehicleType.Car,
            } as const;

            // 1. Создание ТС.
            console.log("[ТС] 1. Создание ТС (sabyVehicle.Create)...");
            const created = await client.vehicles.create({ ...input });
            console.log("[ТС] 1. Ответ:", JSON.stringify(created));

            expect(created.uuid).toBeTypeOf("string");
            expect(created.uuid.length).toBeGreaterThan(0);
            expect(created.type).toBe(VehicleType.Car);
            expect(created.vin).toBe(input.vin);

            // 2. Чтение по UUID.
            console.log("[ТС] 2. Чтение ТС (sabyVehicle.Read)...");
            const read = await client.vehicles.get(created.uuid);
            console.log("[ТС] 2. Ответ:", JSON.stringify(read));

            expect(read.uuid).toBe(created.uuid);
            expect(read.vin).toBe(input.vin);
            expect(read.regNumber).toBe(input.regNumber);

            // 3. Обновление сведений.
            console.log("[ТС] 3. Обновление ТС (sabyVehicle.Update)...");
            const updated = await client.vehicles.update(created.uuid, {
                garageNumber: `${garageNumber}-upd`,
            });
            console.log("[ТС] 3. Ответ:", JSON.stringify(updated));

            expect(updated).toBe(true);

            // 4. Проверка, что обновление применилось.
            console.log("[ТС] 4. Повторное чтение ТС...");
            const reread = await client.vehicles.get(created.uuid);
            console.log("[ТС] 4. Ответ:", JSON.stringify(reread));

            expect(reread.garageNumber).toBe(`${garageNumber}-upd`);
        } finally {
            client.dispose();
        }
    });
});
