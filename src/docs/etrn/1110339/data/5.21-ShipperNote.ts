/**
 * Сведения об отметках грузоотправителя
 * (ОтметГО, таб-5.21)
 */

import { formatDateTimeWithUtc, mapArrayIfNotEmpty } from '../../../../helpers'
import { ShipperNoteReason, formatShipperNoteReason } from '../consts'
import { formatSettlementDoc, type TSettlementDoc } from './5.45-SettlementDoc';
import { formatPenaltyInfo, type TPenaltyInfo } from './5.22-PenaltyInfo';
import { formatInfoField, type TInfoField } from './5.44-InfoField';

export type TShipperNote = {
    /** Дата и время отметки (UTC) */
    notedAt: Date

    /**
     * Описание обстоятельств, послуживших основанием для отметки.
     * (1-2000 символов)
     */
    reason: ShipperNoteReason | string

    /** Сведения о коммерческих и иных актах, в том числе о погрузке груза */
    acts?: TSettlementDoc[]

    /** Расчет и размер штрафа */
    penalty?: TPenaltyInfo

    /** Сведения об актах взвешивания */
    weighingActs?: TSettlementDoc[]

    /** Информационное поле */
    infoField?: TInfoField[]
}

export function formatShipperNote(data: TShipperNote) {
    const dt = formatDateTimeWithUtc(data.notedAt)

    return {
        "ДатВрОтмет": dt.dateTime,
        "НалКоорТочВрОтм": dt.utc,
        "ОбстОтмет": formatShipperNoteReason(data.reason),
        "СвАкт": mapArrayIfNotEmpty(data.acts, formatSettlementDoc),
        "РазмШтр": data.penalty && formatPenaltyInfo(data.penalty),
        "СвАктВзв": mapArrayIfNotEmpty(data.weighingActs, formatSettlementDoc),
        "ИнфПол": data.infoField?.map(formatInfoField),
    }
}
