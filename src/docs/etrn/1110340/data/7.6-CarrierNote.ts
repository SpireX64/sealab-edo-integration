/**
 * Сведения об отметках перевозчика при приеме груза
 * (ОтметПрвПрием, таб-7.6)
 */

import { formatDateTimeWithUtc, mapArrayIfNotEmpty } from '../../../../helpers'
import { CarrierNoteReason, formatCarrierNoteReason } from '../consts'
import { formatCommercialAct, type TCommercialAct } from './7.13-CommercialAct';
import { formatPenaltyInfo, type TPenaltyInfo } from './7.7-PenaltyCalculation';
import { formatInfoField, type TInfoField } from './7.12-InfoField';

export type TCarrierNote = {
    /**
     * Дата и время отметки.
     */
    dateTime: Date

    /**
     * Описание обстоятельств, послуживших основанием для отметки.
     * (1-2000 символов)
     */
    circumstances: CarrierNoteReason | string

    /**
     * Отметки в отношении акта взвешивания.
     * (1-1000 символов)
     */
    weighingActNote?: string

    /**
     * Сведения о коммерческих и иных актах, в том числе о погрузке груза.
     * (таб-7.13)
     */
    commercialActs?: TCommercialAct[]

    /**
     * Расчет и размер штрафа.
     * (таб-7.7)
     */
    penaltyCalculation?: TPenaltyInfo[]

    /**
     * Информационное поле.
     * (таб-7.12)
     */
    infoField?: TInfoField[]
}

export function formatCarrierNote(data: TCarrierNote) {
    const dt = formatDateTimeWithUtc(data.dateTime)

    return {
        "ДатВрОтмет": dt.dateTime,
        "НалКоорТочВрОтм": dt.utc,
        "ОбстОтмет": formatCarrierNoteReason(data.circumstances),
        "ОтмАктВзв": data.weighingActNote,
        "СвАкт": mapArrayIfNotEmpty(data.commercialActs, formatCommercialAct),
        "РазмШтр": mapArrayIfNotEmpty(data.penaltyCalculation, formatPenaltyInfo),
        "ИнфПол": mapArrayIfNotEmpty(data.infoField, formatInfoField),
    }
}
