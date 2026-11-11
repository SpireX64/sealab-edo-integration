/** Ссылка на подписанный заказ-наряд фрахтовщика 1110351. */
import { formatDate,formatTime } from '../../../../helpers'
import type { TFileId } from '../../../etrn/common/FileId'
export type TFreighterFileId = TFileId
export function formatFreighterFileId(data:TFreighterFileId) {
    return {"ИдФайлИнфФщ":data.fileId,"ДатФайлИнфФщ":formatDate(data.createdAt),"ВрФайлИнфФщ":formatTime(data.createdAt).replace(/:/g,'.'),"ЭП":data.signBase64}
}
