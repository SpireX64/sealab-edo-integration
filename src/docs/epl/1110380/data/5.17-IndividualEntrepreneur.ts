/**
 * Сведения об индивидуальном предпринимателе
 * (СвИПТип, таб-5.17)
 */

import { formatPersonFullNameFields, type TPersonFullName } from './5.38-PersonFullName';

export type TIndividualEntrepreneur5 = {
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
     * (таб-5.38)
     */
    fullName: TPersonFullName
}

export function formatIndividualEntrepreneur5(data: TIndividualEntrepreneur5) {
    return {
        "ИНН": data.inn,
        "ОГРНИП": data.ogrnip,
        "ИныеСвед": data.otherInfo,
        "ФИО": formatPersonFullNameFields(data.fullName),
    }
}