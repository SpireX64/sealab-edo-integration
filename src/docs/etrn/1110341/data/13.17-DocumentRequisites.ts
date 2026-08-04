/**
 * Реквизиты документа
 * (РеквДокТип, таб-13.17)
 */

import { formatDate, mapArrayIfNotEmpty } from '../../../../helpers'
import { formatIssuerRequisites, type TIssuerRequisites } from './13.12-IssuerRequisites';

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
    number?: string

    /**
     * Дата документа.
     * Обязателен при отсутствии {id}.
     */
    date?: Date

    /**
     * Идентификатор файла документа (в том числе регистрационный номер).
     * Обязателен при отсутствии {name} и {number} и {date}.
     * (1-255 символов)
     */
    id?: string

    /**
     * Дополнительные сведения.
     * (1-2000 символов)
     */
    additionalInfo?: string

    /**
     * Идентифицирующие реквизиты сторон, составивших документ.
     * (таб-13.12)
     */
    issuerRequisites: TIssuerRequisites[]
}

export function formatDocumentRequisites(data: TDocumentRequisites) {
    if (!data.id && (!data.name || !data.number || !data.date)) {
        throw new TypeError(
            "Требуется указать идентификатор документа (id) " +
            "либо наименование (name), номер (number) и дату (date)"
        )
    }

    return {
        "НаимДок": data.name,
        "НомерДок": data.number ?? "Без номера",
        "ДатаДок": data.date && formatDate(data.date),
        "ИдДок": data.id,
        "ДопСведДок": data.additionalInfo,
        "ИдРекСост": mapArrayIfNotEmpty(data.issuerRequisites, formatIssuerRequisites),
    }
}
