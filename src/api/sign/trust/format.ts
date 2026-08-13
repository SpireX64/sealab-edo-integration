import { formatDateTime } from "../../../helpers";
import { formatOrganization, formatPosition, formatYesNo } from "../../utils";
import type { TTrustInput, TTrustListFilter, TTrustParty } from "./types";

/** Преобразует сторону доверия в wire-представление. */
export function formatParty(party: TTrustParty): Record<string, unknown> {
    return {
        "Сотрудник": { "ИдентификаторИС": party.employeeExternalId },
        "НашаОрганизация": party.organization && formatOrganization(party.organization),
    };
}

/** Преобразует разрешения (полномочия) в wire-представление. */
export function formatTrustPermissions(
    permissions: TTrustInput["permissions"],
): { "Идентификатор": string; "Значение": string }[] | undefined {
    return permissions?.length
        ? permissions.map((p) => ({ "Идентификатор": p.flag, "Значение": p.value }))
        : undefined;
}

/** Преобразует доверие в wire-представление. */
export function formatTrust(input: TTrustInput): Record<string, unknown> {
    return {
        "КтоДоверяет": formatParty(input.grantor),
        "КомуДоверено": formatParty(input.grantee),
        "Идентификатор": input.id,
        "ПериодС": input.periodFrom && formatDateTime(input.periodFrom),
        "ПериодПо": input.periodTo && formatDateTime(input.periodTo),
        "ПодтверждатьОтложеннуюПодпись": formatYesNo(input.confirmDeferredSign),
        "ФлагиРазрешений": formatTrustPermissions(input.permissions),
    };
}

/** Преобразует фильтр списка доверий в wire-представление «Фильтр»/«Навигация». */
export function formatTrustListFilter(filter: TTrustListFilter): Record<string, unknown> {
    return {
        "Фильтр": (filter.grantor || filter.actualOnly !== undefined) && {
            "КтоДоверяет": filter.grantor && {
                "Сотрудник": { "ИдентификаторИС": filter.grantor.employeeExternalId },
            },
            "Актуально": formatYesNo(filter.actualOnly),
        },
        "Навигация": filter.pagination && formatPosition(filter.pagination),
    };
}
