/**
 * Транспортная Накладная - Информация Перевозчика о приеме груза к перевозке
 * (ЭТрН, 1110340) (таб-7.2)
 */

import { Document } from '../../shared'
import { DOC_TYPE_ETRN } from '../consts'
import { formatDateTimeWithUtc } from '../../../helpers'
import { formatShipperFileId } from './data/7.3-ShipperFileId'
import type { TShipperFileId } from './data/7.3-ShipperFileId'
import { formatCarrierWaybillInfo } from './data/7.4-CarrierWaybillInfo'
import type { TCarrierWaybillInfo } from './data/7.4-CarrierWaybillInfo'
import { formatCarrierSigner } from './data/7.8-SignerInfo'
import type { TCarrierSigner } from './data/7.8-SignerInfo'

export type TDocument1110340 = {
    /**
     * Дата и время формирования файла обмена информации перевозчика
     * о приеме груза к перевозке.
     * UTC-флаг вычисляется автоматически по таймзоне Date.
     */
    documentDateTime: Date

    /**
     * Идентификация файла обмена информации грузоотправителя.
     * (таб-7.3)
     */
    shipperFileId: TShipperFileId

    /**
     * Содержание транспортной накладной, информация перевозчика
     * о приеме груза к перевозке.
     * (таб-7.4)
     */
    carrierInfo: TCarrierWaybillInfo

    /**
     * Сведения о лице, подписывающем файл обмена информации перевозчика
     * о приеме груза к перевозке.
     * (таб-7.8)
     */
    signer: TCarrierSigner
}

export const Document1110340 = (data: TDocument1110340) => {
    const dt = formatDateTimeWithUtc(data.documentDateTime)

    return Document({
        type: DOC_TYPE_ETRN,
        subtype: "1110340",
    }, 
    {
        "Файл": {
            "Документ": {
                "ДатИнфПрвПрием": dt.dateTime,
                "НалКоорТочВрИнфПрв": dt.utc,
                "ИдИнфГО": formatShipperFileId(data.shipperFileId),
                "СодИнфПрвПрием": formatCarrierWaybillInfo(data.carrierInfo),
                "Подписант": formatCarrierSigner(data.signer),
            }
        }
    })
}
