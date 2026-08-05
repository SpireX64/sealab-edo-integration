/**
 * Сведения о водителе
 * (СвВодит, таб-7.6)
 */

import { formatDate } from '../../../../helpers'
import { formatPersonFullNameFields, type TPersonFullName } from './7.38-PersonFullName';

export type TDriverInfo = {
    /**
     * Номер водительского удостоверения.
     * (1-20 символов)
     */
    licenseNumber: string

    /**
     * Серия водительского удостоверения.
     * (1-20 символов)
     */
    licenseSeries: string

    /**
     * Дата выдачи водительского удостоверения.
     */
    licenseIssueDate: Date

    /**
     * ИНН физического лица.
     * (12 символов)
     */
    inn: string

    /**
     * Номер телефона.
     * (1-20 символов, массив)
     */
    phones: string[]

    /**
     * Фамилия, имя, отчество (при наличии).
     * (таб-7.38)
     */
    fullName: TPersonFullName
}

export function formatDriverInfo(data: TDriverInfo) {
    if (data.phones.length === 0) {
        throw new TypeError("Требуется указать хотя бы один номер телефона")
    }

    return {
        "НомВУ": data.licenseNumber,
        "СерВУ": data.licenseSeries,
        "ДатаВыдВУ": formatDate(data.licenseIssueDate),
        "ИННФЛ": data.inn,
        "Тлф": data.phones,
        "ФИО": formatPersonFullNameFields(data.fullName),
    }
}
