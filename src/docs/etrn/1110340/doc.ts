/**
 * Транспортная Накладная - Информация Перевозчика о приеме груза к перевозке
 * (ЭТрН, 1110340) (таб-7.2)
 */

import { Document, DocumentType } from '../../shared'
import { formatShipperFileId, type TShipperFileId } from './data/7.3-ShipperFileId';
import { formatCarrierWaybillInfo, type TCarrierWaybillInfo } from './data/7.4-CarrierWaybillInfo';
import { formatCarrierSigner, type TCarrierSigner } from './data/7.8-CarrierSigner';

export type TDocument1110340 = {
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
    return Document({
        type: DocumentType.ETRN,
        subtype: "1110340",
    }, 
    {
        "Файл": {
            "Документ": {
                "ИдИнфГО": formatShipperFileId(data.shipperFileId),
                "СодИнфПрвПрием": formatCarrierWaybillInfo(data.carrierInfo),
                "Подписант": formatCarrierSigner(data.signer),
            }
        }
    })
}
