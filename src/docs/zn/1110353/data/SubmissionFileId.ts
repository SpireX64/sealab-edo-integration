/** Ссылка на подписанный файл подачи ТС 1110352. */
import { formatDate,formatTime } from '../../../../helpers'
import type { TFileId } from '../../../etrn/common/FileId'
export type TSubmissionFileId = TFileId
export function formatSubmissionFileId(data:TSubmissionFileId) {
    return {"ИдФайлИнфФт":data.fileId,"ДатФайлИнфФт":formatDate(data.createdAt),"ВрФайлИнфФт":formatTime(data.createdAt).replace(/:/g,'.'),"ЭП":data.signBase64}
}
