/**
 * Транспортная Накладная - Информация Перевозчика о приеме груза к перевозке
 * (ЭТрН, 1110340) (таб-7.2)
 */

import { fileNode, type TFileXmlMeta } from '../../shared'
import { formatDateTimeWithUtc } from '../../../helpers'
import { formatShipperFileId, type TShipperFileId } from './data/7.3-ShipperFileId';
import { formatCarrierWaybillInfo, type TCarrierWaybillInfo } from './data/7.4-CarrierWaybillInfo';
import { formatCarrierSigner, type TCarrierSigner } from './data/7.8-CarrierSigner';

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

export const Document1110340 = (data: TDocument1110340, meta: TFileXmlMeta = {}) => {
    const dt = formatDateTimeWithUtc(data.documentDateTime)

    return fileNode("1110340", "5.01", {
        "ДатИнфПрвПрием": dt.dateTime,
        "НалКоорТочВрИнфПрв": dt.utc,
        "ИдИнфГО": formatShipperFileId(data.shipperFileId),
        "СодИнфПрвПрием": formatCarrierWaybillInfo(data.carrierInfo),
        "Подписант": formatCarrierSigner(data.signer),
    }, meta)
}
