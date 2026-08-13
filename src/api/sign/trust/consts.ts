/** Статус разрешения. */
export enum PermissionValue {
    Yes = "Да",
    No = "Нет",
    Restricted = "С ограничением",
}

/** Идентификаторы полномочий (ФлагиРазрешений.Идентификатор). */
export enum PermissionFlag {
    Reporting = "FLAG_REPORT",
    Fns = "FLAG_FNS",
    Sfr = "FLAG_SFR",
    Realization = "FLAG_REALIZATION",
    Outflow = "FLAG_OUTFLOW",
    Bill = "FLAG_BILL",
    Receipt = "FLAG_RECEIPT",
    Inflow = "FLAG_INFLOW",
    Order = "FLAG_ORDER",
    Others = "FLAG_OTHERS",
    Acts = "FLAG_ACTS",
    ExpenseReports = "FLAG_EXP_REPORTS",
    Correspondence = "FLAG_CORRESP",
    Contracts = "FLAG_CONTRACTS",
    Staff = "FLAG_STAFF",
    Rosstat = "FLAG_ROSSTAT",
    InternalDocs = "FLAG_INTERNAL_DOCS",
    InnerDocs = "FLAG_INNERDOCS",
    DeliveryConfirmation = "FLAG_DELIVERYCONF",
    Waybills = "FLAG_WAYBILLS",
    Egais = "FLAG_EGAIS",
    Transportation = "FLAG_TRANSPORTATION",
    TripTicket = "FLAG_TRIP_TICKET",
    TransportOrder = "FLAG_TRANSPORT_ORDER",
    CentralBank = "FLAG_CENTRAL_BANK",
}

