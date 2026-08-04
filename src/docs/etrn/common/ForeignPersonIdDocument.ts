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
    documentType: string

    /**
     * Номер документа.
     * (1-100 символов)
     */
    documentNumber: string

    /**
     * Дата выдачи документа.
     */
    issueDate: Date
}

export function formatForeignPersonIdDocument(data: TForeignPersonIdDocument) {
    return {
        "ВидДок": data.documentType,
        "НомДок": data.documentNumber,
        "ДатаДок": formatDate(data.issueDate),
    }
}
