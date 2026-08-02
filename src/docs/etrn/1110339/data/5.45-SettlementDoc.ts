/**
 * Реквизиты документа
 * (РеквДокТип, таб-5.45)
 */

import { formatDate } from '../../../../helpers'
import { formatIssuerIdentity, type TIssuerIdentity } from './5.36-IssuerIdentity';

export type TSettlementDoc = {
    /**
     * Идентификатор файла документа
     * 
     * В том числе регистрационный номер, если документ/сведения о таком документе содержатся
     * в государственных информационных системах
     */
    id?: string

    /**
     * Наименование документа
     * 
     * Обязателен, если не указан {id}
     */
    name?: string

    /**
     * Номер документа. При отсутствии указывается "Без номера"
     * 
     * Обязателен, если не указан {id}
     */
    number?: string

    /**
     * Дата документа
     * 
     * Обязателен, если не указан {id}
     */
    date?: Date

    /** Идентифицирующие реквизиты сторон, составивших документ */
    partyDetails: readonly TIssuerIdentity[]

    /** Дополнительные сведения */
    extra?: string
}

export function formatSettlementDoc({id, name, number, date, partyDetails, extra}: TSettlementDoc) {
    if (!id && !name && !number && !date) {
        throw new TypeError("Требуется указать данные о документе или идентификатор его файла")
    }

    if (partyDetails.length === 0) {
        throw new TypeError("Требуется указать реквизиты сторон составивших документ")
    }

    return {
        "ИдДок": id,
        "НаимДок": name,
        "НомерДок": number ?? "Без номера",
        "ДатаДок": date && formatDate(date),
        "ИдРекСост": partyDetails.map(formatIssuerIdentity),
        "ДопСведДок": extra,
    }
}
