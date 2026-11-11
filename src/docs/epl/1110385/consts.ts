/** ЭПЛ 1110385, таб-15.4: вид послесменного/послерейсового осмотра. */
export enum MedicalExamKind {
    PostShift = "PostShift",
    PostTrip = "PostTrip",
}

export function formatMedicalExamKind(value: MedicalExamKind): string {
    switch (value) {
        case MedicalExamKind.PostShift: return "1"
        case MedicalExamKind.PostTrip: return "2"
        default: throw new TypeError("Не указан вид послерейсового медицинского осмотра")
    }
}

// Коды и требования к работнику/подписанту совпадают с 1110381 по XSD.
export { MedicalWorkerSourceKind, SignatureType, AuthorityConfirmationMethod,
    formatSignatureType, formatAuthorityConfirmationMethod } from '../1110381/consts'
