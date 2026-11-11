/**
 * Транспортная Накладная - Информация Перевозчика о приеме груза к перевозке
 * (ЭТрН, 1110340) (таб-7.2)
 */

import { fileNode, type TFileXmlMeta } from '../../shared'
import { formatDate, formatTime } from '../../../helpers'
import { formatShipperFileId, type TShipperFileId } from './data/7.3-ShipperFileId';
import { formatCarrierWaybillInfo, type TCarrierWaybillInfo } from './data/7.4-CarrierWaybillInfo';
import { formatCarrierSigner, type TCarrierSigner } from './data/7.8-CarrierSigner';

export type TDocument1110340 = {
    /** Наименование документа по факту хозяйственной жизни (1–255 символов). */
    documentName: string

    /**
     * Дата и время формирования файла обмена информации перевозчика
     * о приеме груза к перевозке.
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
    if (!data.documentName?.trim() || data.documentName.length > 255) {
        throw new Error("Необходимо наименование документа длиной 1–255 символов")
    }

    return fileNode("1110340", "5.01", {
        "ПоФактХЖ": data.documentName,
        "ДатИнфПрвПрием": formatDate(data.documentDateTime),
        "ВрИнфПрвПрием": formatTime(data.documentDateTime),
        "ИдИнфГО": formatShipperFileId(data.shipperFileId),
        "СодИнфПрвПрием": formatCarrierWaybillInfo(data.carrierInfo),
        "Подписант": formatCarrierSigner(data.signer),
    }, { ...meta, documentCreatedAt: meta.documentCreatedAt ?? data.documentDateTime })
}
