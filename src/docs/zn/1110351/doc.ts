/** Заказ-наряд: согласование фрахтовщиком, 1110351. */
import { formatDate,formatTime } from '../../../helpers'
import { fileNode,type TFileXmlMeta } from '../../shared'
import { formatFreighterContent,type TFreighterContent } from './data/Content'
import { formatFreighterSigner,type TFreighterSigner } from './data/FreighterSigner'
import { formatChartererFileId,type TChartererFileId } from './data/ChartererFileId'
export type TDocument1110351 = {createdAt:Date;chartererFileId:TChartererFileId;content:TFreighterContent;signer:TFreighterSigner}
export function Document1110351(data:TDocument1110351,meta:TFileXmlMeta={}) {
    if (!meta.programTag?.trim() || meta.programTag.length>40) throw new TypeError('Не указана версия программы programTag (1–40 символов)')
    return fileNode('1110351','5.01',{"ДатИнфФщ":formatDate(data.createdAt),"ВрИнфФщ":formatTime(data.createdAt).replace(/:/g,'.'),"ИдИнфФт":formatChartererFileId(data.chartererFileId),"СодЗНИнфФщ":formatFreighterContent(data.content),"Подписант":formatFreighterSigner(data.signer)},{...meta,documentCreatedAt:meta.documentCreatedAt??data.createdAt})
}
