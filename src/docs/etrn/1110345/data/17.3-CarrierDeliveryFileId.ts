/** Ссылка на подписанный файл выдачи 1110342 (таб-17.3). */
import { formatDate, formatTime } from '../../../../helpers'
import type { TFileId } from '../../common/FileId'
export type TCarrierDeliveryFileId = TFileId
export function formatCarrierDeliveryFileId(data: TCarrierDeliveryFileId) {
    return { "ИдФайлПрвВыд": data.fileId, "ДатФайлПрвВыд": formatDate(data.createdAt), "ВрФайлПрвВыд": formatTime(data.createdAt), "ЭП": data.signBase64 }
}
