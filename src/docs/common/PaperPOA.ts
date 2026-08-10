/**
 * Сведения о доверенности в бумажном виде,
 * используемой для подтверждения полномочий
 * (СвДоверБум)
 *
 * Общий тип для документов:
 * - ЭПЛ 1110381 (таб-7.13)
 * - ЭПЛ 1110382 (таб-9.11)
 */

import { formatDate } from '../../helpers'
import { formatPersonFullNameFields, type TPersonFullName } from './PersonFullName'

export type TPaperPOA = {
    /**
     * Дата совершения доверенности.
     */
    issueDate: Date

    /**
     * Внутренний регистрационный номер доверенности.
     * При отсутствии номера принимает значение: без номера (б/н).
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