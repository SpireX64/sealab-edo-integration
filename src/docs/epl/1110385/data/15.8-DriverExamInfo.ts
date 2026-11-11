/**
 * Сведения о водителе транспортного средства
 * (СвВодит, таб-15.8)
 */

import { formatDriverLicense, type TDriverLicense } from './15.9-DriverLicense';
import { formatPersonFullNameFields, type TPersonFullName } from './15.14-PersonFullName';

export type TDriverExamInfo = {
    /**
     * ИНН физического лица.
     * (12 символов)
     */
    inn?: string

    /**
     * Данные водительского удостоверения.
     * (таб-15.9)
     */
    driverLicense?: TDriverLicense

    /**
     * Фамилия, имя, отчество (при наличии).
     * (таб-15.14)
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