/**
 * Сведения о результате предсменного, предрейсового
 * медицинского осмотра водителем (водителями)
 * (СвМОПред, таб-7.7)
 */

import { formatDateTimeWithUtc } from '../../../../helpers'
import { formatDriverExamInfo, type TDriverExamInfo } from './7.8-DriverExamInfo';

export type TMedicalExamPassInfo = {
    /**
     * Дата и время проведения предсменного, предрейсового
     * медицинского осмотра.
     */
    examDateTime: Date

    /**
     * Сведения о водителе транспортного средства.
     * (таб-7.8)
     */
    driver: TDriverExamInfo
}

export function formatMedicalExamPassInfo(data: TMedicalExamPassInfo) {
    const dt = formatDateTimeWithUtc(data.examDateTime)

    return {
        "ДатВрПрМО": dt.dateTime,
        "НалКоорТочВрПрМО": dt.utc,
        "ОтметМОПред": "Прошел предсменный медицинский осмотр, к исполнению трудовых обязанностей допущен",
        "СвВодит": formatDriverExamInfo(data.driver),
    }
}