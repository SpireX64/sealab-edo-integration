/**
 * Сведения об отметках перевозчика при выдаче груза
 * (ОтметПрвПрием, таб-15.6)
 */

import { formatDateTimeWithUtc, mapArrayIfNotEmpty } from '../../../../helpers'
import { formatCommercialAct, type TCommercialAct } from './15.13-CommercialAct';
import { formatPenaltyInfo, type TPenaltyInfo } from './15.7-PenaltyCalculation';
import { formatInfoField, type TInfoField } from './15.12-InfoField';

export type TCarrierNote = {
    /**
     * Дата и время отметки.
     */
    notedAt: Date

    /**
     * Описание обстоятельств, послуживших основанием для отметки.
     * (1-2000 символов)
     */
    circumstances: string

    /**
     * Отметки в отношении акта взвешивания.
     * (1-1000 символов)
     */
    weighingActNote?: string

    /**
     * Сведения о коммерческих и иных актах, в том числе о выгрузке груза.
     * (таб-15.13)
     */
    commercialActs?: TCommercialAct[]

    /**
     * Расчет и размер штрафа.
     * (таб-15.7)
     */
    penaltyCalculation?: TPenaltyInfo[]

    /**
     * Информационное поле.
     * (таб-15.12)
     */
    infoField?: TInfoField[]
}

export function formatCarrierNote(data: TCarrierNote) {
    if (!data.circumstances?.trim() || data.circumstances.length > 2000) {
        throw new TypeError("Не указано описание фактических обстоятельств отметки (1–2000 символов)")
    }
    const dt = formatDateTimeWithUtc(data.notedAt)

    return {
        "ДатВрОтмет": dt.dateTime,
        "НалКоорТочВрОтм": dt.utc,
        "ОбстОтмет": data.circumstances,
        "ОтмАктВзв": data.weighingActNote,
        "СвАкт": mapArrayIfNotEmpty(data.commercialActs, formatCommercialAct),
        "РазмШтр": mapArrayIfNotEmpty(data.penaltyCalculation, formatPenaltyInfo),
        "ИнфПол": mapArrayIfNotEmpty(data.infoField, formatInfoField),
    }
}
