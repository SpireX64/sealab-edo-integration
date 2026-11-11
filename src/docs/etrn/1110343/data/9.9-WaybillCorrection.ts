/** Исправление сведений переадресовки (ИспрТип, таб-9.9). */
import { formatDate } from '../../../../helpers'
export type TWaybillCorrection = { correctionNumber: number; correctionDate: Date }
export function formatWaybillCorrection(data: TWaybillCorrection) {
    if (!Number.isInteger(data.correctionNumber) || data.correctionNumber < 1 || data.correctionNumber > 999) {
        throw new TypeError("Номер исправления должен быть целым от 1 до 999")
    }
    return { "НомерИспр": String(data.correctionNumber), "ДатаИспр": formatDate(data.correctionDate) }
}
