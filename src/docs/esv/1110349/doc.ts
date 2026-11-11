/** Электронная сопроводительная ведомость: информация грузополучателя (1110349). */
import { formatDate, formatTime } from '../../../helpers'
import { fileNode, type TFileXmlMeta } from '../../shared'
import { formatCarrierFileId, type TCarrierFileId } from './data/CarrierFileId'
import { formatConsigneeContent, type TConsigneeContent } from './data/Content'
import { formatConsigneeSigner, type TConsigneeSigner } from './data/ConsigneeSigner'
export type TDocument1110349 = {createdAt:Date;carrierFileId:TCarrierFileId;content:TConsigneeContent;signer:TConsigneeSigner}
export function Document1110349(data:TDocument1110349,meta:TFileXmlMeta={}) {
    if (!meta.programTag?.trim() || meta.programTag.length>40) throw new TypeError('Не указана версия программы programTag (1–40 символов)')
    return fileNode('1110349','5.01',{"ДатИнфГП":formatDate(data.createdAt),"ВрИнфГП":formatTime(data.createdAt).replace(/:/g,'.'),"ИдИнфПрв":formatCarrierFileId(data.carrierFileId),"СодСВИнфГП":formatConsigneeContent(data.content),"Подписант":formatConsigneeSigner(data.signer)},{...meta,documentCreatedAt:meta.documentCreatedAt??data.createdAt})
}
