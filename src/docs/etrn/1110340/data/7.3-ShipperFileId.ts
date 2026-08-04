/**
 * Идентификация файла обмена информации грузоотправителя
 * (ИдИнфГО, таб-7.3)
 */

import { formatDate, formatTime } from '../../../../helpers'
import { type TFileId } from '../../common/FileId';

export type TShipperFileId = TFileId

export function formatShipperFileId({ fileId, date, time, signBase64 }: TShipperFileId) {
    return {
        "ИдФайлИнфГО": fileId,
        "ДатФайлИнфГО": formatDate(date),
        "ВрФайлИнфГО": formatTime(time),
        "ЭП": signBase64,
    }
}
