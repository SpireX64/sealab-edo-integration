/**
 * Сведения о лице, уполномоченном на проставление
 * данных при заезде транспортного средства на парковку
 * (парковочное место)/при сдаче транспортного средства
 * (СвУплЛиц, таб-13.7)
 */

import { formatPersonFullNameFields, type TPersonFullName } from './13.11-PersonFullName'

export type TAuthorizedPerson = {
    /**
     * Должность лица, уполномоченного на проставление
     * данных при заезде транспортного средства на парковку
     * (парковочное место)/при сдаче транспортного средства.
     * (1-255 символов)
     */
    position?: string

    /**
     * Фамилия, имя, отчество (при наличии).
     * (таб-13.11)
     */
    fullName: TPersonFullName
}

export function formatAuthorizedPerson(data: TAuthorizedPerson) {
    return {
        "Должн": data.position,
        "ФИО": formatPersonFullNameFields(data.fullName),
    }
}
