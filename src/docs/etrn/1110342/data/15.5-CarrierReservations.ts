/** Оговорки перевозчика при выдаче груза (ЗамПрвВыд, таб-15.5). */
import { formatDateTimeWithUtc, mapArrayIfNotEmpty } from '../../../../helpers'
import { formatInfoField, type TInfoField } from './15.12-InfoField'

export type TCarrierReservations = {
    /** Оговорки в отношении фактического прибытия. */
    arrivalDateTime?: Date
    /** Оговорки в отношении фактического убытия. */
    departureDateTime?: Date
    /** Оговорки в отношении постановки на выгрузку. */
    unloadingDateTime?: Date
    /** Состояние груза, тары, упаковки, маркировки, пломб, масса и места (1–10000). */
    cargoCondition?: string
    /** Проведение выгрузки (1–10000). */
    unloadingWorkNote?: string
    infoField?: TInfoField[]
}

export function formatCarrierReservations(data: TCarrierReservations) {
    for (const value of [data.cargoCondition, data.unloadingWorkNote]) {
        if (value !== undefined && (!value.trim() || value.length > 10000)) throw new TypeError("Оговорка должна содержать 1–10000 символов")
    }
    const arrival = data.arrivalDateTime && formatDateTimeWithUtc(data.arrivalDateTime)
    const departure = data.departureDateTime && formatDateTimeWithUtc(data.departureDateTime)
    const unloading = data.unloadingDateTime && formatDateTimeWithUtc(data.unloadingDateTime)
    return {
        "ЗамДатаВрПриб": arrival?.dateTime,
        "НалКоорТочВрПр": arrival?.utc,
        "ЗамДатВрУбыт": departure?.dateTime,
        "НалКоорТочВрУб": departure?.utc,
        "ЗамДатВрПосВыгр": unloading?.dateTime,
        "НалКоорТочВрВыгр": unloading?.utc,
        "ЗамСостГруз": data.cargoCondition,
        "ЗамРабВыгр": data.unloadingWorkNote,
        "ИнфПол": mapArrayIfNotEmpty(data.infoField, formatInfoField),
    }
}
