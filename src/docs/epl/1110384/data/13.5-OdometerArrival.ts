/**
 * Сведения о показаниях одометра при заезде
 * транспортного средства на парковку
 * (парковочное место)
 * (СвОдомЗаезд, таб-13.5)
 */

import { formatDateTimeWithUtc } from '../../../../helpers'

export type TOdometerArrival = {
    /**
     * Дата и время заезда транспортного средства
     * на парковку (парковочное место).
     */
    arrivalDateTime: Date

    /**
     * Показания одометра при заезде транспортного средства
     * на парковку (парковочное место), в километрах.
     * (Число, 7)
     */
    odometerReading: number
}

export function formatOdometerArrival(data: TOdometerArrival) {
    const dt = formatDateTimeWithUtc(data.arrivalDateTime)

    return {
        "ДатВрЗаезд": dt.dateTime,
        "НалКоорТочВрЗаезд": dt.utc,
        "ОдомЗаезд": String(data.odometerReading),
    }
}
