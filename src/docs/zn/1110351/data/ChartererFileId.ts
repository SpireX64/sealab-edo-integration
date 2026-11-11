/** Ссылка на подписанный заказ-наряд фрахтователя 1110350. */
import { formatDate,formatTime } from '../../../../helpers'
import type { TFileId } from '../../../etrn/common/FileId'
export type TChartererFileId = TFileId
export function formatChartererFileId(data:TChartererFileId) {
    return {"ИдФайлИнфФт":data.fileId,"ДатФайлИнфФт":formatDate(data.createdAt),"ВрФайлИнфФт":formatTime(data.createdAt).replace(/:/g,'.'),"ЭП":data.signBase64}
}
