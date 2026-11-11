/** Заказ-наряд: подтверждение подачи ТС фрахтователем, 1110352. */
import { formatDate,formatTime } from '../../../helpers'
import { fileNode,type TFileXmlMeta } from '../../shared'
import { formatSubmissionContent,type TSubmissionContent } from './data/Content'
import { formatChartererSigner,type TChartererSigner } from './data/ChartererSigner'
import { formatFreighterFileId,type TFreighterFileId } from './data/FreighterFileId'
export type TDocument1110352 = {createdAt:Date;freighterFileId:TFreighterFileId;content:TSubmissionContent;signer:TChartererSigner}
export function Document1110352(data:TDocument1110352,meta:TFileXmlMeta={}) {
    if (!meta.programTag?.trim() || meta.programTag.length>40) throw new TypeError('Не указана версия программы programTag (1–40 символов)')
    return fileNode('1110352','5.01',{"ДатИнфФт":formatDate(data.createdAt),"ВрИнфФт":formatTime(data.createdAt).replace(/:/g,'.'),"ИдИнфФщ":formatFreighterFileId(data.freighterFileId),"СодЗНИнфФт":formatSubmissionContent(data.content),"Подписант":formatChartererSigner(data.signer)},{...meta,documentCreatedAt:meta.documentCreatedAt??data.createdAt})
}
