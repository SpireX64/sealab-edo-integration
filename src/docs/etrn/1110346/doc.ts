/** ЭТрН: первичный учётный документ грузоотправителя (1110346, таб-19.2). */
import { formatDate, formatTime } from '../../../helpers'
import { fileNode, type TFileXmlMeta } from '../../shared'
import { formatDocumentRequisites, type TDocumentRequisites } from './data/19.7-DocumentRequisites'
import { formatCarrierFinancialFileId, type TCarrierFinancialFileId } from './data/19.3-CarrierFinancialFileId'
import { formatShipperFinancialContent, type TShipperFinancialContent } from './data/19.4-ShipperFinancialContent'
import { formatShipperSigner, type TShipperSigner } from './data/19.5-ShipperSigner'
export type TDocument1110346 = {
    documentName: string
    createdAt: Date
    compilerName: string
    /** Явное указание: составитель является грузоотправителем или действует на основании документа. */
    compilerIsShipper: boolean
    compilerAuthority?: TDocumentRequisites
    carrierFinancialFileId: TCarrierFinancialFileId
    /** Иной плательщик: указывается при изменении согласованного плательщика. */
    otherPayerName?: string
    otherPayerBasis?: TDocumentRequisites
    content: TShipperFinancialContent
    signers: TShipperSigner[]
}
export function Document1110346(data: TDocument1110346, meta: TFileXmlMeta = {}) {
    if (!data.documentName?.trim() || data.documentName.length > 255) throw new TypeError("Не указано наименование документа (1–255 символов)")
    if (!data.compilerName?.trim() || data.compilerName.length > 1000) throw new TypeError("Не указан составитель (1–1000 символов)")
    if (typeof data.compilerIsShipper !== 'boolean' || (!data.compilerIsShipper && !data.compilerAuthority)) throw new TypeError("Для стороннего составителя требуется документ-основание")
    if (!meta.programTag?.trim() || meta.programTag.length > 40) throw new TypeError("Не указана версия программы programTag (1–40 символов)")
    if (!data.signers?.length) throw new TypeError("Не указаны подписанты финансового титула")
    if (data.otherPayerName !== undefined) {
        if (!data.otherPayerName.trim() || data.otherPayerName.length > 1000) throw new TypeError("Не указано имя иного плательщика (1–1000 символов)")
        if (!data.otherPayerBasis) throw new TypeError("Для иного плательщика требуется основание")
    }
    return fileNode("1110346", "5.01", {
        "ПоФактХЖ": data.documentName,
        "ДатПУДИнфГО": formatDate(data.createdAt),
        "ВрПУДИнфГО": formatTime(data.createdAt),
        "НаимЭкСубСост": data.compilerName,
        "НаимПлат": data.otherPayerName,
        "ОснДовОргСост": data.compilerAuthority && formatDocumentRequisites(data.compilerAuthority),
        "ОснИнПлат": data.otherPayerBasis && formatDocumentRequisites(data.otherPayerBasis),
        "ИдПУДИнфПрв": formatCarrierFinancialFileId(data.carrierFinancialFileId),
        "СодФХЖ2": formatShipperFinancialContent(data.content),
        "Подписант": data.signers.map(formatShipperSigner),
    }, { ...meta, documentCreatedAt: meta.documentCreatedAt ?? data.createdAt })
}
