/**
 * Транспортная Накладная - Информация Грузополучателя
 * (ЭТрН, 1110341) (таб-13.2)
 */

import { fileNode, type TFileXmlMeta } from '../../shared'
import { formatDate, formatTime } from '../../../helpers'
import { formatCarrierAcceptanceFileId, type TCarrierAcceptanceFileId } from './data/13.3-CarrierAcceptanceFileId';
import { formatConsigneeReceiptInfo, type TConsigneeReceiptInfo } from './data/13.4-ConsigneeReceiptInfo';
import { formatConsigneeSigner, type TConsigneeSigner } from './data/13.9-ConsigneeSigner';
import { formatDocumentRequisites, type TDocumentRequisites } from './data/13.17-DocumentRequisites';

export type TDocument1110341 = {
    /** Наименование документа по факту хозяйственной жизни (1–255 символов). */
    documentName: string

    /**
     * Наименование экономического субъекта – составителя файла обмена
     * информации грузополучателя.
     * (1-1000 символов)
     */
    compilerName: string

    /**
     * Основание, по которому экономический субъект является составителем
     * файла обмена информации грузополучателя.
     * Заполняется, если составитель не является грузополучателем.
     * (таб-13.17)
     */
    compilerAuthority?: TDocumentRequisites

    /**
     * Идентификация файла обмена информации перевозчика о приеме груза.
     * (таб-13.3)
     */
    carrierAcceptanceFileId: TCarrierAcceptanceFileId

    /**
     * Дата и время формирования файла обмена информации грузополучателя.
     */
    createdAt: Date

    /**
     * Содержание транспортной накладной, информация грузополучателя.
     * (таб-13.4)
     */
    consigneeInfo: TConsigneeReceiptInfo

    /**
     * Сведения о лице, подписывающем файл обмена информации грузополучателя.
     * (таб-13.9)
     */
    signer: TConsigneeSigner
}

export const Document1110341 = (data: TDocument1110341, meta: TFileXmlMeta = {}) => {
    if (!data.documentName?.trim() || data.documentName.length > 255) {
        throw new Error("Необходимо наименование документа длиной 1–255 символов")
    }
    return fileNode("1110341", "5.01", {
        "ПоФактХЖ": data.documentName,
        "НаимЭконСубСост": data.compilerName,
        "ОснДоверОргСост": data.compilerAuthority && formatDocumentRequisites(data.compilerAuthority),
        "ИдИнфПрвПрием": formatCarrierAcceptanceFileId(data.carrierAcceptanceFileId),
        "ДатИнфГП": formatDate(data.createdAt),
        "ВрИнфГП": formatTime(data.createdAt),
        "СодИнфГП": formatConsigneeReceiptInfo(data.consigneeInfo),
        "Подписант": formatConsigneeSigner(data.signer),
    }, { ...meta, documentCreatedAt: meta.documentCreatedAt ?? data.createdAt })
}
