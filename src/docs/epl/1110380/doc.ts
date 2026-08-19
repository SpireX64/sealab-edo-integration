/**
 * Путевой лист, информация об обстоятельствах и особенностях рейса
 * (ЭПЛ, 1110380) (таб-5.2)
 */

import { Document, DocumentType } from '../../shared'
import { formatDate } from '../../../helpers'
import { TripStartSign, formatTripStartSign } from './consts'
import { formatWaybillContent, type TWaybillContent } from './data/5.3-WaybillContent';
import { formatWaybillSigner, type TWaybillSigner } from './data/5.22-WaybillSigner';

export type TDocument1110380 = {
    /**
     * Номер путевого листа.
     * (1-36 символов)
     */
    number?: string

    /**
     * Дата путевого листа.
     */
    issueDate?: Date

    /**
     * Признак начала рейса.
     * 1 – выезд с парковки (парковочного места);
     * 2 – прием-сдача транспортного средства последующим водителем
     * по окончании рабочего дня (смены) предыдущего водителя
     * (в случае оформления или формирования нескольких путевых листов
     * на одно транспортное средство).
     */
    tripStartSign: TripStartSign

    /**
     * Уникальный идентификатор предыдущего путевого листа.
     * Обязателен при {tripStartSign} = VehicleHandover (2).
     * В иных случаях не заполняется.
     * (1-36 символов)
     */
    previousWaybillId?: string

    /**
     * Содержание путевого листа, информация об обстоятельствах
     * и особенностях рейса.
     * (таб-5.3)
     */
    content: TWaybillContent

    /**
     * Сведения о лице, подписывающем файл обмена информации
     * об обстоятельствах и особенностях рейса в электронной форме.
     * (таб-5.22)
     */
    signer: TWaybillSigner
}

export const Document1110380 = (data: TDocument1110380) => {
    if (data.tripStartSign === TripStartSign.VehicleHandover && !data.previousWaybillId) {
        throw new TypeError(
            "Требуется указать previousWaybillId при tripStartSign = VehicleHandover (2)"
        )
    }

    return Document({
        type: DocumentType.EPL,
        subtype: "1110380",
    }, {
        "Документ": {
            "НомерПЛ": data.number,
            "ДатаПЛ": data.issueDate && formatDate(data.issueDate),
            "ПризнНачРейс": formatTripStartSign(data.tripStartSign),
            "УИДПЛПред": data.previousWaybillId,
            "СодИнфСоб": formatWaybillContent(data.content),
            "ПодпИнфСоб": formatWaybillSigner(data.signer),
        }
    })
}
