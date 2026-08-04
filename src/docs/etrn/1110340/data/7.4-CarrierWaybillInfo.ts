/**
 * Содержание транспортной накладной, информация перевозчика о приеме груза к перевозке
 * (СодИнфПрвПрием, таб-7.4)
 */

import { mapArrayIfNotEmpty } from '../../../../helpers'
import { formatCarrierReservations, type TCarrierReservations } from './7.5-CarrierReservations';
import { formatCarrierNote, type TCarrierNote } from './7.6-CarrierNote';
import { formatInfoField, type TInfoField } from './7.12-InfoField';

export type TCarrierWaybillInfo = {
    /**
     * Уникальный идентификатор документа транспортной накладной.
     * Выдается ГИС ЭПД. До начала функционирования ГИС ЭПД
     * принимает значение "Без номера".
     * (1-1000 символов)
     */
    waybillId: string

    /**
     * Оговорки и замечания перевозчика при приеме груза.
     * (таб-7.5)
     */
    reservations?: TCarrierReservations

    /**
     * Сведения об отметках перевозчика при приеме груза.
     * (таб-7.6)
     */
    notes?: TCarrierNote[]

    /**
     * Информационное поле.
     * (таб-7.12)
     */
    infoField?: TInfoField[]
}

const CARRIER_ACCEPTANCE_DESC =
    "Груз принят к перевозке водителем, уполномоченным перевозчиком на перевозку груза, от лица, осуществившего погрузку груза в транспортное средство"

export function formatCarrierWaybillInfo(data: TCarrierWaybillInfo) {
    return {
        "УИД_ТрН": data.waybillId,
        "СодОпер": CARRIER_ACCEPTANCE_DESC,
        "ЗамПрвПрием": data.reservations && formatCarrierReservations(data.reservations),
        "ОтметПрвПрием": mapArrayIfNotEmpty(data.notes, formatCarrierNote),
        "ИнфПол": mapArrayIfNotEmpty(data.infoField, formatInfoField),
    }
}
