/**
 * Содержание транспортной накладной, информация грузополучателя
 * (СодИнфГП, таб-13.4)
 */

import { mapArrayIfNotEmpty } from '../../../../helpers'
import { formatWaybillCorrection, type TWaybillCorrection } from './13.15-WaybillCorrection';
import { formatConsigneeAcceptance, type TConsigneeAcceptance } from './13.5-ConsigneeAcceptance';
import { formatConsigneeNote, type TConsigneeNote } from './13.7-ConsigneeNote';
import { formatInfoField, type TInfoField } from './13.16-InfoField';

const ACCEPTANCE_DESC =
    "Лицом, управомоченным на получение груза, при указанных обстоятельствах принят от перевозчика груз с указанными характеристиками"

const REJECTION_DESC =
    "Лицом, управомоченным на получение груза, при указанных обстоятельствах отказано в принятии от перевозчика груза с указанными характеристиками"

export type TConsigneeReceiptInfo = ({
    /** Груз принят */
    accepted: true

    /**
     * Сведения о приеме груза грузополучателем от перевозчика.
     * (таб-13.5)
     */
    acceptance: TConsigneeAcceptance
} | {
    /** В приеме груза отказано */
    accepted: false

    /**
     * Причина отказа в приеме груза.
     * (1-2000 символов)
     */
    rejectionReason: string
}) & {
    /**
     * Уникальный идентификатор документа транспортной накладной.
     * Выдается ГИС ЭПД. До начала функционирования ГИС ЭПД
     * принимает значение "Без номера".
     * (1-1000 символов)
     */
    waybillId: string

    /**
     * Исправление транспортной накладной.
     * Формируется в случае исправления ошибок.
     * (таб-13.15)
     */
    waybillCorrection?: TWaybillCorrection

    /**
     * Сведения об отметках грузополучателя.
     * (таб-13.7)
     */
    notes?: TConsigneeNote[]

    /**
     * Информационное поле.
     * (таб-13.16)
     */
    infoField?: TInfoField[]
}

export function formatConsigneeReceiptInfo(data: TConsigneeReceiptInfo) {
    return {
        "УИД_ТрН": data.waybillId,
        "СодОпПр": data.accepted ? ACCEPTANCE_DESC : undefined,
        "СодОпОтк": data.accepted ? undefined : REJECTION_DESC,
        "ПричОтк": data.accepted ? undefined : data.rejectionReason,
        "ИспрТрН": data.waybillCorrection && formatWaybillCorrection(data.waybillCorrection),
        "ПриемГрузГП": data.accepted ? formatConsigneeAcceptance(data.acceptance) : undefined,
        "ОтметГП": mapArrayIfNotEmpty(data.notes, formatConsigneeNote),
        "ИнфПол": mapArrayIfNotEmpty(data.infoField, formatInfoField),
    }
}
