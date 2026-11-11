/** ЭТрН: первичный учётный документ перевозчика (1110345, таб-17.2). */
import { formatDate, formatTime } from '../../../helpers'
import { fileNode, type TFileXmlMeta } from '../../shared'
import { formatDocumentRequisites, type TDocumentRequisites } from './data/17.9-DocumentRequisites'
import { formatCarrierDeliveryFileId, type TCarrierDeliveryFileId } from './data/17.3-CarrierDeliveryFileId'
import { formatCarrierFinancialContent, type TCarrierFinancialContent } from './data/17.4-CarrierFinancialContent'
import { formatCarrierSigner, type TCarrierSigner } from './data/17.6-CarrierSigner'
export type TDocument1110345 = {
    documentName: string
    createdAt: Date
    compilerName: string
    /** Явное указание: составитель является перевозчиком или действует на основании документа. */
    compilerIsCarrier: boolean
    compilerAuthority?: TDocumentRequisites
    carrierDeliveryFileId: TCarrierDeliveryFileId
    content: TCarrierFinancialContent
    signers: TCarrierSigner[]
}
export function Document1110345(data: TDocument1110345, meta: TFileXmlMeta = {}) {
    if (!data.documentName?.trim() || data.documentName.length > 255) throw new TypeError("Не указано наименование документа (1–255 символов)")
    if (!data.compilerName?.trim() || data.compilerName.length > 1000) throw new TypeError("Не указан составитель (1–1000 символов)")
    if (typeof data.compilerIsCarrier !== 'boolean' || (!data.compilerIsCarrier && !data.compilerAuthority)) throw new TypeError("Для стороннего составителя требуется документ-основание")
    if (!meta.programTag?.trim() || meta.programTag.length > 40) throw new TypeError("Не указана версия программы programTag (1–40 символов)")
    if (!data.signers?.length) throw new TypeError("Не указаны подписанты финансового титула")
    return fileNode("1110345", "5.01", {
        "ПоФактХЖ": data.documentName,
        "ДатПУДИнфПрв": formatDate(data.createdAt),
        "ВрПУДИнфПрв": formatTime(data.createdAt),
        "НаимЭкСубСост": data.compilerName,
        "ОснДовОргСост": data.compilerAuthority && formatDocumentRequisites(data.compilerAuthority),
        "ИдИнфПрвВыд": formatCarrierDeliveryFileId(data.carrierDeliveryFileId),
        "СодФХЖ1": formatCarrierFinancialContent(data.content),
        "Подписант": data.signers.map(formatCarrierSigner),
    }, { ...meta, documentCreatedAt: meta.documentCreatedAt ?? data.createdAt })
}
