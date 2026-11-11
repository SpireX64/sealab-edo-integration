/** Фактическая отметка при переадресовке (таб-9.6). */
import { formatDateTimeWithUtc, mapArrayIfNotEmpty } from '../../../../helpers'
import { formatInfoField, type TInfoField } from './9.20-InfoField'
export type TReaddressingNote = { notedAt: Date; circumstances: string; infoField?: TInfoField[] }
export function formatReaddressingNote(data: TReaddressingNote) {
    if (!data.circumstances?.trim() || data.circumstances.length > 2000) throw new TypeError("Не указаны фактические обстоятельства отметки (1–2000 символов)")
    const dt = formatDateTimeWithUtc(data.notedAt)
    return { "ДатВрОтмет": dt.dateTime, "НалКоорТочВрОтм": dt.utc, "ОбстОтмет": data.circumstances, "ИнфПол": mapArrayIfNotEmpty(data.infoField, formatInfoField) }
}
