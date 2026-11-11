/** Электронная доверенность ЭСВ. Номер допускает буквенные символы (XSD: 1–100). */
import { formatDate } from '../../../helpers'
export type TPowerOfAttorney = {
    executionDate:Date
    serialNumber?:string | number
    fileId:string
    revocationSystemUrl?:string
}
export function formatPowerOfAttorney(data:TPowerOfAttorney) {
    if (data.serialNumber !== undefined && (!String(data.serialNumber).trim() || String(data.serialNumber).length > 100)) throw new TypeError('Номер доверенности должен содержать 1–100 символов')
    if (!data.fileId?.trim() || data.fileId.length > 255) throw new TypeError('Не указан идентификатор доверенности (1–255 символов)')
    return {"ДатаДовер":formatDate(data.executionDate),"НомерДовер":data.serialNumber,"ИдентДовер":data.fileId,"СведСистОтм":data.revocationSystemUrl}
}
