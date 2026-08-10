/**
 * Данные водительского удостоверения
 * (ВодитУд, таб-7.9)
 */

import { formatDate } from '../../../../helpers'

export type TDriverLicense = {
    /**
     * Номер водительского удостоверения.
     * (1-20 символов)
     */
    number: string

    /**
     * Серия водительского удостоверения.
     * (1-20 символов)
     */
    series: string

    /**
     * Дата выдачи водительского удостоверения.
     */
    issueDate: Date
}

export function formatDriverLicense(data: TDriverLicense) {
    return {
        "НомВУ": data.number,
        "СерВУ": data.series,
        "ДатаВыдВУ": formatDate(data.issueDate),
    }
}