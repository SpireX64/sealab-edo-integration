/**
 * Данные документа, удостоверяющего личность иностранного физического лица
 * (УдЛичнИнФЛТип, общий тип для документов ЭТрН)
 *
 * Используется в таб-5.46 (1110339) и таб-7.14 (1110340).
 */

import { formatDate } from '../../../helpers'

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
