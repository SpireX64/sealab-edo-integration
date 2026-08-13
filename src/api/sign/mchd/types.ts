import type { MchdStatus } from "./consts";

/** Статус регистрации МЧД (ответ `sabyMchd.SendRegistration`). */
export type TMchdRegistrationStatus = {
    /** Числовой код состояния. */
    code?: number;

    /** Описание состояния. */
    name?: string;

    /** Комментарий. */
    comment?: string;
};

/** Данные МЧД из ЦПРР ФНС. */
export type TMchd = {
    /** Единый регистрационный номер доверенности. */
    mchdNumber?: string;

    /** Дата регистрации. */
    createdDate?: string;

    /** Дата/время начала действия. */
    startDate?: string;

    /** Дата завершения действия. */
    endDate?: string;

    /** Статус доверенности. */
    status?: MchdStatus;

    /** Дата изменения статуса. */
    statusDate?: string;
};
