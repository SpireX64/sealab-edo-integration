import { asString, parseYesNo } from "../utils";
import type { TEmployee, TEmployeeWire } from "./types";

/** Преобразует wire-карточку сотрудника в camelCase-представление. */
export function parseEmployee(wire: TEmployeeWire): TEmployee {
    const position = wire["Должность"] as { "Название"?: string; "Идентификатор"?: string } | undefined;
    const department = wire["Подразделение"] as { "Название"?: string } | undefined;
    const rights = wire["Права"] as { "Роли"?: { "Название": string }[] } | undefined;

    const middleName = asString(wire["Отчество"]);
    const inn = asString(wire["ИНН"]);
    const snils = asString(wire["НомерСтраховогоСвидетельства"]);
    const birthDate = asString(wire["ДатаРождения"]);
    const login = asString(wire["Логин"]);
    const positionName = asString(position?.["Название"]);
    const positionId = asString(position?.["Идентификатор"]);
    const departmentName = asString(department?.["Название"]);

    return {
        id: String(wire["Идентификатор"] ?? ""),
        externalId: String(wire["ИдентификаторИС"] ?? ""),
        lastName: String(wire["Фамилия"] ?? ""),
        firstName: String(wire["Имя"] ?? ""),
        roles: (rights?.["Роли"] ?? []).map((r) => r["Название"]),
        hasSystemAccess: parseYesNo(wire["ДоступВСистему"]),
        thirdParty: parseYesNo(wire["Сторонний"]),
        ...(middleName && { middleName }),
        ...(inn && { inn }),
        ...(snils && { snils }),
        ...(birthDate && { birthDate }),
        ...((positionName || positionId) && {
            position: {
                ...(positionName && { name: positionName }),
                ...(positionId && { id: positionId }),
            },
        }),
        ...(departmentName && { department: departmentName }),
        ...(login && { login }),
    };
}
