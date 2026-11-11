/** Заказ-наряд: завершение пользования ТС, 1110353. */
import { formatDate,formatTime } from '../../../helpers'
import { fileNode,type TFileXmlMeta } from '../../shared'
import { formatCompletionContent,type TCompletionContent } from './data/Content'
import { formatFreighterSigner,type TFreighterSigner } from './data/FreighterSigner'
import { formatSubmissionFileId,type TSubmissionFileId } from './data/SubmissionFileId'
export type TDocument1110353 = {createdAt:Date;submissionFileId:TSubmissionFileId;content:TCompletionContent;signer:TFreighterSigner}
export function Document1110353(data:TDocument1110353,meta:TFileXmlMeta={}) {
    if (!meta.programTag?.trim() || meta.programTag.length>40) throw new TypeError('Не указана версия программы programTag (1–40 символов)')
    return fileNode('1110353','5.01',{"ДатИнфФщ":formatDate(data.createdAt),"ВрИнфФщ":formatTime(data.createdAt).replace(/:/g,'.'),"ИдИнфФт":formatSubmissionFileId(data.submissionFileId),"СодЗНИнфФщ":formatCompletionContent(data.content),"Подписант":formatFreighterSigner(data.signer)},{...meta,documentCreatedAt:meta.documentCreatedAt??data.createdAt})
}
