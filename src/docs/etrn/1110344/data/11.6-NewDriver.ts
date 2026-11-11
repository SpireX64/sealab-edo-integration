/** Сведения о новом водителе (таб-11.6). */
import { formatDate, mapArrayIfNotEmpty } from '../../../../helpers'
import { formatPersonFullNameFields, type TPersonFullName } from './11.22-FullName'
import { formatDocumentRequisites, type TDocumentRequisites } from './11.12-DocumentRequisites'
export type TNewDriver = {
    driverLicenseNumber?: string
    driverLicenseSeries?: string
    driverLicenseDate?: Date
    inn?: string
    /** Способ идентификации при простой подписи (1–1000 символов). */
    simpleSignIdMethod?: string
    /** Один или несколько телефонов (1–20 символов каждый). */
    phones: string[]
    fullName: TPersonFullName
    waybills?: TDocumentRequisites[]
}
export function formatNewDriver(data: TNewDriver) {
    if (!data.inn && (!data.driverLicenseNumber || !data.driverLicenseSeries || !data.driverLicenseDate)) {
        throw new TypeError("Для нового водителя нужны ИНН либо номер, серия и дата выдачи ВУ")
    }
    if (!data.phones?.length || data.phones.some(p => !p.trim() || p.length > 20)) throw new TypeError("Не указан телефон водителя (1–20 символов)")
    return {
        "НомВУ": data.driverLicenseNumber,
        "СерВУ": data.driverLicenseSeries,
        "ДатаВыдВУ": data.driverLicenseDate && formatDate(data.driverLicenseDate),
        "ИННФЛ": data.inn,
        "СвСпИдПодп": data.simpleSignIdMethod,
        "Тлф": data.phones,
        "ФИО": formatPersonFullNameFields(data.fullName),
        "ПутевойЛист": mapArrayIfNotEmpty(data.waybills, formatDocumentRequisites),
    }
}
