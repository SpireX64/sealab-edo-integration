/**
 * Исправление
 * (ИспрТип)
 *
 * Общий тип для документов 1110339 (таб-5.43) и 1110341 (таб-13.15).
 */

import { formatDate } from '../../../helpers'

export type TWaybillCorrection = {
    /**
     * Номер исправления.
     */
    correctionNumber: number

    /**
     * Дата исправления.
     */
    correctionDate: Date
}

export function formatWaybillCorrection(data: TWaybillCorrection) {
    return {
        "НомИспр": String(data.correctionNumber),
        "ДатаИспр": formatDate(data.correctionDate),
    }
}
