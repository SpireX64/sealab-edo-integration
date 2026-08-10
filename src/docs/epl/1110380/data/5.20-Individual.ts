/**
 * Сведения о физическом лице
 * (СвФЛТип, таб-5.20)
 */

import { formatPersonFullNameFields, type TPersonFullName } from './5.38-PersonFullName';

export type TIndividual = {
    /**
     * ИНН физического лица.
     * (12 символов)
     */
    inn: string

    /**
     * Иные сведения, идентифицирующие физическое лицо.
     * (1-255 символов)
     */
    otherInfo?: string

    /**
     * Фамилия, имя, отчество (при наличии).
     * (таб-5.38)
     */
    fullName: TPersonFullName
}

export function formatIndividual(data: TIndividual) {
    return {
        "ИННФЛ": data.inn,
        "ИныеСвед": data.otherInfo,
        "ФИО": formatPersonFullNameFields(data.fullName),
    }
}