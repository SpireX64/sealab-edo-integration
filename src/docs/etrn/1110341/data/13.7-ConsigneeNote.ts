/**
 * Сведения об отметках грузополучателя
 * (ОтметГП, таб-13.7)
 */

import { formatDateTimeWithUtc, mapArrayIfNotEmpty } from '../../../../helpers'
import { formatDocumentRequisites, type TDocumentRequisites } from './13.17-DocumentRequisites';
import { formatPenaltyInfo, type TPenaltyInfo } from './13.8-ConsigneePenaltyCalc';
import { formatInfoField, type TInfoField } from './13.16-InfoField';

export type TConsigneeNote = {
    /**
     * Дата и время отметки.
     */
    notedAt: Date

    /**
     * Описание обстоятельств, послуживших основанием для отметки.
     * Передаётся фактическое обстоятельство; отсутствие данных не означает просрочку.
     * (1-2000 символов)
     */
    circumstances: string

    /**
     * Сведения о коммерческих и иных актах, в том числе о выгрузке груза.
     * (таб-13.18)
     */
    commercialActs?: TDocumentRequisites[]

    /**
     * Расчет и размер штрафа.
     * (таб-13.8)
     */
    penaltyCalculation?: TPenaltyInfo[]

    /**
     * Сведения об актах взвешивания.
     * (таб-13.17)
     */
    weighingActs?: TDocumentRequisites[]

    /**
     * Информационное поле.
     * (таб-13.16)
     */
    infoField?: TInfoField[]
}

export function formatConsigneeNote(data: TConsigneeNote) {
    if (!data.circumstances?.trim() || data.circumstances.length > 2000) {
        throw new TypeError("Требуется описание фактических обстоятельств отметки (1-2000 символов)")
    }
    const dt = formatDateTimeWithUtc(data.notedAt)

    return {
        "ДатВрОтмет": dt.dateTime,
        "НалКоорТочВрОтм": dt.utc,
        "ОбстОтмет": data.circumstances,
        "СвАкт": mapArrayIfNotEmpty(data.commercialActs, formatDocumentRequisites),
        "РазмШтр": mapArrayIfNotEmpty(data.penaltyCalculation, formatPenaltyInfo),
        "СвАктВзв": mapArrayIfNotEmpty(data.weighingActs, formatDocumentRequisites),
        "ИнфПол": mapArrayIfNotEmpty(data.infoField, formatInfoField),
    }
}
