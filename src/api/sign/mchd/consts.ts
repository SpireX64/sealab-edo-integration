/** Статус МЧД в ЦПРР ФНС. */
export enum MchdStatus {
    /** Ожидание подтверждения. */
    Processing = "PROCESSING",
    /** Отказ регистрации. */
    Rejected = "REJECTED",
    /** Зарегистрирована. */
    Created = "CREATED",
    /** Активна. */
    Active = "ACTIVE",
    /** Действие истекло. */
    Expired = "EXPIRED",
    /** Отменена. */
    Revoked = "REVOKED",
}

