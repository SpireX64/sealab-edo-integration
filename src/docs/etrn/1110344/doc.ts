/** ЭТрН: замена водителей/ТС (1110344, таб-11.2). */
import { formatDate, formatTime } from '../../../helpers'
import { fileNode, type TFileXmlMeta } from '../../shared'
import { formatCarrierAcceptanceFileId, type TCarrierAcceptanceFileId } from './data/11.3-CarrierAcceptanceFileId'
import { formatReplacementContent, type TReplacementContent } from './data/11.4-ReplacementContent'
import { formatCarrierSigner, type TCarrierSigner } from './data/11.9-CarrierSigner'
export type TDocument1110344 = {
    documentName: string
    createdAt: Date
    otherRecipientIds?: string[]
    carrierAcceptanceFileId: TCarrierAcceptanceFileId
    content: TReplacementContent
    signer: TCarrierSigner
}
export function Document1110344(data: TDocument1110344, meta: TFileXmlMeta = {}) {
    if (!data.documentName?.trim() || data.documentName.length > 255) throw new TypeError("Не указано наименование документа (1–255 символов)")
    if (!meta.programTag?.trim() || meta.programTag.length > 40) throw new TypeError("Не указана версия программы programTag (1–40 символов)")
    for (const id of data.otherRecipientIds ?? []) {
        if (id.length < 4 || id.length > 46) throw new TypeError("Идентификатор иного получателя должен содержать 4–46 символов")
    }
    const node = fileNode("1110344", "5.01", {
        "ПоФактХЖ": data.documentName,
        "ДатИнфЗамен": formatDate(data.createdAt),
        "ВрИнфЗамен": formatTime(data.createdAt),
        "ИдИнфПрвПрием": formatCarrierAcceptanceFileId(data.carrierAcceptanceFileId),
        "СодИнфЗамен": formatReplacementContent(data.content),
        "Подписант": formatCarrierSigner(data.signer),
    }, { ...meta, documentCreatedAt: meta.documentCreatedAt ?? data.createdAt })
    const { Документ, ...file } = node.Файл as Record<string, unknown>
    return { Файл: { ...file, ИдПолИной: data.otherRecipientIds, Документ } }
}
