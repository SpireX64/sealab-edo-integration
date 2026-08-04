/**
 * Реквизиты документа
 * (РеквДокТип, таб-5.16)
 */

import { formatDate, mapArrayIfNotEmpty } from '../../../../helpers'
import { formatIssuerRequisites, type TIssuerRequisites } from './5.17-IssuerRequisites';

export type TDocumentRequisites = {
    /**
     * Наименование документа.
     * Обязателен, если не указан {id}.
     * (1-255 символов)
     */
    name?: string

    /**
     * Номер документа.
     * Обязателен, если не указан {id}.
     * При отсутствии указывается: «Без номера».
     * (1-255 символов)
     */
    documentNumber?: string

    /**
     * Дата документа.
     * Обязателен, если не указан {id}.
     */
    documentDate?: Date

    /**
     * Идентификатор файла документа (в том числе регистрационный номер).
     * Обязателен, если не указаны {name}, {documentNumber}, {documentDate}.
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
     * (таб-5.17)
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
