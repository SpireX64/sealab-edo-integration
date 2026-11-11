/**
 * Сведения о водителе
 * (СвВодит, таб-5.15)
 */

import { formatDate, mapArrayIfNotEmpty } from '../../../../helpers'
import { formatPersonFullName, type TPersonFullName } from '../types';
import { formatSettlementDoc, type TSettlementDoc } from './5.45-SettlementDoc';

export type TDriverInfo = {
    /**
     * Номер водительского удостоверения.
     * Обязателен при отсутствии {inn}.
     * (1-20 символов)
     */
    driverLicenseNumber?: string

    /** Серия ВУ (1-20 символов). Обязательна при отсутствии ИНН. */
    driverLicenseSeries?: string

    /**
     * Дата выдачи водительского удостоверения.
     * Обязательна при отсутствии {inn}.
     */
    driverLicenseDate?: Date

    /**
     * ИНН физического лица.
     * Обязателен при отсутствии полного набора номера, серии и даты выдачи ВУ.
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
    if (data.driverLicenseSeries !== undefined && (!data.driverLicenseSeries.trim() || data.driverLicenseSeries.length > 20)) {
        throw new TypeError("Серия водительского удостоверения должна содержать от 1 до 20 символов")
    }
    if (!data.inn?.trim() && (!data.driverLicenseNumber?.trim() || !data.driverLicenseSeries?.trim() || !data.driverLicenseDate)) {
        throw new TypeError("Требуется указать ИНН или номер, серию и дату выдачи водительского удостоверения")
    }

    return {
        "НомВУ": data.driverLicenseNumber,
        "СерВУ": data.driverLicenseSeries,
        "ДатаВыдВУ": data.driverLicenseDate && formatDate(data.driverLicenseDate),
        "ИННФЛ": data.inn,
        "СвСпИдПодп": data.simpleSignIdMethod,
        "Тлф": data.phone,
        "ФИО": formatPersonFullName(data.fullName),
        "ПутевойЛист": mapArrayIfNotEmpty(data.waybills, formatSettlementDoc),
    }
}
