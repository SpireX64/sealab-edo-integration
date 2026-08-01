/**
 * Енумы и их format-мапперы для документа ЭТрН 1110339.
 */

// ─── IssuerType ────────────────────────────────────────────

export enum IssuerType {
    /** Физическое лицо (ФЛ) */
    Individual = "ФЛ",
    /** Юридическое лицо (ЮЛ) */
    LegalEntity = "ЮЛ",
    /** Индивидуальный предприниматель (ИП) */
    SoleProprietor = "ИП",
    /** Иностранное лицо, не состоящее в налоговых органах как налогоплательщик */
    ForeignEntity = "ИН",
    /** Орган исполнительной власти */
    ExecutiveAuthority = "ОИВ",
}

// ─── VehicleOwnershipType ──────────────────────────────────

export enum VehicleOwnershipType {
    /** Собственность */
    Owned = 1,
    /** Совместная собственность супругов */
    JointSpousal = 2,
    /** Аренда */
    Lease = 3,
    /** Лизинг */
    Leasing = 4,
    /** Безвозмездное пользование */
    GratuitousUse = 5,
}

// ─── ReaddressingAuthority ─────────────────────────────────

export enum ReaddressingAuthority {
    /** Грузоотправитель */
    Shipper = "Shipper",
    /** Грузополучатель */
    Consignee = "Consignee",
}

export function formatReaddressingAuthority(authority: ReaddressingAuthority): string {
    switch (authority) {
        case ReaddressingAuthority.Shipper:
            return "Грузоотправитель"
        case ReaddressingAuthority.Consignee:
            return "Грузополучатель"
    }
}

// ─── ShipperNoteReason ─────────────────────────────────────

/**
 * Причина отметки грузоотправителя
 * (ОбстОтмет, таб-5.21)
 */
export enum ShipperNoteReason {
    /** Невывоз груза по вине перевозчика */
    CargoNotExportedByCarrier = "CargoNotExportedByCarrier",
    /** Несвоевременное предоставление транспортного средства */
    LateVehicleProvision = "LateVehicleProvision",
    /** Несвоевременное предоставление контейнера */
    LateContainerProvision = "LateContainerProvision",
    /** Непредъявление транспортного средства для перевозки груза */
    VehicleNotPresented = "VehicleNotPresented"
}

export function formatShipperNoteReason(reason: ShipperNoteReason | string): string {
    switch (reason) {
        case ShipperNoteReason.CargoNotExportedByCarrier:
            return "невывоз груза по вине перевозчика"
        case ShipperNoteReason.LateVehicleProvision:
            return "несвоевременное предоставление транспортного средства"
        case ShipperNoteReason.LateContainerProvision:
            return "несвоевременное предоставление контейнера"
        case ShipperNoteReason.VehicleNotPresented:
            return "непредъявление транспортного средства для перевозки груза"
        default:
            return reason
    }
}

// ─── MassDeterminationMethod ──────────────────────────────

/**
 * Метод определения массы груза
 * (МетОпрМасс, таб-5.17)
 */
export enum MassDeterminationMethod {
    /** Взвешивание по общей массе */
    TotalWeight = "01",
    /** Взвешивание поосно */
    AxleWeight = "02",
    /** Расчетная масса груза */
    Calculated = "03",
}

export function formatMassDeterminationMethod(method: MassDeterminationMethod): string {
    switch (method) {
        case MassDeterminationMethod.TotalWeight:
            return "Взвешивание по общей массе"
        case MassDeterminationMethod.AxleWeight:
            return "Взвешивание поосно"
        case MassDeterminationMethod.Calculated:
            return "Расчетная масса груза"
    }
}

// ─── SignerStatus ──────────────────────────────────────────

/**
 * Статус подписанта
 * (СтатПодп, таб-5.23)
 */
export enum SignerStatus {
    /** Лицо, действующее от имени грузоотправителя без доверенности */
    ShipperWithoutPOA = 1,
    /** Лицо, действующее от имени грузоотправителя на основании электронной доверенности */
    ShipperElectronicPOA = 2,
    /** Лицо, действующее от имени грузоотправителя на основании бумажной доверенности */
    ShipperPaperPOA = 3,
    /** Лицо, действующее от имени лица, осуществляющего погрузку, без доверенности */
    LoaderWithoutPOA = 4,
    /** Лицо, действующее от имени лица, осуществляющего погрузку, на основании электронной доверенности */
    LoaderElectronicPOA = 5,
    /** Лицо, действующее от имени лица, осуществляющего погрузку, на основании бумажной доверенности */
    LoaderPaperPOA = 6,
}

export function formatSignerStatus(status: SignerStatus): string {
    switch (status) {
        case SignerStatus.ShipperWithoutPOA:
            return "лицо, действующее от имени грузоотправителя без доверенности"
        case SignerStatus.ShipperElectronicPOA:
            return "лицо, действующее от имени грузоотправителя на основании электронной доверенности"
        case SignerStatus.ShipperPaperPOA:
            return "лицо, действующее от имени грузоотправителя на основании бумажной доверенности"
        case SignerStatus.LoaderWithoutPOA:
            return "лицо, действующее от имени лица, осуществляющего погрузку груза в транспортное средство, без доверенности"
        case SignerStatus.LoaderElectronicPOA:
            return "лицо, действующее от имени лица, осуществляющего погрузку груза в транспортное средство, на основании электронной доверенности"
        case SignerStatus.LoaderPaperPOA:
            return "лицо, действующее от имени лица, осуществляющего погрузку груза в транспортное средство, на основании бумажной доверенности"
    }
}
