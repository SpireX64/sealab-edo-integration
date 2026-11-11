/** ЭПЛ: результат послесменного/послерейсового медосмотра (1110385, таб-15.2). */
import { formatDate, formatTime } from '../../../helpers'
import { fileNode, type TFileXmlMeta } from '../../shared'
import { formatArrivalFileId, type TArrivalFileId } from './data/15.3-ArrivalFileId'
import { formatMedicalExamContent, type TMedicalExamContent } from './data/15.4-MedicalExamContent'
import { formatMedicalExamSigner, type TMedicalExamSigner } from './data/15.11-MedicalExamSigner'

export type TDocument1110385 = {
    /** Ссылка на подписанный файл показаний одометра при заезде (1110384). */
    arrivalFileId: TArrivalFileId
    content: TMedicalExamContent
    signer: TMedicalExamSigner
}

export function Document1110385(data: TDocument1110385, meta: TFileXmlMeta = {}) {
    if (!meta.programTag?.trim() || meta.programTag.length > 40) {
        throw new TypeError("Не указана версия программы programTag (1–40 символов)")
    }
    const createdAt = meta.documentCreatedAt ?? new Date()
    return fileNode("1110385", "5.01", {
        "ДатИнфМО": formatDate(createdAt),
        "ВрИнфМО": formatTime(createdAt),
        "ИдИнфЗаезд": formatArrivalFileId(data.arrivalFileId),
        "СодИнфМО": formatMedicalExamContent(data.content),
        "ПодпИнфМО": formatMedicalExamSigner(data.signer),
    }, { ...meta, documentCreatedAt: createdAt })
}
