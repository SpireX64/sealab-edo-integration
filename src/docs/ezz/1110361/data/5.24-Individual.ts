/**
 * Сведения о физическом лице
 * (СвФЛТип, таб-5.24)
 */

import { formatPersonFullName, type TPersonFullName } from './5.42-PersonFullName';

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
     * (таб-5.42)
     */
    fullName: TPersonFullName
}

export function formatIndividual(data: TIndividual) {
    return {
        "ИННФЛ": data.inn,
        "ИныеСвед": data.otherInfo,
        "ФИО": formatPersonFullName(data.fullName),
    }
}
