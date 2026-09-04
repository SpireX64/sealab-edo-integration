/**
 * Путевой лист, информация о показаниях одометра
 * при заезде транспортного средства на парковку
 * (парковочное место)/при сдаче транспортного
 * средства другому водителю
 * (ЭПЛ, 1110384) (таб-13.2)
 */

import { fileNode, type TFileXmlMeta } from '../../shared'
import { formatDepartureFileId, type TDepartureFileId } from './data/13.3-DepartureFileId';
import { formatArrivalContent, type TArrivalContent } from './data/13.4-ArrivalContent';
import { formatArrivalSigner, type TArrivalSigner } from './data/13.8-ArrivalSigner';

export type TDocument1110384 = {
    /**
     * Идентификация файла обмена информации о показаниях
     * одометра при выезде транспортного средства с парковки
     * (парковочного места)/при приеме транспортного средства
     * от другого водителя.
     * (таб-13.3)
     */
    departureFileId: TDepartureFileId

    /**
     * Содержание путевого листа, информация о показаниях
     * одометра при заезде транспортного средства на парковку
     * (парковочное место)/при сдаче транспортного средства
     * другому водителю.
     * (таб-13.4)
     */
    content: TArrivalContent

    /**
     * Сведения о лице, подписывающем файл обмена информации
     * о показаниях одометра при заезде транспортного средства
     * на парковку (парковочное место)/при сдаче транспортного
     * средства другому водителю в электронной форме.
     * (таб-13.8)
     */
    signer: TArrivalSigner
}

export const Document1110384 = (data: TDocument1110384, meta: TFileXmlMeta = {}) =>
    fileNode("1110384", "5.01", {
        "ИдИнфВыезд": formatDepartureFileId(data.departureFileId),
        "СодИнфЗаезд": formatArrivalContent(data.content),
        "ПодпИнфЗаезд": formatArrivalSigner(data.signer),
    }, meta)
