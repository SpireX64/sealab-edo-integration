import type { TOrganization } from "../organization";
import type { TListPagination, TListPosition } from "./types";

/** Преобразует булево значение в «Да»/«Нет». */
export function formatYesNo(value: boolean | undefined): string | undefined {
    return value == null ? undefined : value ? "Да" : "Нет";
}

/** Преобразует «Да»/«Нет» в булево значение. */
export function parseYesNo(value: unknown): boolean {
    return value === "Да";
}

/** Преобразует значение в непустую строку, иначе — undefined. */
export function asString(value: unknown): string | undefined {
    return typeof value === "string" && value ? value : undefined;
}

/**
 * Преобразует реквизиты организации в wire-представление `НашаОрганизация`.
 * `СвИП` приводится к `СвФЛ` — так организация ИП представлена в Saby.
 */
export function formatOrganization(org: TOrganization): Record<string, unknown> {
    if ("СвЮЛ" in org) {
        return {
            "СвЮЛ": {
                "ИНН": org["СвЮЛ"]["ИНН"],
                "КПП": org["СвЮЛ"]["КПП"],
            },
        };
    }
    if ("СвИП" in org) {
        return { "СвФЛ": { "ИНН": org["СвИП"]["ИНН"] } };
    }
    return { "СвФЛ": { "ИНН": org["СвФЛ"]["ИНН"] } };
}

/** Преобразует пагинацию по страницам в wire-представление «Навигация». */
export function formatPagination(pagination: TListPagination): Record<string, unknown> {
    return {
        "РазмерСтраницы": pagination.pageSize?.toString(),
        "Страница": pagination.page?.toString(),
    };
}

/** Преобразует пагинацию по позиции в wire-представление «Навигация». */
export function formatPosition(position: TListPosition): Record<string, unknown> {
    return {
        "РазмерСтраницы": position.pageSize?.toString(),
        "Позиция": position.position,
    };
}
