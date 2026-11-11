/**
 * Енумы и их format-мапперы для документа ЭТрН 1110340.
 */

// ─── CarrierCargoConditionNote ─────────────────────────────

/**
 * Оговорки и замечания в отношении фактического состояния груза
 * (ЗамСостГруз, таб-7.5)
 */
export enum CarrierCargoConditionNote {
    /** Груз поврежден */
    CargoDamaged = "CargoDamaged",
    /** Груз грязный */
    CargoDirty = "CargoDirty",
    /** Груз имеет запах */
    CargoSmelly = "CargoSmelly",
    /** Упаковка груза не соответствует условиям перевозки */
    PackagingUnsuitable = "PackagingUnsuitable",
    /** Упаковка груза повреждена */
    PackagingDamaged = "PackagingDamaged",
    /** Упаковка груза отсутствует */
    PackagingMissing = "PackagingMissing",
    /** Грузоотправитель не обеспечил взвешивание ТС на предмет соответствия нагрузки на ось */
    WeighingNotEnsured = "WeighingNotEnsured",
    /** Количество грузовых мест не соответствует заявленному */
    PackageCountMismatch = "PackageCountMismatch",
    /** Нарушена схема погрузки груза в ТС грузоотправителем */
    LoadingSchemeViolation = "LoadingSchemeViolation",
    /** Груз не соответствует заявленной массе */
    WeightMismatch = "WeightMismatch",
    /** Нарушение пломбы */
    SealViolation = "SealViolation",
    /** Отсутствие необходимой маркировки */
    MarkingMissing = "MarkingMissing",
}

export function formatCarrierCargoConditionNote(note: CarrierCargoConditionNote | string): string {
    switch (note) {
        case CarrierCargoConditionNote.CargoDamaged:
            return "Груз поврежден"
        case CarrierCargoConditionNote.CargoDirty:
            return "Груз грязный"
        case CarrierCargoConditionNote.CargoSmelly:
            return "Груз имеет запах"
        case CarrierCargoConditionNote.PackagingUnsuitable:
            return "Упаковка груза не соответствует условиям перевозки"
        case CarrierCargoConditionNote.PackagingDamaged:
            return "Упаковка груза повреждена"
        case CarrierCargoConditionNote.PackagingMissing:
            return "Упаковка груза отсутствует"
        case CarrierCargoConditionNote.WeighingNotEnsured:
            return "Грузоотправитель не обеспечил взвешивание ТС на предмет соответствия нагрузки на ось требованиям правил перевозки грузов"
        case CarrierCargoConditionNote.PackageCountMismatch:
            return "Количество грузовых мест не соответствует заявленному"
        case CarrierCargoConditionNote.LoadingSchemeViolation:
            return "Нарушена схема погрузки груза в ТС грузоотправителем"
        case CarrierCargoConditionNote.WeightMismatch:
            return "Груз не соответствует заявленной массе"
        case CarrierCargoConditionNote.SealViolation:
            return "Нарушение пломбы"
        case CarrierCargoConditionNote.MarkingMissing:
            return "Отсутствие необходимой маркировки"
        default:
            return note
    }
}

// ─── CarrierNoteReason ─────────────────────────────────────

/**
 * Описание обстоятельств, послуживших основанием для отметки перевозчика
 * (ОбстОтмет, таб-7.6)
 */
export enum CarrierNoteReason {
    /** Задержка (простой) транспортного средства, поданного под погрузку */
    VehicleDowntime = "VehicleDowntime",
    /** Простой специализированного транспортного средства */
    SpecialVehicleDowntime = "SpecialVehicleDowntime",
    /** Задержка (простой) контейнеров */
    ContainerDowntime = "ContainerDowntime",
}

export function formatCarrierNoteReason(reason: CarrierNoteReason | string): string {
    switch (reason) {
        case CarrierNoteReason.VehicleDowntime:
            return "задержка (простой) транспортного средства, поданного под погрузку"
        case CarrierNoteReason.SpecialVehicleDowntime:
            return "простой специализированного транспортного средства"
        case CarrierNoteReason.ContainerDowntime:
            return "задержка (простой) контейнеров"
        default:
            return reason
    }
}

// ─── CarrierSignerStatus ───────────────────────────────────

/**
 * Статус подписанта со стороны перевозчика
 * (СтатПодп, таб-7.8)
 */
export enum CarrierSignerStatus {
    /** Лицо, действующее от имени перевозчика без доверенности */
    CarrierWithoutPOA = 1,
    /** Лицо, действующее от имени перевозчика на основании электронной доверенности */
    CarrierElectronicPOA = 2,
    /** Лицо, действующее от имени перевозчика на основании бумажной доверенности */
    CarrierPaperPOA = 3,
}

export function formatCarrierSignerStatus(status: CarrierSignerStatus): string {
    switch (status) {
        case CarrierSignerStatus.CarrierWithoutPOA:
            return "1"
        case CarrierSignerStatus.CarrierElectronicPOA:
            return "2"
        case CarrierSignerStatus.CarrierPaperPOA:
            return "3"
    }
}
