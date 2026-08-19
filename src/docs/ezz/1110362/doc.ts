/**
 * Заказ и заявка, информация перевозчика
 * (ЭЗЗ, 1110362) (таб-7.2)
 */

import { Document, DocumentType } from '../../shared'
import { formatDate, formatTime } from '../../../helpers'
import { formatDocumentRequisites, type TDocumentRequisites } from '../1110361/data/5.16-DocumentRequisites';
import { formatShipperFileId, type TShipperFileId } from './data/7.3-ShipperFileId';
import { formatCarrierContent, type TCarrierContent } from './data/7.4-CarrierContent';
import { formatCarrierSigner, type TCarrierSigner } from './data/7.10-CarrierSigner';

export type TDocument1110362 = {
    /**
     * Дата и время формирования файла обмена информации перевозчика.
     */
    createdAt: Date

    /**
     * Наименование экономического субъекта, составляющего файл обмена
     * информации перевозчика.
     * (1-1000 символов)
     */
    compilerName: string

    /**
     * Основание, по которому экономический субъект является составителем
     * файла обмена информации перевозчика.
     * Обязателен, если составитель информации перевозчика
     * не является перевозчиком.
     * (таб-7.15)
     */
    compilerAuthority?: TDocumentRequisites

    /**
     * Идентификация файла обмена информации грузоотправителя.
     * (таб-7.3)
     */
    shipperFileId: TShipperFileId

    /**
     * Содержание заказа и заявки, информация перевозчика.
     * (таб-7.4)
     */
    content: TCarrierContent

    /**
     * Сведения о лице, подписывающем файл обмена информации
     * перевозчика.
     * (таб-7.10)
     */
    signer: TCarrierSigner
}

export const Document1110362 = (data: TDocument1110362) => Document({
    type: DocumentType.EZZ,
    subtype: "1110362",
}, {
    "Документ": {
        "ДатИнфГО": formatDate(data.createdAt),
        "ВрИнфГО": formatTime(data.createdAt),
        "НаимЭкСубСост": data.compilerName,
        "ОснДовОргСост": data.compilerAuthority && formatDocumentRequisites(data.compilerAuthority),
        "ИдИнфГО": formatShipperFileId(data.shipperFileId),
        "СодИнфПрв": formatCarrierContent(data.content),
        "ПодпИнфПрв": formatCarrierSigner(data.signer),
    }
})
