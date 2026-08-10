/**
 * Сведения о доверенности в бумажном виде,
 * используемой для подтверждения полномочий
 * (СвДоверБум, таб-5.24)
 */

import { formatDate } from '../../../../helpers'
import { formatPersonFullNameFields, type TPersonFullName } from './5.38-PersonFullName';

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
    principalInfo?: string

    /**
     * Фамилия, имя, отчество (при наличии) лица,
     * подписавшего доверенность.
     * (таб-5.38)
     */
    signerFullName?: TPersonFullName
}

export function formatPaperPOA(data: TPaperPOA) {
    return {
        "ДатаДовер": formatDate(data.issueDate),
        "ВнНомДовер": data.internalNumber ?? "б/н",
        "СвИдДовер": data.principalInfo,
        "ФИО": data.signerFullName && formatPersonFullNameFields(data.signerFullName),
    }
}