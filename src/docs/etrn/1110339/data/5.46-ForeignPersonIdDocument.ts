/**
 * Данные документа, удостоверяющего личность иностранного физического лица
 * (УдЛичнИнФЛТип, таб-5.46)
 */

import { formatDate } from '../../../../helpers'

export type TForeignPersonIdDocument = {
    /**
     * Вид документа.
     * (1-1000 символов)
     */
    type: string

    /**
     * Номер документа.
     * (1-100 символов)
     */
    number: string

    /**
     * Дата выдачи документа.
     */
    date: Date
}

export function formatForeignPersonIdDocument(data: TForeignPersonIdDocument) {
    return {
        "ВидДок": data.type,
        "НомДок": data.number,
        "ДатаДок": formatDate(data.date),
    }
}
