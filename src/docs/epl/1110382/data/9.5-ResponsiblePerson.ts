/**
 * Сведения о должностном лице, ответственном
 * за техническое состояние и безопасную
 * эксплуатацию транспортного средства
 * (СвОтвЛиц, таб-9.5)
 */

import { formatPersonFullNameFields, type TPersonFullName } from './9.12-PersonFullName'

export type TResponsiblePerson = {
    /**
     * Должность лица, ответственного за техническое состояние
     * и безопасную эксплуатацию транспортного средства.
     * (1-255 символов)
     */
    position?: string

    /**
     * Фамилия, имя, отчество (при наличии).
     * (таб-9.12)
     */
    fullName: TPersonFullName
}

export function formatResponsiblePerson(data: TResponsiblePerson) {
    return {
        "Должн": data.position,
        "ФИО": formatPersonFullNameFields(data.fullName),
    }
}