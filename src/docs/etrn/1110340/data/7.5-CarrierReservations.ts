/**
 * Оговорки и замечания перевозчика при приеме груза
 * (ЗамПрвПрием, таб-7.5)
 */

import { formatDateTimeWithUtc, mapArrayIfNotEmpty } from '../../../../helpers'
import { CarrierCargoConditionNote, formatCarrierCargoConditionNote } from '../consts'
import { formatInfoField } from './7.12-InfoField'
import type { TInfoField } from './7.12-InfoField'

export type TCarrierReservations = {
    /**
     * Оговорки и замечания в отношении фактических даты и времени прибытия.
     */
    arrivalDateTime?: Date

    /**
     * Оговорки и замечания в отношении фактических даты и времени убытия.
     */
    departureDateTime?: Date

    /**
     * Оговорки и замечания в отношении фактических даты и времени
     * постановки на погрузку.
     */
    loadingDateTime?: Date

    /**
     * Оговорки и замечания в отношении фактического состояния груза,
     * крепления груза, тары, упаковки, маркировки и опломбирования.
     * (1-10000 символов)
     */
    cargoCondition?: CarrierCargoConditionNote | string

    /**
     * Оговорки и замечания в отношении массы груза.
     * (1-1000 символов)
     */
    weightNote?: string

    /**
     * Оговорки и замечания в отношении количества грузовых мест.
     * (1-1000 символов)
     */
    packageCountNote?: string

    /**
     * Оговорки и замечания в отношении проведения погрузочных работ.
     * (1-1000 символов)
     */
    loadingWorkNote?: string

    /**
     * Информационное поле.
     * (таб-7.12)
     */
    infoField?: TInfoField[]
}

export function formatCarrierReservations(data: TCarrierReservations) {
    const arrivalDt = data.arrivalDateTime && formatDateTimeWithUtc(data.arrivalDateTime)
    const departureDt = data.departureDateTime && formatDateTimeWithUtc(data.departureDateTime)
    const loadingDt = data.loadingDateTime && formatDateTimeWithUtc(data.loadingDateTime)

    return {
        "ЗамДатВрПриб": arrivalDt?.dateTime,
        "НалКоорТочВрПрб": arrivalDt?.utc,
        "ЗамДатВрУбыт": departureDt?.dateTime,
        "НалКоорТочВрУб": departureDt?.utc,
        "ЗамДатВрПосПрием": loadingDt?.dateTime,
        "НалКоорТочВрПрм": loadingDt?.utc,
        "ЗамСостГруз": data.cargoCondition && formatCarrierCargoConditionNote(data.cargoCondition),
        "ЗамМасс": data.weightNote,
        "ЗамКолМест": data.packageCountNote,
        "ЗамПогрРаб": data.loadingWorkNote,
        "ИнфПол": mapArrayIfNotEmpty(data.infoField, formatInfoField),
    }
}
