/**
 * Сведения об индивидуальном предпринимателе
 * (СвИПТип, таб-7.20)
 */

import { formatPersonFullNameFields, type TPersonFullName } from './7.38-PersonFullName';

export type TIndividualEntrepreneur = {
    /**
     * ИНН.
     * (12 символов)
     */
    inn: string

    /**
     * Основной государственный регистрационный номер
     * индивидуального предпринимателя.
     * (15 символов)
     */
    ogrnip?: string

    /**
     * Иные сведения, идентифицирующие физическое лицо.
     * (1-255 символов)
     */
    otherInfo?: string

    /**
     * Фамилия, имя, отчество (при наличии).
     * (таб-7.38)
     */
    fullName: TPersonFullName
}

export function formatIndividualEntrepreneur(data: TIndividualEntrepreneur) {
    return {
        "ИННФЛ": data.inn,
        "ОГРНИП": data.ogrnip,
        "ИныеСвед": data.otherInfo,
        "ФИО": formatPersonFullNameFields(data.fullName),
    }
}