import type { TOrganization } from "../../../organization";
import type { TListPosition } from "../../types";
import type { PermissionFlag, PermissionValue } from "./consts";

/** Разрешение (полномочие). */
export type TTrustPermission = {
    /** Идентификатор полномочия. */
    flag: PermissionFlag;

    /** Статус разрешения. */
    value: PermissionValue;
};

/** Сторона доверия (кто доверяет / кому доверено). */
export type TTrustParty = {
    /** Идентификатор сотрудника во внешней системе. */
    employeeExternalId: string;

    /** Организация (только для «кто доверяет»; по умолчанию из login). */
    organization?: TOrganization;
};

/** Входные данные создания/обновления доверия. */
export type TTrustInput = {
    /** Кто доверяет (владелец подписи). */
    grantor: TTrustParty;

    /** Кому доверено (подписант). */
    grantee: TTrustParty;

    /** Начало действия доверия. */
    periodFrom?: Date;

    /** Окончание действия доверия. */
    periodTo?: Date;

    /** Запрашивать подтверждение отложенной подписи у владельца. */
    confirmDeferredSign?: boolean;

    /** Разрешения (полномочия). */
    permissions?: TTrustPermission[];

    /** Идентификатор (обязателен при обновлении). */
    id?: string;
};

/** Доверие (ответ API). */
export type TTrust = {
    /** Идентификатор. */
    id?: string;

    /** Кто доверяет. */
    grantor?: { employeeExternalId?: string; organization?: TOrganization };

    /** Кому доверено. */
    grantee?: { employeeExternalId?: string };

    /** Начало действия. */
    periodFrom?: string;

    /** Окончание действия. */
    periodTo?: string;

    /** Подтверждение отложенной подписи. */
    confirmDeferredSign?: boolean;

    /** Разрешения. */
    permissions?: TTrustPermission[];

    /** Актуально. */
    actual?: boolean;

    /** Использовано. */
    used?: boolean;
};

/** Фильтр списка доверий. */
export type TTrustListFilter = {
    /** Кто доверяет. */
    grantor?: { employeeExternalId: string };

    /** Только актуальные. */
    actualOnly?: boolean;

    /** Пагинация по позиции. */
    pagination?: TListPosition;
};

/** Wire-представление доверия (внутренний тип для format/parse). */
export type TTrustWire = Record<string, unknown>;
