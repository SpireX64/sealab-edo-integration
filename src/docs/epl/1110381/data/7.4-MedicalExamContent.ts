/**
 * Содержание путевого листа, информация о результате
 * предсменного, предрейсового медицинского осмотра
 * (СодИнфМО, таб-7.4)
 */

import { MedicalExamKind, MedicalWorkerSourceKind, formatMedicalExamKind } from '../consts'
import { formatMedicalWorkerStaff, type TMedicalWorkerStaff } from './7.5-MedicalWorkerStaff';
import { formatMedicalWorkerOrg, type TMedicalWorkerOrg } from './7.6-MedicalWorkerOrg';
import { formatMedicalExamPassInfo, type TMedicalExamPassInfo } from './7.7-MedicalExamPassInfo';

export type TMedicalExamContent = {
    /**
     * Уникальный идентификатор документа путевого листа.
     * Выдается ГИС ЭПД.
     * (1-36 символов)
     */
    waybillId: string

    /**
     * Вид медосмотра.
     * 1 – предсменный; 2 – предрейсовый.
     */
    examKind: MedicalExamKind

    /**
     * Источник сведений о медицинском работнике.
     */
    workerSource: MedicalWorkerSourceKind

    /**
     * Сведения о медицинском работнике, состоящем в штате
     * юридического лица или индивидуального предпринимателя.
     * (таб-7.5)
     */
    medicalWorkerStaff?: TMedicalWorkerStaff

    /**
     * Сведения о медицинской организации и медицинском работнике,
     * состоящем в штате медицинской организации.
     * (таб-7.6)
     */
    medicalWorkerOrg?: TMedicalWorkerOrg

    /**
     * Сведения о прохождении предсменного, предрейсового
     * медицинского осмотра водителем (водителями).
     * (таб-7.7)
     */
    examPassInfo: TMedicalExamPassInfo
}

export function formatMedicalExamContent(data: TMedicalExamContent) {
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
        "СвМОПред": formatMedicalExamPassInfo(data.examPassInfo),
    }
}