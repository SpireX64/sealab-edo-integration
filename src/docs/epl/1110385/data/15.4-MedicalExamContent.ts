/**
 * Содержание путевого листа, информация о результате
 * послесменного, послерейсового медицинского осмотра
 * (СодИнфМО, таб-15.4)
 */

import { MedicalExamKind, MedicalWorkerSourceKind, formatMedicalExamKind } from '../consts'
import { formatMedicalWorkerStaff, type TMedicalWorkerStaff } from './15.5-MedicalWorkerStaff';
import { formatMedicalWorkerOrg, type TMedicalWorkerOrg } from './15.6-MedicalWorkerOrg';
import { formatMedicalExamPassInfo, type TMedicalExamPassInfo } from './15.7-MedicalExamPassInfo';

export type TMedicalExamContent = {
    /**
     * Уникальный идентификатор документа путевого листа.
     * Выдается ГИС ЭПД.
     * (1-36 символов)
     */
    waybillId: string

    /**
     * Вид медосмотра.
     * 1 – послесменный; 2 – послерейсовый.
     */
    examKind: MedicalExamKind

    /**
     * Источник сведений о медицинском работнике.
     */
    workerSource: MedicalWorkerSourceKind

    /**
     * Сведения о медицинском работнике, состоящем в штате
     * юридического лица или индивидуального предпринимателя.
     * (таб-15.5)
     */
    medicalWorkerStaff?: TMedicalWorkerStaff

    /**
     * Сведения о медицинской организации и медицинском работнике,
     * состоящем в штате медицинской организации.
     * (таб-15.6)
     */
    medicalWorkerOrg?: TMedicalWorkerOrg

    /**
     * Сведения о прохождении послесменного, послерейсового
     * медицинского осмотра водителем (водителями).
     * (таб-15.7)
     */
    examPassInfo: TMedicalExamPassInfo
}

export function formatMedicalExamContent(data: TMedicalExamContent) {
    if (!data.waybillId?.trim() || data.waybillId.length > 36) throw new TypeError("Не указан УИД путевого листа (1–36 символов)")
    if (data.workerSource !== MedicalWorkerSourceKind.Staff && data.workerSource !== MedicalWorkerSourceKind.MedicalOrg) {
        throw new TypeError("Не указан источник сведений о медработнике")
    }
    if (data.medicalWorkerStaff && data.medicalWorkerOrg) throw new TypeError("Нужно выбрать одного медицинского работника: штат или медорганизация")
    if (data.workerSource === MedicalWorkerSourceKind.Staff && !data.medicalWorkerStaff) {
        throw new TypeError(
            "Требуется указать medicalWorkerStaff при workerSource = Staff"
        )
    }

    if (data.workerSource === MedicalWorkerSourceKind.MedicalOrg && !data.medicalWorkerOrg) {
        throw new TypeError(
            "Требуется указать medicalWorkerOrg при workerSource = MedicalOrg"
        )
    }

    const workerField =
        data.workerSource === MedicalWorkerSourceKind.Staff
            ? { "СвМедРаб": formatMedicalWorkerStaff(data.medicalWorkerStaff!) }
            : { "СвМедОрг": formatMedicalWorkerOrg(data.medicalWorkerOrg!) }

    return {
        "УИД_ПЛ": data.waybillId,
        "ВидМО": formatMedicalExamKind(data.examKind),
        ...workerField,
        "СвМОПосл": formatMedicalExamPassInfo(data.examPassInfo),
    }
}