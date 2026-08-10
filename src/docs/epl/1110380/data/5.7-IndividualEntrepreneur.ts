/**
 * Сведения об индивидуальном предпринимателе
 * (СвИП, таб-5.7)
 */

import { formatPersonFullNameFields, type TPersonFullName } from './5.38-PersonFullName';

export type TIndividualEntrepreneur = {
    /**
     * ИНН.
     * (12 символов)
     */
    inn?: string

    /**
     * Основной государственный регистрационный номер
     * индивидуального предпринимателя.
     * (15 символов)
     */
    ogrnip: string

    /**
     * Фамилия, имя, отчество (при наличии).
     * (таб-5.38)
     */
    fullName: TPersonFullName
}

export function formatIndividualEntrepreneur(data: TIndividualEntrepreneur) {
    return {
        "ИНН": data.inn,
        "ОГРНИП": data.ogrnip,
        "ФИО": formatPersonFullNameFields(data.fullName),
    }
}