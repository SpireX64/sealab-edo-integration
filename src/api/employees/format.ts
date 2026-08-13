import { formatDate } from "../../helpers";
import { organization } from "../../organization";
import { formatOrganization, formatPagination, formatYesNo } from "../utils";
import type {
    TEmployeeInput,
    TEmployeeListFilter,
    TEmployeeListOrganization,
    TEmployeeLookup,
    TEmployeeWire,
} from "./types";

/** Преобразует входные данные сотрудника в wire-представление. */
export function formatEmployee(input: TEmployeeInput): TEmployeeWire {
    return {
        "Фамилия": input.lastName,
        "Имя": input.firstName,
        "ИдентификаторИС": input.externalId,
        "Отчество": input.middleName,
        "ДатаРождения": input.birthDate && formatDate(input.birthDate),
        "ИНН": input.inn,
        "НомерСтраховогоСвидетельства": input.snils,
        "Сторонний": formatYesNo(input.thirdParty),
        "Пол": input.gender,
        "ДоступВСистему": formatYesNo(input.hasSystemAccess),
        "Логин": input.login,
        "Пароль": input.password,
        "ДокументВид": input.passport?.kind,
        "ДокументСерия": input.passport?.series,
        "ДокументНомер": input.passport?.number,
        "ДокументКемВыдан": input.passport?.issuedBy,
        "ДокументДатаВыдачи": input.passport?.issueDate && formatDate(input.passport.issueDate),
        "ДокументКодПодразделения": input.passport?.departmentCode,
        "ВодительскоеУдостоверение": input.driverLicense && {
            "СерияНомер": input.driverLicense.seriesNumber,
            "ДействуетС": input.driverLicense.validFrom && formatDate(input.driverLicense.validFrom),
            "ДействуетПо": input.driverLicense.validTo && formatDate(input.driverLicense.validTo),
            "КатегорииТС": input.driverLicense.categories?.length
                ? input.driverLicense.categories
                : undefined,
        },
        "Email": input.invite?.email,
        "Телефон": input.invite?.phone,
        "Приложение": input.invite?.appUrl,
        "ПриглашениеВСистему":
            input.invite?.email || input.invite?.phone || input.invite?.appUrl ? "Да" : undefined,
        "Должность": input.position && {
            "Название": input.position.name,
            "Идентификатор": input.position.externalId,
        },
        "Права": input.roles?.length
            ? { "Роль": input.roles.map((name) => ({ "Название": name })) }
            : undefined,
    };
}

/** Преобразует ключи поиска сотрудника в wire-представление. */
export function formatLookup(lookup: TEmployeeLookup): TEmployeeWire {
    return {
        "ИдентификаторИС": lookup.externalId,
        "Идентификатор": lookup.id,
        "ИНН": lookup.inn,
        "НомерСтраховогоСвидетельства": lookup.snils,
    };
}

/** Преобразует реквизиты организации (фильтр) в wire-представление «НашаОрганизация». */
export function formatEmployeeListOrganization(
    org: TEmployeeListOrganization | undefined,
): Record<string, unknown> | undefined {
    if (!org?.inn) return undefined;
    return formatOrganization(organization({
        inn: org.inn,
        ...(org.kpp && { kpp: org.kpp }),
    }));
}

/** Преобразует фильтр списка сотрудников в wire-представление «Фильтр»/«Навигация». */
export function formatEmployeeListFilter(
    filter: TEmployeeListFilter,
): Record<string, unknown> {
    const org = formatEmployeeListOrganization(filter.organization);
    return {
        "Фильтр": org && { "НашаОрганизация": org },
        "Навигация": filter.pagination && formatPagination(filter.pagination),
    };
}
