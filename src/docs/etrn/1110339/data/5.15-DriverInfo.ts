/**
 * Сведения о водителе
 * (СвВодит, таб-5.15)
 */

import { formatDate, mapArrayIfNotEmpty } from '../../../../helpers'
import { formatPersonFullName } from '../types'
import type { TPersonFullName } from '../types'
import { formatSettlementDoc } from './5.45-SettlementDoc'
import type { TSettlementDoc } from './5.45-SettlementDoc'

export type TDriverInfo = {
    /**
     * Номер водительского удостоверения.
     * Обязателен при отсутствии {inn}.
     * (1-20 символов)
     */
    driverLicenseNumber?: string

    /**
     * Дата выдачи водительского удостоверения.
     * Обязательна при отсутствии {inn}.
     */
    driverLicenseDate?: Date

    /**
     * ИНН физического лица.
     * Обязателен при отсутствии {driverLicenseNumber} и {driverLicenseDate}.
     */
    inn?: string

    /**
     * Сведения о способе идентификации при применении простой подписи.
     * (1-1000 символов)
     */
    simpleSignIdMethod?: string

    /** Номер телефона (1-20 символов каждый) */
    phone: string[]

    /** Фамилия, имя, отчество (при наличии) */
    fullName: TPersonFullName

    /** Сведения о путевом листе */
    waybills?: TSettlementDoc[]
}

export function formatDriverInfo(data: TDriverInfo) {
    if (!data.inn && (!data.driverLicenseNumber || !data.driverLicenseDate)) {
        throw new TypeError(
            "Требуется указать ИНН или номер и дату выдачи водительского удостоверения"
        )
    }

    if (!data.driverLicenseNumber && !data.driverLicenseDate && !data.inn) {
        throw new TypeError(
            "Требуется указать ИНН или номер и дату выдачи водительского удостоверения"
        )
    }

    return {
        "НомВУ": data.driverLicenseNumber,
        "ДатаВыдВУ": data.driverLicenseDate && formatDate(data.driverLicenseDate),
        "ИННФЛ": data.inn,
        "СвСпИдПодп": data.simpleSignIdMethod,
        "Тлф": data.phone,
        "ФИО": formatPersonFullName(data.fullName),
        "ПутевойЛист": mapArrayIfNotEmpty(data.waybills, formatSettlementDoc),
    }
}
