/** Ссылка на файл перевозчика о приёме (таб-9.3). */
import { formatDate, formatTime } from '../../../../helpers'
import type { TFileId } from '../../common/FileId'
export type TCarrierAcceptanceFileId = TFileId
export function formatCarrierAcceptanceFileId(data: TCarrierAcceptanceFileId) {
    return {
        "ИдФайлПрвПрием": data.fileId,
        "ДатФайлПрвПрием": formatDate(data.createdAt),
        "ВрФайлПрвПрием": formatTime(data.createdAt),
        "ЭП": data.signBase64,
    }
}
