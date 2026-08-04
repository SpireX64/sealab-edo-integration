/**
 * Идентификация файла обмена информации перевозчика о приеме груза
 * (ИдИнфПрвПрием, таб-13.3)
 */

import { formatDate, formatTime } from '../../../../helpers'
import { type TFileId } from '../../common/FileId';

export type TCarrierAcceptanceFileId = TFileId

export function formatCarrierAcceptanceFileId({ fileId, date, time, signBase64 }: TCarrierAcceptanceFileId) {
    return {
        "ИдФайлИнфПрвПрием": fileId,
        "ДатФайлПрвПрием": formatDate(date),
        "ВрФайлПрвПрием": formatTime(time),
        "ЭП": signBase64,
    }
}
