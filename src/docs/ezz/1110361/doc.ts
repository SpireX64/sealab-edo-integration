/**
 * Заказ и заявка, информация грузоотправителя
 * (ЭЗЗ, 1110361) (таб-5.2)
 */

import { formatDate, formatTime } from '../../../helpers'
import { DocumentFunction, formatDocumentFunction } from './consts'
import { fileNode, type TFileXmlMeta } from '../../shared'
import { formatDocumentRequisites, type TDocumentRequisites } from './data/5.16-DocumentRequisites';
import { formatShipperContent, type TShipperContent } from './data/5.3-ShipperContent';
import { formatShipperSigner, type TShipperSigner } from './data/5.13-ShipperSigner';

export type TDocument1110361 = {
    /** Функция: заказ или заявка. */
    documentFunction: DocumentFunction

    /** Дата и время формирования файла обмена информации грузоотправителя. */
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

export const Document1110361 = (data: TDocument1110361, meta: TFileXmlMeta = {}) => {
    const documentFunction = formatDocumentFunction(data.documentFunction)
    if (data.documentFunction === DocumentFunction.Request && !data.transportContract) {
        throw new Error("Для заявки необходим договор об организации перевозки груза")
    }
    return fileNode("1110361", "5.01", {
        "Функция": documentFunction,
        "ДатИнфГО": formatDate(data.createdAt),
        "ВрИнфГО": formatTime(data.createdAt),
        "НаимЭкСубСост": data.compilerName,
        "ОснДовОргСост": data.compilerAuthority && formatDocumentRequisites(data.compilerAuthority),
        "ДогОргПрвз": data.transportContract && formatDocumentRequisites(data.transportContract),
        "СодИнфГО": formatShipperContent(data.content),
        "ПодпИнфГО": formatShipperSigner(data.signer),
    }, { ...meta, documentCreatedAt: meta.documentCreatedAt ?? data.createdAt })
}
