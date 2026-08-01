/**
 * Исправление
 * (ИспрТип, таб-5.43)
 */

import { formatDate } from '../../../../helpers'

export type TWaybillCorrection = {
    /**
     * Номер исправления.
     * (Число, 3)
     */
    number: number

    /**
     * Дата исправления.
     */
    date: Date
}

export function formatWaybillCorrection(data: TWaybillCorrection) {
    return {
        "НомИспр": String(data.number),
        "ДатаИспр": formatDate(data.date),
    }
}
