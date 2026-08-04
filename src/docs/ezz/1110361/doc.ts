/**
 * Заказ и заявка, информация грузоотправителя
 * (ЭЗЗ, 1110361) (таб-5.2)
 */

import { Document, DocumentType } from '../../shared'
import { formatDate, formatTime } from '../../../helpers'
import { formatDocumentRequisites, type TDocumentRequisites } from './data/5.16-DocumentRequisites';
import { formatShipperContent, type TShipperContent } from './data/5.3-ShipperContent';
import { formatShipperSigner, type TShipperSigner } from './data/5.13-ShipperSigner';

export type TDocument1110361 = {
    /**
     * Дата и время формирования файла обмена информации грузоотправителя.
     */
    createdAt: Date

    /**
     * Наименование экономического субъекта, составляющего файл обмена
     * информации грузоотправителя.
     * (1-1000 символов)
     */
    compilerName: string

    /**
     * Основание, по которому экономический субъект является составителем
     * файла обмена информации грузоотправителя.
     * Обязателен, если составитель информации грузоотправителя
     * не является грузоотправителем.
     * (таб-5.16)
     */
    compilerAuthority?: TDocumentRequisites

    /**
     * Реквизиты договора об организации перевозки груза.
     * Обязателен при <Функция> = Заявка.
     * (таб-5.16)
     */
    transportContract?: TDocumentRequisites

    /**
     * Содержание заказа и заявки, информация грузоотправителя.
     * (таб-5.3)
     */
    content: TShipperContent

    /**
     * Сведения о лице, подписывающем файл обмена информации
     * грузоотправителя.
     * (таб-5.13)
     */
    signer: TShipperSigner
}

export const Document1110361 = (data: TDocument1110361) => Document({
    type: DocumentType.EZZ,
    subtype: "1110361",
}, {
    "Файл": {
        "Документ": {
            "ДатИнфГО": formatDate(data.createdAt),
            "ВрИнфГО": formatTime(data.createdAt),
            "НаимЭкСубСост": data.compilerName,
            "ОснДовОргСост": data.compilerAuthority && formatDocumentRequisites(data.compilerAuthority),
            "ДогОргПрвз": data.transportContract && formatDocumentRequisites(data.transportContract),
            "СодИнфГО": formatShipperContent(data.content),
            "ПодпИнфГО": formatShipperSigner(data.signer),
        }
    }
})
