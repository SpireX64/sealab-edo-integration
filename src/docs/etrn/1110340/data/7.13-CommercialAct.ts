/**
 * Сведения о коммерческих и иных актах
 * (СвАктТип, таб-7.13)
 */

import { formatDate, mapArrayIfNotEmpty } from '../../../../helpers'
import { formatIssuerRequisites, type TIssuerRequisites } from './7.11-IssuerRequisites';

export type TCommercialAct = {
    /**
     * Наименование документа.
     * Обязателен, если не указан {id}.
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
     * Обязателен, если не указан {id}.
     */
    date?: Date

    /**
     * Идентификатор файла документа (в том числе регистрационный номер).
     * Обязателен, если не указаны {name} и {date}.
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
     * (таб-7.11)
     */
    issuerRequisites: TIssuerRequisites[]
}

export function formatCommercialAct(data: TCommercialAct) {
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
