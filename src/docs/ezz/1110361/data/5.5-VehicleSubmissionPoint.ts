/**
 * Пункт подачи транспортного средства
 * (ПунктПод, таб-5.5)
 */

import { formatDateTimeWithUtc } from '../../../../helpers'
import { formatAddress, type TAddress } from './5.25-Address';

export type TVehicleSubmissionPoint = {
    /**
     * Дата и время подачи транспортного средства.
     */
    submittedAt: Date

    /**
     * Предельно допустимое время подачи транспортного средства
     * под погрузку/выгрузку.
     */
    deadlineAt?: Date

    /**
     * Адрес пункта подачи транспортного средства.
     * (таб-5.25)
     */
    address: TAddress
}

export function formatVehicleSubmissionPoint(data: TVehicleSubmissionPoint) {
    const submissionDt = formatDateTimeWithUtc(data.submittedAt)
    const deadlineDt = data.deadlineAt && formatDateTimeWithUtc(data.deadlineAt)

    return {
        "ДатВрПод": submissionDt.dateTime,
        "НалКоорТочВрПод": submissionDt.utc,
        "ПредВрПод": deadlineDt?.dateTime,
        "НалКоорТочПредВрПод": deadlineDt?.utc,
        "АдрПунктПод": formatAddress(data.address),
    }
}
