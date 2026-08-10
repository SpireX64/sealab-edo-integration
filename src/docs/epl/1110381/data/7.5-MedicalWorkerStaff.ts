/**
 * Сведения о медицинском работнике, состоящем в штате
 * юридического лица или индивидуального предпринимателя,
 * осуществляющего деятельность по перевозке пассажиров
 * и багажа, грузов
 * (СвМедРаб, таб-7.5)
 */

import { formatPersonFullNameFields, type TPersonFullName } from './7.14-PersonFullName';
import { formatMedicalLicense, type TMedicalLicense } from './7.10-MedicalLicense';

export type TMedicalWorkerStaff = {
    /**
     * Должность медицинского работника.
     * (1-255 символов)
     */
    position?: string

    /**
     * Фамилия, имя, отчество (при наличии)
     * медицинского работника.
     * (таб-7.14)
     */
    fullName: TPersonFullName

    /**
     * Лицензия на проведение предсменных, предрейсовых
     * и послесменных, послерейсовых медицинских осмотров.
     * (таб-7.10)
     */
    license: TMedicalLicense
}

export function formatMedicalWorkerStaff(data: TMedicalWorkerStaff) {
    return {
        "Должн": data.position,
        "ФИО": formatPersonFullNameFields(data.fullName),
        "ЛицензМО": formatMedicalLicense(data.license),
    }
}