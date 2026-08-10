/**
 * Константы и перечисления документа ЭПЛ 1110381.
 */

/**
 * Вид медосмотра.
 */
export enum MedicalExamKind {
    /** Предсменный */
    PreShift = "PreShift",
    /** Предрейсовый */
    PreTrip = "PreTrip",
}

export function formatMedicalExamKind(value: MedicalExamKind): string {
    switch (value) {
        case MedicalExamKind.PreShift:
            return "1"
        case MedicalExamKind.PreTrip:
            return "2"
    }
}

/**
 * Тип источника сведений о медицинском работнике.
 */
export enum MedicalWorkerSourceKind {
    /** Медицинский работник в штате перевозчика */
    Staff = "Staff",
    /** Медицинский работник в штате медицинской организации */
    MedicalOrg = "MedicalOrg",
}

// Реэкспорт из ЭПЛ 1110380 — значения совпадают:
// ТипПодпис: 1=УКЭП, 2=ПЭП, 3=УНЭП
// СпосПодтПолном: 1-6
export {
    SignatureType,
    AuthorityConfirmationMethod,
    formatSignatureType,
    formatAuthorityConfirmationMethod,
} from '../1110380/consts'
