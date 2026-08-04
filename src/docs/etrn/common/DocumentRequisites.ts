/**
 * Реквизиты документа
 * (РеквДокТип)
 *
 * Общий тип для документов 1110340 (таб-7.13) и 1110341 (таб-13.17).
 */

import { formatDate, mapArrayIfNotEmpty } from '../../../helpers'
import { formatIssuerRequisites, type TIssuerRequisites } from './IssuerRequisites';

export type TDocumentRequisites = {
    /**
     * Наименование документа.
     * Обязателен при отсутствии {id}.
     * (1-255 символов)
     */
    name?: string

    /**
     * Номер документа.
     * Обязателен при отсутствии {id}.
     * При отсутствии номера указывается: «Без номера».
     * (1-255 символов)
     */
    documentNumber?: string

    /**
     * Дата документа.
     * Обязателен при отсутствии {id}.
     */
    documentDate?: Date

    /**
     * Идентификатор файла документа (в том числе регистрационный номер).
     * Обязателен при отсутствии {name} и {documentNumber} и {documentDate}.
     * (1-255 символов)
     */
    id?: string

    /**
     * Дополнительные сведения.
     * (1-2000 символов)
     */
    additionalDetails?: string

    /**
     * Идентифицирующие реквизиты сторон, составивших документ.
     */
    issuerRequisites: TIssuerRequisites[]
}

export function formatDocumentRequisites(data: TDocumentRequisites) {
    if (!data.id && (!data.name || !data.documentNumber || !data.documentDate)) {
        throw new TypeError(
            "Требуется указать идентификатор документа (id) " +
            "либо наименование (name), номер (documentNumber) и дату (documentDate)"
        )
    }

    return {
        "НаимДок": data.name,
        "НомерДок": data.documentNumber ?? "Без номера",
        "ДатаДок": data.documentDate && formatDate(data.documentDate),
        "ИдДок": data.id,
        "ДопСведДок": data.additionalDetails,
        "ИдРекСост": mapArrayIfNotEmpty(data.issuerRequisites, formatIssuerRequisites),
    }
}
