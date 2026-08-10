/**
 * Сведения о водителе транспортного средства
 * (СвВодит, таб-7.8)
 */

import { formatDriverLicense, type TDriverLicense } from './7.9-DriverLicense';
import { formatPersonFullNameFields, type TPersonFullName } from './7.14-PersonFullName';

export type TDriverExamInfo = {
    /**
     * ИНН физического лица.
     * (12 символов)
     */
    inn?: string

    /**
     * Данные водительского удостоверения.
     * (таб-7.9)
     */
    driverLicense?: TDriverLicense

    /**
     * Фамилия, имя, отчество (при наличии).
     * (таб-7.14)
     */
    fullName: TPersonFullName
}

export function formatDriverExamInfo(data: TDriverExamInfo) {
    return {
        "ИННФЛ": data.inn,
        "ВодитУд": data.driverLicense && formatDriverLicense(data.driverLicense),
        "ФИО": formatPersonFullNameFields(data.fullName),
    }
}