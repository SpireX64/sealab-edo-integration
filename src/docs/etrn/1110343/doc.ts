/** ЭТрН: переадресовка (1110343, таб-9.2). */
import { formatDate, formatTime } from '../../../helpers'
import { fileNode, type TFileXmlMeta } from '../../shared'
import { formatCarrierAcceptanceFileId, type TCarrierAcceptanceFileId } from './data/9.3-CarrierAcceptanceFileId'
import { formatReaddressingContent, type TReaddressingContent } from './data/9.4-ReaddressingContent'
import { formatCarrierSigner, type TCarrierSigner } from './data/9.7-CarrierSigner'
export type TDocument1110343 = {
    documentName: string
    createdAt: Date
    otherRecipientIds?: string[]
    carrierAcceptanceFileId: TCarrierAcceptanceFileId
    content: TReaddressingContent
    /** Минимум один подписант. */
    signers: TCarrierSigner[]
}
export function Document1110343(data: TDocument1110343, meta: TFileXmlMeta = {}) {
    if (!data.documentName?.trim() || data.documentName.length > 255) throw new TypeError("Не указано наименование документа (1–255 символов)")
    if (!meta.programTag?.trim() || meta.programTag.length > 40) throw new TypeError("Не указана версия программы programTag (1–40 символов)")
    if (!data.signers?.length) throw new TypeError("Не указаны подписанты переадресовки")
    for (const id of data.otherRecipientIds ?? []) {
        if (id.length < 4 || id.length > 46) throw new TypeError("Идентификатор иного получателя должен содержать 4–46 символов")
    }
    const node = fileNode("1110343", "5.01", {
        "ПоФактХЖ": data.documentName,
        "ДатаИнфПА": formatDate(data.createdAt),
        "ВрИнфПА": formatTime(data.createdAt),
        "ИдИнфПрвПрием": formatCarrierAcceptanceFileId(data.carrierAcceptanceFileId),
        "СодИнфПА": formatReaddressingContent(data.content),
        "Подписант": data.signers.map(formatCarrierSigner),
    }, { ...meta, documentCreatedAt: meta.documentCreatedAt ?? data.createdAt })
    const { Документ, ...file } = node.Файл as Record<string, unknown>
    return { Файл: { ...file, ИдПолИной: data.otherRecipientIds, Документ } }
}
