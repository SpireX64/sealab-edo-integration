/** Электронная экспедиторская расписка, 1110489. */
import {formatDate,formatTime} from '../../../helpers'
import {fileNode,type TFileXmlMeta} from '../../shared'
import {formatSigner,type TSigner} from '../1110486/data/Signer'
import {formatDocumentRequisites,type TDocumentRequisites} from '../1110486/data/DocumentRequisites'
import {formatReceiptContent,type TReceiptContent} from './data/Content'
export type TDocument1110489={createdAt:Date;otherRecipientIds?:string[];compilerName?:string;compilerAuthority?:TDocumentRequisites;content:TReceiptContent;signer:TSigner}
export function Document1110489(data:TDocument1110489,meta:TFileXmlMeta={}) {
    if (!meta.programTag?.trim() || meta.programTag.length>40) throw new TypeError('Не указана версия программы programTag (1–40 символов)')
    if (data.compilerName!==undefined && (!data.compilerName.trim() || !data.compilerAuthority)) throw new TypeError('Указанному составителю нужно основание полномочий')
    for (const id of data.otherRecipientIds??[]) if (id.length<4 || id.length>46) throw new TypeError('Идентификатор иного получателя должен содержать 4–46 символов')
    const node=fileNode('1110489','5.01',{НаимДок:'электронная экспедиторская расписка',ДатИнфЭксп:formatDate(data.createdAt),ВрИнфЭксп:formatTime(data.createdAt),НаимЭкСубСост:data.compilerName,ОснДовОргСост:data.compilerAuthority && formatDocumentRequisites(data.compilerAuthority),СодИнфЭксп:formatReceiptContent(data.content),ПодпИнфЭксп:formatSigner(data.signer)},{...meta,documentCreatedAt:meta.documentCreatedAt??data.createdAt})
    const {Документ,...file}=node.Файл as Record<string,unknown>
    return {Файл:{...file,ИдПолИной:data.otherRecipientIds,Документ}}
}
