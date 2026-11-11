/** Ссылка на подписанный файл перевозчика ЭСВ 1110347. */
import { formatDate, formatTime } from '../../../../helpers'
import type { TFileId } from '../../../etrn/common/FileId'
export type TCarrierFileId = TFileId
export function formatCarrierFileId(data:TCarrierFileId) {
    return {"ИдФайлИнфПрв":data.fileId,"ДатФайлИнфПрв":formatDate(data.createdAt),"ВрФайлИнфПрв":formatTime(data.createdAt).replace(/:/g,'.'),"ЭП":data.signBase64}
}
