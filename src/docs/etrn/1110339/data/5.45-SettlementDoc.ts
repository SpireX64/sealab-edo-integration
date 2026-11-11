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
     * Номер документа. Если документ действительно не имеет номера,
     * передаётся явное значение "Без номера".
     * 
     * Обязателен, если не указан {id}
     */
    documentNumber?: string

    /**
     * Дата документа
     * 
     * Обязателен, если не указан {id}
     */
    documentDate?: Date

    /** Идентифицирующие реквизиты сторон, составивших документ */
    partyDetails: readonly TIssuerIdentity[]

    /** Дополнительные сведения */
    extra?: string
}

export function formatSettlementDoc({id, name, documentNumber, documentDate, partyDetails, extra}: TSettlementDoc) {
    if (!id?.trim() && (!name?.trim() || !documentNumber?.trim() || !documentDate)) {
        throw new TypeError("Требуется указать данные о документе или идентификатор его файла")
    }

    if (partyDetails.length === 0) {
        throw new TypeError("Требуется указать реквизиты сторон составивших документ")
    }

    return {
        "ИдДок": id,
        "НаимДок": name,
        "НомерДок": documentNumber,
        "ДатаДок": documentDate && formatDate(documentDate),
        "ИдРекСост": partyDetails.map(formatIssuerIdentity),
        "ДопСведДок": extra,
    }
}
