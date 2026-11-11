/** Электронная сопроводительная ведомость: информация перевозчика (1110347). */
import {formatDate,formatTime} from '../../../helpers'
import {fileNode,type TFileXmlMeta} from '../../shared'
import {formatCarrierSigner,type TCarrierSigner} from './data/CarrierSigner'
import {formatCarrierContent,type TCarrierContent} from './data/Content'
export type TDocument1110347 = {createdAt:Date;content:TCarrierContent;signer:TCarrierSigner}
export function Document1110347(data:TDocument1110347,meta:TFileXmlMeta={}) {
    if (!meta.programTag?.trim() || meta.programTag.length>40) throw new TypeError("Не указана версия программы programTag (1–40 символов)")
    return fileNode('1110347','5.01',{"ДатИнфПрв":formatDate(data.createdAt),"ВрИнфПрв":formatTime(data.createdAt).replace(/:/g,'.'),"СодСВИнфПрв":formatCarrierContent(data.content),"Подписант":formatCarrierSigner(data.signer)},{...meta,documentCreatedAt:meta.documentCreatedAt??data.createdAt})
}
export type {TCarrierSigner}
