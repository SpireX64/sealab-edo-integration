/**
 * Исправление транспортной накладной
 * (ИспрТрН, таб-13.15)
 */

import { formatDate } from '../../../../helpers'

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

export function formatWaybillCorrection({ correctionNumber, correctionDate }: TWaybillCorrection) {
    return {
        "НомИспр": correctionNumber,
        "ДатаИспр": formatDate(correctionDate),
    }
}
