/**
 * Сведения о показаниях одометра при сдаче
 * транспортного средства последующему водителю
 * (СвОдомСдачТС, таб-13.6)
 */

import { formatDateTimeWithUtc } from '../../../../helpers'

export type TOdometerHandover = {
    /**
     * Дата и время сдачи транспортного средства.
     */
    handoverDateTime: Date

    /**
     * Показания одометра при сдаче транспортного средства,
     * в километрах.
     * (Число, 7)
     */
    odometerReading: number
}

export function formatOdometerHandover(data: TOdometerHandover) {
    const dt = formatDateTimeWithUtc(data.handoverDateTime)

    return {
        "ДатВрСдачТС": dt.dateTime,
        "НалКоорТочВрСдачТС": dt.utc,
        "ОдомСдачТС": String(data.odometerReading),
    }
}
