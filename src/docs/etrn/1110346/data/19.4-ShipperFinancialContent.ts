/** Финансовые сведения грузоотправителя (СодФХЖ2, таб-19.4). */
import { mapArrayIfNotEmpty } from '../../../../helpers'
import { formatAdditionalPartyDetails, type TAdditionalPartyDetails } from './19.11-AdditionalPartyDetails'
import { formatInfoField, type TInfoField } from './19.14-InfoField'
export type TShipperFinancialContent = {
    waybillId: string
    operationDescription: string
    shipperDetails: TAdditionalPartyDetails
    infoField?: TInfoField[]
}
export function formatShipperFinancialContent(data: TShipperFinancialContent) {
    if (!data.waybillId?.trim() || data.waybillId.length > 1000) throw new TypeError("Не указан УИД транспортной накладной")
    if (!data.operationDescription?.trim() || data.operationDescription.length > 1000) throw new TypeError("Не указано содержание факта хозяйственной жизни (1–1000 символов)")
    return { "УИД_ТрН": data.waybillId, "СодФХЖ": data.operationDescription, "ДопСвГО": formatAdditionalPartyDetails(data.shipperDetails), "ИнфПолФХЖ2": mapArrayIfNotEmpty(data.infoField, formatInfoField) }
}
