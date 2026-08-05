/**
 * Сведение о лице, ответственном за организацию
 * перевозки со стороны перевозчика
 * (СвЛицОргПрвз, таб-7.5)
 */

import { formatPersonFullNameFields, type TPersonFullName } from './7.38-PersonFullName';

export type TCarrierOrgPerson = {
    /**
     * Номер телефона.
     * (1-255 символов, массив)
     */
    phones: string[]

    /**
     * Фамилия, имя, отчество (при наличии).
     * (таб-7.38)
     */
    fullName: TPersonFullName
}

export function formatCarrierOrgPerson(data: TCarrierOrgPerson) {
    if (data.phones.length === 0) {
        throw new TypeError("Требуется указать хотя бы один номер телефона")
    }

    return {
        "Тлф": data.phones,
        "ФИО": formatPersonFullNameFields(data.fullName),
    }
}
