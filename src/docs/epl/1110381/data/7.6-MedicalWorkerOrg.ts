/**
 * Сведения о медицинской организации и медицинском работнике,
 * состоящем в штате медицинской организации
 * (СвМедОрг, таб-7.6)
 */

import { formatPersonFullNameFields, type TPersonFullName } from './7.14-PersonFullName';
import { formatMedicalLicense, type TMedicalLicense } from './7.10-MedicalLicense';

export type TMedicalWorkerOrg = {
    /**
     * Наименование медицинской организации.
     * (1-255 символов)
     */
    orgName: string

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

export function formatMedicalWorkerOrg(data: TMedicalWorkerOrg) {
    return {
        "НаимМедОрг": data.orgName,
        "Должн": data.position,
        "ФИО": formatPersonFullNameFields(data.fullName),
        "ЛицензМО": formatMedicalLicense(data.license),
    }
}