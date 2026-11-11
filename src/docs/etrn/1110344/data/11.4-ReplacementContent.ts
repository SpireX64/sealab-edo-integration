/** Содержание замен водителей/ТС (СодИнфЗамен, таб-11.4). */
import { formatDateTimeWithUtc, mapArrayIfNotEmpty } from '../../../../helpers'
import { formatWaybillCorrection, type TWaybillCorrection } from './11.11-WaybillCorrection'
import { formatDocumentRequisites, type TDocumentRequisites } from './11.12-DocumentRequisites'
import { formatDriverReplacement, type TDriverReplacement } from './11.5-DriverReplacement'
import { formatVehicleReplacement, type TVehicleReplacement } from './11.7-VehicleReplacement'
import { formatReaddressingNote, type TReaddressingNote } from './11.8-ReplacementNote'
import { formatInfoField, type TInfoField } from './11.20-InfoField'
export type TReplacementContent = {
    waybillId: string
    replacedAt: Date
    /** Фактическое содержание операции, 1–1000 символов по XSD. */
    operationDescription: string
    correction?: TWaybillCorrection
    reason: { text: string; document?: never } | { text?: never; document: TDocumentRequisites }
    drivers?: TDriverReplacement[]
    vehicles?: TVehicleReplacement[]
    notes?: TReaddressingNote[]
    infoField?: TInfoField[]
}
export function formatReplacementContent(data: TReplacementContent) {
    if (!data.drivers?.length && !data.vehicles?.length) throw new TypeError("Не указана замена водителя или ТС")
    if (!data.waybillId?.trim() || data.waybillId.length > 1000) throw new TypeError("Не указан УИД транспортной накладной")
    if (!data.operationDescription?.trim() || data.operationDescription.length > 1000) throw new TypeError("Не указано содержание операции (1–1000 символов)")
    if (!data.reason || (data.reason.text !== undefined) === (data.reason.document !== undefined)) throw new TypeError("Укажите одну причину замены: текст или документ")
    if (data.reason.text !== undefined && (!data.reason.text.trim() || data.reason.text.length > 2000)) throw new TypeError("Причина замены должна содержать 1–2000 символов")
    const dt = formatDateTimeWithUtc(data.replacedAt)
    return {
        "УИД_ТрН": data.waybillId,
        "СодОпер": data.operationDescription,
        "ДатВрЗамен": dt.dateTime,
        "НалКоорТочВрЗам": dt.utc,
        "ИспрТрН": data.correction && formatWaybillCorrection(data.correction),
        "ПричЗамТекст": data.reason.text !== undefined ? [data.reason.text] : undefined,
        "ПричЗамДок": data.reason.document && formatDocumentRequisites(data.reason.document),
        "ЗаменВодит": mapArrayIfNotEmpty(data.drivers, formatDriverReplacement),
        "ЗаменТС": mapArrayIfNotEmpty(data.vehicles, formatVehicleReplacement),
        "ОтметЗам": mapArrayIfNotEmpty(data.notes, formatReaddressingNote),
        "ИнфПол": mapArrayIfNotEmpty(data.infoField, formatInfoField),
    }
}
