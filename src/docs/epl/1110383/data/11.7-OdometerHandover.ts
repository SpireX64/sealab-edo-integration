/**
 * Сведения о показаниях одометра при приеме
 * транспортного средства последующим водителем
 * (СвОдомПриемТС, таб-11.7)
 */

import { formatDateTimeWithUtc } from '../../../../helpers'

export type TOdometerHandover = {
    /**
     * Дата и время приема транспортного средства.
     */
    handoverDateTime: Date

    /**
     * Показания одометра при приеме транспортного средства,
     * в километрах.
     * (Число, 7)
     */
    odometerReading: number
}

export function formatOdometerHandover(data: TOdometerHandover) {
    const dt = formatDateTimeWithUtc(data.handoverDateTime)

    return {
        "ДатВрПриемТС": dt.dateTime,
        "НалКоорТочВрПриемТС": dt.utc,
        "ОдомПриемТС": String(data.odometerReading),
    }
}