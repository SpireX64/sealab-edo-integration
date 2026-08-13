/**
 * Сведения о лице, уполномоченном на проставление
 * данных при выезде транспортного средства с парковки
 * (парковочного места)/при приеме транспортного средства
 * (СвУплЛиц, таб-11.8)
 */

import { formatPersonFullNameFields, type TPersonFullName } from './11.12-PersonFullName'

export type TAuthorizedPerson = {
    /**
     * Должность лица, уполномоченного на проставление
     * данных при выезде транспортного средства с парковки
     * (парковочного места)/при приеме транспортного средства.
     * (1-255 символов)
     */
    position?: string

    /**
     * Фамилия, имя, отчество (при наличии).
     * (таб-11.12)
     */
    fullName: TPersonFullName
}

export function formatAuthorizedPerson(data: TAuthorizedPerson) {
    return {
        "Должн": data.position,
        "ФИО": formatPersonFullNameFields(data.fullName),
    }
}