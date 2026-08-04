/**
 * Данные документа, удостоверяющего личность
 * иностранного гражданина
 * (УдЛичнИГТип, таб-5.35)
 */

import { formatDate } from '../../../../helpers'

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
