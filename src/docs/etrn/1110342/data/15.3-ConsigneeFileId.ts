/**
 * Идентификация файла обмена информации грузополучателя
 * (ИдИнфГП, таб-15.3)
 */

import { formatDate, formatTime } from '../../../../helpers'
import { type TFileId } from '../../common/FileId';

export type TConsigneeFileId = TFileId

export function formatConsigneeFileId({ fileId, createdAt, signBase64 }: TConsigneeFileId) {
    return {
        "ИдФайлИнфГП": fileId,
        "ДатФайлИнфГП": formatDate(createdAt),
        "ВрФайлИнфГП": formatTime(createdAt),
        "ЭП": signBase64,
    }
}
