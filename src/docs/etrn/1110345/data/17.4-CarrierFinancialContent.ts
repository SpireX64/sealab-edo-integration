/** Финансовое содержание перевозчика (СодФХЖ1, таб-17.4). */
import { mapArrayIfNotEmpty } from '../../../../helpers'
import { TaxRate, formatTaxRate } from '../consts'
import { formatTaxAmount, type TTaxAmount } from './17.5-TaxAmount'
import { formatWaybillCorrection, type TWaybillCorrection } from './17.8-Correction'
import { formatAdditionalPartyDetails, type TAdditionalPartyDetails } from './17.13-AdditionalPartyDetails'
import { formatInfoField, type TInfoField } from './17.16-InfoField'
export type TCarrierFinancialContent = {
    waybillId: string
    operationDescription: string
    currencyCode: string
    currencyName?: string
    /** Фактическая стоимость без НДС. Не вычисляется из ставки внутри конструктора. */
    amountWithoutVat: number
    taxRate?: TaxRate
    amountWithVat?: number
    calculation?: string
    tax: TTaxAmount
    correction?: TWaybillCorrection
    carrierDetails: TAdditionalPartyDetails
    infoField?: TInfoField[]
}
export function formatCarrierFinancialContent(data: TCarrierFinancialContent) {
    if (!data.waybillId?.trim() || data.waybillId.length > 1000) throw new TypeError("Не указан УИД транспортной накладной")
    if (!data.operationDescription?.trim() || data.operationDescription.length > 1000) throw new TypeError("Не указано содержание факта хозяйственной жизни (1–1000 символов)")
    if (!/^\d{3}$/.test(data.currencyCode)) throw new TypeError("Не указан трёхзначный код валюты")
    if (!Number.isFinite(data.amountWithoutVat) || (data.amountWithVat !== undefined && !Number.isFinite(data.amountWithVat))) throw new TypeError("Не указаны фактические денежные суммы")
    const rate = data.taxRate !== undefined ? formatTaxRate(data.taxRate) : undefined
    if (data.taxRate !== undefined && rate === undefined) throw new TypeError("Ставка НДС отсутствует в XSD")
    return {
        "УИД_ТрН": data.waybillId,
        "СодФХЖ": data.operationDescription,
        "ВалКод": data.currencyCode,
        "ВалНаим": data.currencyName,
        "СтТовБезНДС": data.amountWithoutVat.toFixed(2),
        "НалСт": rate,
        "СтТовУчНал": data.amountWithVat?.toFixed(2),
        "Расчет": data.calculation,
        "СумНал": formatTaxAmount(data.tax),
        "ИспрПУД": data.correction && formatWaybillCorrection(data.correction),
        "ДопСвПрв": formatAdditionalPartyDetails(data.carrierDetails),
        "ИнфПолФХЖ1": mapArrayIfNotEmpty(data.infoField, formatInfoField),
    }
}
