/**
 * Сведения о водителе (водителях) транспортного средства
 * (СвВодит, таб-5.12)
 */

import { formatDriverLicense, type TDriverLicense } from './5.13-DriverLicense';
import { formatPersonFullNameFields, type TPersonFullName } from './5.38-PersonFullName';

export type TDriverInfo = {
    /**
     * ИНН физического лица.
     * (12 символов)
     */
    inn?: string

    /**
     * Данные водительского удостоверения.
     * (таб-5.13)
     */
    driverLicense?: TDriverLicense

    /**
     * Фамилия, имя, отчество (при наличии).
     * (таб-5.38)
     */
    fullName: TPersonFullName
}

export function formatDriverInfo(data: TDriverInfo) {
    return {
        "ИННФЛ": data.inn,
        "ВодитУд": data.driverLicense && formatDriverLicense(data.driverLicense),
        "ФИО": formatPersonFullNameFields(data.fullName),
    }
}