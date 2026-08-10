/**
 * Сведения о доверенности в бумажном виде,
 * используемой для подтверждения полномочий
 * (СвДоверБум, таб-7.13)
 */

import { formatDate } from '../../../../helpers'
import { formatPersonFullNameFields, type TPersonFullName } from './7.14-PersonFullName'

export type TPaperPOA = {
    /**
     * Дата совершения доверенности.
     */
    issueDate: Date

    /**
     * Внутренний регистрационный номер доверенности.
     * При отсутствии номера — «б/н».
     * (1-50 символов)
     */
    internalNumber: string

    /**
     * Сведения, идентифицирующие доверителя.
     * (1-1000 символов)
     */
    issuerInfo?: string

    /**
     * Фамилия, имя, отчество (при наличии)
     * лица, подписавшего доверенность.
     * (таб-7.14)
     */
    signerFullName?: TPersonFullName
}

export function formatPaperPOA(data: TPaperPOA) {
    return {
        "ДатаДовер": formatDate(data.issueDate),
        "ВнНомДовер": data.internalNumber,
        "СвИдДовер": data.issuerInfo,
        "ФИО": data.signerFullName && formatPersonFullNameFields(data.signerFullName),
    }
}