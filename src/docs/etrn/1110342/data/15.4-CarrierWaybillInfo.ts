/**
 * Содержание транспортной накладной, информация перевозчика о выдаче груза к перевозке
 * (СодПрвВыд, таб-15.4)
 */

import { mapArrayIfNotEmpty } from '../../../../helpers'
import { formatCarrierReservations, type TCarrierReservations } from './15.5-CarrierReservations';
import { formatCarrierNote, type TCarrierNote } from './15.6-CarrierNote';
import { formatInfoField, type TInfoField } from './15.12-InfoField';

export type TCarrierWaybillInfo = {
    /**
     * Уникальный идентификатор документа транспортной накладной.
     * Выдается ГИС ЭПД. До начала функционирования ГИС ЭПД
     * принимает значение "Без номера".
     * (1-1000 символов)
     */
    waybillId: string

    /** Подтверждение фактической выдачи груза, а не планового события. */
    delivered: boolean

    /** Actual non-delivery statement, required only when delivered is false (СодОпер, 1–255). */
    nonDeliveryDescription?: string

    /**
     * Оговорки и замечания перевозчика при выдаче груза.
     * (таб-15.5)
     */
    reservations?: TCarrierReservations

    /**
     * Сведения об отметках перевозчика при выдаче груза.
     * (таб-15.6)
     */
    notes?: TCarrierNote[]

    /**
     * Информационное поле.
     * (таб-15.12)
     */
    infoField?: TInfoField[]
}

const CARRIER_DELIVERY_DESC =
    "Груз с указанными характеристиками сдан водителем, уполномоченным перевозчиком на перевозку груза, лицу, управомоченному на получение груза"

export function formatCarrierWaybillInfo(data: TCarrierWaybillInfo) {
    if (typeof data.delivered !== "boolean") throw new TypeError("Не указан результат выдачи груза")
    const operation = data.delivered ? CARRIER_DELIVERY_DESC : data.nonDeliveryDescription;
    if (!operation?.trim() || operation.length > 255 || (data.delivered && data.nonDeliveryDescription !== undefined))
        throw new TypeError("Для непринятия требуется фактическое описание операции (1–255 символов)")
    if (!data.waybillId?.trim() || data.waybillId.length > 1000) throw new TypeError("Не указан УИД транспортной накладной (1–1000 символов)")
    return {
        "УИД_ТрН": data.waybillId,
        "СодОпер": operation,
        "ЗамПрвВыд": data.reservations && formatCarrierReservations(data.reservations),
        "ОтметПрвВыд": mapArrayIfNotEmpty(data.notes, formatCarrierNote),
        "ИнфПол": mapArrayIfNotEmpty(data.infoField, formatInfoField),
    }
}
