/**
 * Транспортная Накладная - Информация Грузополучателя
 * (ЭТрН, 1110341) (таб-13.2)
 */

import { Document, DocumentType } from '../../shared'
import { formatDate, formatTime } from '../../../helpers'
import { formatCarrierAcceptanceFileId, type TCarrierAcceptanceFileId } from './data/13.3-CarrierAcceptanceFileId';
import { formatConsigneeReceiptInfo, type TConsigneeReceiptInfo } from './data/13.4-ConsigneeReceiptInfo';
import { formatConsigneeSigner, type TConsigneeSigner } from './data/13.9-ConsigneeSigner';
import { formatDocumentRequisites, type TDocumentRequisites } from './data/13.17-DocumentRequisites';

export type TDocument1110341 = {
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
     * Дата формирования файла обмена информации грузополучателя.
     */
    date: Date

    /**
     * Время формирования файла обмена информации грузополучателя.
     */
    time: Date

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

export const Document1110341 = (data: TDocument1110341) => Document({
    type: DocumentType.ETRN,
    subtype: "1110341",
}, {
    "Файл": {
        "Документ": {
            "НаимЭконСубСост": data.compilerName,
            "ОснДоверОргСост": data.compilerAuthority && formatDocumentRequisites(data.compilerAuthority),
            "ИдИнфПрвПрием": formatCarrierAcceptanceFileId(data.carrierAcceptanceFileId),
            "ДатИнфГП": formatDate(data.date),
            "ВрИнфГП": formatTime(data.time),
            "СодИнфГП": formatConsigneeReceiptInfo(data.consigneeInfo),
            "Подписант": formatConsigneeSigner(data.signer),
        }
    }
})
