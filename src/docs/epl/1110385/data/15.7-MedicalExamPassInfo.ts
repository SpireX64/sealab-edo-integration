/** Результат послесменного/послерейсового осмотра (СвМОПосл, таб-15.7). */
import { formatDateTimeWithUtc } from '../../../../helpers'
import { formatDriverExamInfo, type TDriverExamInfo } from './15.8-DriverExamInfo'

export type TMedicalExamPassInfo = {
    /** Фактическое время проведения осмотра. */
    examDateTime: Date
    /** Подтверждённый факт прохождения. Формат не предусматривает отрицательную отметку. */
    passed: true
    driver: TDriverExamInfo
}

export function formatMedicalExamPassInfo(data: TMedicalExamPassInfo) {
    if (data.passed !== true) throw new TypeError("Не подтверждено прохождение послерейсового медосмотра")
    if (!(data.examDateTime instanceof Date) || !Number.isFinite(data.examDateTime.getTime())) {
        throw new TypeError("Не указано фактическое время послерейсового медосмотра")
    }
    const dt = formatDateTimeWithUtc(data.examDateTime)
    return {
        "ДатВрПрМО": dt.dateTime,
        "НалКоорТочВрПрМО": dt.utc,
        "ОтметМОПосл": "Прошел послерейсовый медицинский осмотр",
        "СвВодит": formatDriverExamInfo(data.driver),
    }
}
