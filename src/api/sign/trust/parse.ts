import { asString, parseYesNo } from "../../utils";
import type { PermissionFlag, PermissionValue } from "./consts";
import type { TTrust, TTrustWire } from "./types";

/** Преобразует wire-доверие в camelCase-представление. */
export function parseTrust(wire: TTrustWire | undefined): TTrust {
    if (!wire) return {};

    const grantor = wire["КтоДоверяет"] as Record<string, unknown> | undefined;
    const grantee = wire["КомуДоверено"] as Record<string, unknown> | undefined;
    const grantorEmployee = grantor?.["Сотрудник"] as Record<string, unknown> | undefined;
    const granteeEmployee = grantee?.["Сотрудник"] as Record<string, unknown> | undefined;
    const permissions = wire["ФлагиРазрешений"] as
        | { "Идентификатор"?: string; "Значение"?: string }[]
        | undefined;

    const periodFrom = asString(wire["ПериодС"]);
    const periodTo = asString(wire["ПериодПо"]);

    return {
        ...(wire["Идентификатор"] != null && { id: String(wire["Идентификатор"]) }),
        ...(grantorEmployee && {
            grantor: { employeeExternalId: String(grantorEmployee["ИдентификаторИС"] ?? "") },
        }),
        ...(granteeEmployee && {
            grantee: { employeeExternalId: String(granteeEmployee["ИдентификаторИС"] ?? "") },
        }),
        ...(periodFrom && { periodFrom }),
        ...(periodTo && { periodTo }),
        ...(wire["ПодтверждатьОтложеннуюПодпись"] !== undefined && {
            confirmDeferredSign: parseYesNo(wire["ПодтверждатьОтложеннуюПодпись"]),
        }),
        ...(permissions && {
            permissions: permissions.map((p) => ({
                flag: p["Идентификатор"] as PermissionFlag,
                value: p["Значение"] as PermissionValue,
            })),
        }),
        ...(wire["Актуально"] !== undefined && { actual: parseYesNo(wire["Актуально"]) }),
        ...(wire["Использовано"] !== undefined && { used: parseYesNo(wire["Использовано"]) }),
    };
}
