import type { TListPagination } from "../types";
import type { DriverLicenseCategory, EmployeeGender, EmployeeRole } from "./consts";

/** Паспортные данные сотрудника. */
export type TPassport = {
    /** Серия паспорта («ХХ ХХ»). */
    series?: string;

    /** Номер паспорта («ХХХХХХ»). */
    number?: string;

    /** Кем выдан паспорт. */
    issuedBy?: string;

    /** Дата выдачи паспорта. */
    issueDate?: Date;

    /** Код подразделения («ХХХ-ХХХ»). */
    departmentCode?: string;

    /** Вид документа. По умолчанию "10" (паспорт РФ). */
    kind?: string;
};

/** Водительское удостоверение. */
export type TDriverLicense = {
    /** Серия и номер. */
    seriesNumber?: string;

    /** Дата начала действия. */
    validFrom?: Date;

    /** Дата окончания действия. */
    validTo?: Date;

    /** Категории ТС. */
    categories?: DriverLicenseCategory[];
};

/** Приглашение сотрудника в систему. */
export type TEmployeeInvite = {
    /** Email для отправки приглашения. */
    email?: string;

    /** Телефон для приглашения по SMS (11 символов, начинается с 7/8). */
    phone?: string;

    /** URL приложения, в которое отправляется приглашение. */
    appUrl?: string;
};

/** Должность сотрудника. */
export type TEmployeePosition = {
    /** Название должности. */
    name: string;

    /** Внешний идентификатор должности. */
    externalId?: string;
};

/** Входные данные для создания/обновления сотрудника. */
export type TEmployeeInput = {
    /** Фамилия. */
    lastName: string;

    /** Имя. */
    firstName: string;

    /** Отчество. */
    middleName?: string;

    /** Дата рождения. */
    birthDate?: Date;

    /** ИНН (12 символов для физ. лиц РФ). */
    inn?: string;

    /** Номер страхового свидетельства (СНИЛС). */
    snils?: string;

    /** Идентификатор сотрудника во внешней системе (обязателен). */
    externalId: string;

    /** Сторонняя организация: «Да» — сторонний, «Нет» — ваша компания. */
    thirdParty?: boolean;

    /** Пол. */
    gender?: EmployeeGender;

    /** Есть ли доступ в Saby. */
    hasSystemAccess?: boolean;

    /** Логин в Saby. */
    login?: string;

    /** Пароль в Saby. */
    password?: string;

    /** Паспортные данные. */
    passport?: TPassport;

    /** Водительское удостоверение. */
    driverLicense?: TDriverLicense;

    /** Приглашение в систему. */
    invite?: TEmployeeInvite;

    /** Должность. */
    position?: TEmployeePosition;

    /** Роли. */
    roles?: EmployeeRole[];
};

/** Ключи идентификации сотрудника для чтения (любая комбинация). */
export type TEmployeeLookup = {
    /** Идентификатор во внешней системе. */
    externalId?: string;

    /** Внутренний идентификатор Saby. */
    id?: string;

    /** ИНН. */
    inn?: string;

    /** СНИЛС. */
    snils?: string;
};

/** Фильтр списка сотрудников. */
export type TEmployeeListFilter = {
    /** Организация (по умолчанию — из login). */
    organization?: TEmployeeListOrganization;

    /** Пагинация по страницам. */
    pagination?: TListPagination;
};

/** Организация в фильтре списка сотрудников. */
export type TEmployeeListOrganization = {
    /** ИНН юридического лица. */
    inn?: string;

    /** КПП юридического лица. */
    kpp?: string;
};

/** Опции записи сотрудника. */
export type TEmployeeWriteOptions = {
    /** Организация (по умолчанию — из login). */
    organization?: TEmployeeListOrganization;
};

/** Карточка сотрудника (ответ API). */
export type TEmployee = {
    /** Внутренний идентификатор Saby. */
    id: string;

    /** Идентификатор во внешней системе. */
    externalId: string;

    /** Фамилия. */
    lastName: string;

    /** Имя. */
    firstName: string;

    /** Отчество. */
    middleName?: string;

    /** ИНН. */
    inn?: string;

    /** СНИЛС. */
    snils?: string;

    /** Дата рождения («ДД.ММ.ГГГГ»). */
    birthDate?: string;

    /** Должность. */
    position?: { name?: string; id?: string };

    /** Подразделение. */
    department?: string;

    /** Роли. */
    roles: string[];

    /** Есть ли доступ в Saby. */
    hasSystemAccess: boolean;

    /** Сторонний сотрудник. */
    thirdParty: boolean;

    /** Логин в Saby. */
    login?: string;
};

/** Wire-представление карточки сотрудника (внутренний тип для format/parse). */
export type TEmployeeWire = Record<string, unknown>;
