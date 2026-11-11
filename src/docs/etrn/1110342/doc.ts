/**
 * Транспортная Накладная - Информация Перевозчика о выдаче груза грузополучателю
 * (ЭТрН, 1110342) (таб-15.2)
 */

import { fileNode, type TFileXmlMeta } from '../../shared'
import { formatDate, formatTime } from '../../../helpers'
import { formatConsigneeFileId, type TConsigneeFileId } from './data/15.3-ConsigneeFileId';
import { formatCarrierWaybillInfo, type TCarrierWaybillInfo } from './data/15.4-CarrierWaybillInfo';
import { formatCarrierSigner, type TCarrierSigner } from './data/15.8-CarrierSigner';

export type TDocument1110342 = {
    /** Наименование документа по факту хозяйственной жизни (1–255 символов). */
    documentName: string

    /** Идентификаторы иных получателей файла обмена (каждый 4–46 символов). */
    otherRecipientIds?: string[]

    /**
     * Дата и время формирования файла обмена информации перевозчика
     * о выдаче груза грузополучателю.
     */
    documentDateTime: Date

    /**
     * Идентификация файла обмена информации грузополучателя.
     * (таб-15.3)
     */
    consigneeFileId: TConsigneeFileId

    /**
     * Содержание транспортной накладной, информация перевозчика
     * о выдаче груза грузополучателю.
     * (таб-15.4)
     */
    carrierInfo: TCarrierWaybillInfo

    /**
     * Сведения о лице, подписывающем файл обмена информации перевозчика
     * о выдаче груза грузополучателю.
     * (таб-15.8)
     */
    signer: TCarrierSigner
}

export const Document1110342 = (data: TDocument1110342, meta: TFileXmlMeta = {}) => {
    if (!data.documentName?.trim() || data.documentName.length > 255) {
        throw new Error("Необходимо наименование документа длиной 1–255 символов")
    }

    if (!meta.programTag?.trim() || meta.programTag.length > 40) throw new TypeError("Не указана версия программы programTag (1–40 символов)")
    for (const id of data.otherRecipientIds ?? []) {
        if (id.length < 4 || id.length > 46) throw new TypeError("Идентификатор иного получателя должен содержать 4–46 символов")
    }
    const node = fileNode("1110342", "5.01", {
        "ПоФактХЖ": data.documentName,
        "ДатИнфПрвВыд": formatDate(data.documentDateTime),
        "ВрИнфПрвВыд": formatTime(data.documentDateTime),
        "ИдИнфГП": formatConsigneeFileId(data.consigneeFileId),
        "СодПрвВыд": formatCarrierWaybillInfo(data.carrierInfo),
        "Подписант": formatCarrierSigner(data.signer),
    }, { ...meta, documentCreatedAt: meta.documentCreatedAt ?? data.documentDateTime })
    const { Документ, ...file } = node.Файл as Record<string, unknown>
    return { Файл: { ...file, ИдПолИной: data.otherRecipientIds, Документ } }
}
