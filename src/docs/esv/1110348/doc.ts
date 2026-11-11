/** Электронная сопроводительная ведомость: информация грузоотправителя (1110348). */
import { formatDate, formatTime } from '../../../helpers'
import { fileNode, type TFileXmlMeta } from '../../shared'
import { formatCarrierFileId, type TCarrierFileId } from './data/CarrierFileId'
import { formatShipperContent, type TShipperContent } from './data/Content'
import { formatShipperSigner, type TShipperSigner } from './data/ShipperSigner'
export type TDocument1110348 = {createdAt:Date;carrierFileId:TCarrierFileId;content:TShipperContent;signer:TShipperSigner}
export function Document1110348(data:TDocument1110348,meta:TFileXmlMeta={}) {
    if (!meta.programTag?.trim() || meta.programTag.length>40) throw new TypeError('Не указана версия программы programTag (1–40 символов)')
    return fileNode('1110348','5.01',{"ДатИнфГО":formatDate(data.createdAt),"ВрИнфГО":formatTime(data.createdAt).replace(/:/g,'.'),"ИдИнфПрв":formatCarrierFileId(data.carrierFileId),"СодСВИнфГО":formatShipperContent(data.content),"Подписант":formatShipperSigner(data.signer)},{...meta,documentCreatedAt:meta.documentCreatedAt??data.createdAt})
}
