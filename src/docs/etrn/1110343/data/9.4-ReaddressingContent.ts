/** Содержание переадресовки (СодИнфПА, таб-9.4). */
import { formatDateTimeWithUtc, mapArrayIfNotEmpty } from '../../../../helpers'
import { READDRESSING_NOTIFICATION_DELIVERY_METHOD } from '../consts'
import { formatWaybillCorrection, type TWaybillCorrection } from './9.9-WaybillCorrection'
import { formatDocumentRequisites, type TDocumentRequisites } from './9.10-DocumentRequisites'
import { formatPartyDetails, type TPartyDetails } from './9.12-PartyDetails'
import { formatNewUnloadingPoint, type TNewUnloadingPoint } from './9.5-NewUnloadingPoint'
import { formatReaddressingNote, type TReaddressingNote } from './9.6-ReaddressingNote'
import { formatInfoField, type TInfoField } from './9.20-InfoField'
export type TReaddressingContent = {
    /** УИД транспортной накладной (1–1000 символов). */
    waybillId: string
    readdressedAt: Date
    /** Фактическое получение электронного указания о переадресовке. */
    instructionReceived: true
    /** Точное значение таблицы 9.4, без сокращений (51 символ).
     * Согласованное исключение: исходная XSD ограничивает ВидДост 50 символами.
     * Такой XML ожидаемо не проходит данное ограничение оригинальной XSD.
     * @see ../README.md
     */
    notificationDeliveryMethod: typeof READDRESSING_NOTIFICATION_DELIVERY_METHOD
    /** Подпись электронного уведомления в Base64, если предоставлена. */
    notificationSignature?: string
    correction?: TWaybillCorrection
    /** Электронное уведомление от отправителя/получателя, послужившее основанием. */
    basis: TDocumentRequisites
    newConsignee?: TPartyDetails
    newUnloadingPoint: TNewUnloadingPoint
    notes?: TReaddressingNote[]
    infoField?: TInfoField[]
}
export function formatReaddressingContent(data: TReaddressingContent) {
    if (data.instructionReceived !== true) throw new TypeError("Не подтверждено получение указания о переадресовке")
    if (!data.waybillId?.trim() || data.waybillId.length > 1000) throw new TypeError("Не указан УИД транспортной накладной")
    if (data.notificationDeliveryMethod !== READDRESSING_NOTIFICATION_DELIVERY_METHOD) {
        throw new TypeError(`ВидДост должен точно совпадать со значением «${READDRESSING_NOTIFICATION_DELIVERY_METHOD}»`)
    }
    const dt = formatDateTimeWithUtc(data.readdressedAt)
    return {
        "УИД_ТрН": data.waybillId,
        "СодОпер": "Получение указания о переадресовке",
        "ДатВрПА": dt.dateTime,
        "НалКоорТочВрПА": dt.utc,
        "ФормаПА": "Электронная",
        "ВидДост": READDRESSING_NOTIFICATION_DELIVERY_METHOD,
        "ЭПУвПА": data.notificationSignature,
        "ИспрТрН": data.correction && formatWaybillCorrection(data.correction),
        "ОснПА": formatDocumentRequisites(data.basis),
        "НовГрузПол": data.newConsignee && formatPartyDetails(data.newConsignee),
        "НовПунктВыгр": formatNewUnloadingPoint(data.newUnloadingPoint),
        "ОтметПА": mapArrayIfNotEmpty(data.notes, formatReaddressingNote),
        "ИнфПол": mapArrayIfNotEmpty(data.infoField, formatInfoField),
    }
}
