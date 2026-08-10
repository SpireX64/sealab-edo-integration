/**
 * Лицензия на проведение предсменных, предрейсовых
 * и послесменных, послерейсовых медицинских осмотров
 * (ЛицензМОТип, таб-7.10)
 */

import { formatDate } from '../../../../helpers'

export type TMedicalLicense = {
    /**
     * Серия.
     * (1-60 символов)
     */
    series: string

    /**
     * Номер.
     * (1-60 символов)
     */
    number: string

    /**
     * Дата выдачи.
     */
    issueDate: Date

    /**
     * Срок окончания действия.
     */
    expiryDate: Date
}

export function formatMedicalLicense(data: TMedicalLicense) {
    return {
        "Сер": data.series,
        "Ном": data.number,
        "ДатВыд": formatDate(data.issueDate),
        "Срок": formatDate(data.expiryDate),
    }
}