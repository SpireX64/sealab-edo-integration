/**
 * Енумы и их format-мапперы для документа ЭТрН 1110339.
 */

// ─── IssuerType ────────────────────────────────────────────
// Реэкспорт общего типа из docs/etrn/common

export { IssuerType } from '../common/IssuerType'

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
// Реэкспорт общего типа из docs/etrn/common

export { MassDeterminationMethod, formatMassDeterminationMethod } from '../common/MassDeterminationMethod'

// ─── InfrastructureOwnerMatchesShipper ─────────────────────

/**
 * Признак совпадения лица, которое является владельцем инфраструктуры
 * пункта погрузки, с грузоотправителем.
 * (СовпГОВ, таб-5.20)
 */
export enum InfraOwnerMatchesShipper {
    /** Совпадает: владелец инфраструктуры является грузоотправителем */
    Matches = 1,
    /** Не совпадает: владелец инфраструктуры не является грузоотправителем */
    NotMatches = 2,
    /** Не совпадает: владелец инфраструктуры неизвестен */
    Unknown = 3,
}

export function formatInfrastructureOwnerMatchesShipper(value: InfraOwnerMatchesShipper): string {
    switch (value) {
        case InfraOwnerMatchesShipper.Matches:
            return "1"
        case InfraOwnerMatchesShipper.NotMatches:
            return "2"
        case InfraOwnerMatchesShipper.Unknown:
            return "3"
    }
}

// ─── SignerStatus ──────────────────────────────────────────

/**
 * Статус подписанта
 * (СтатПодп, таб-5.23)
 */
export enum ShipperSignerStatus {
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

export function formatSignerStatus(status: ShipperSignerStatus): string {
    switch (status) {
        case ShipperSignerStatus.ShipperWithoutPOA:
            return "лицо, действующее от имени грузоотправителя без доверенности"
        case ShipperSignerStatus.ShipperElectronicPOA:
            return "лицо, действующее от имени грузоотправителя на основании электронной доверенности"
        case ShipperSignerStatus.ShipperPaperPOA:
            return "лицо, действующее от имени грузоотправителя на основании бумажной доверенности"
        case ShipperSignerStatus.LoaderWithoutPOA:
            return "лицо, действующее от имени лица, осуществляющего погрузку груза в транспортное средство, без доверенности"
        case ShipperSignerStatus.LoaderElectronicPOA:
            return "лицо, действующее от имени лица, осуществляющего погрузку груза в транспортное средство, на основании электронной доверенности"
        case ShipperSignerStatus.LoaderPaperPOA:
            return "лицо, действующее от имени лица, осуществляющего погрузку груза в транспортное средство, на основании бумажной доверенности"
    }
}
