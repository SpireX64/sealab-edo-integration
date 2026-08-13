/**
 * Сведения о показаниях одометра при выезде
 * транспортного средства с парковки
 * (парковочного места)
 * (СвОдомВыезд, таб-11.6)
 */

import { formatDateTimeWithUtc } from '../../../../helpers'

export type TOdometerDeparture = {
    /**
     * Дата и время выезда транспортного средства
     * с парковки (парковочного места).
     */
    departureDateTime: Date

    /**
     * Показания одометра при выезде транспортного средства
     * с парковки (парковочного места), в километрах.
     * (Число, 7)
     */
    odometerReading: number
}

export function formatOdometerDeparture(data: TOdometerDeparture) {
    const dt = formatDateTimeWithUtc(data.departureDateTime)

    return {
        "ДатВрВыезд": dt.dateTime,
        "НалКоорТочВрВыезд": dt.utc,
        "ОдомВыезд": String(data.odometerReading),
    }
}