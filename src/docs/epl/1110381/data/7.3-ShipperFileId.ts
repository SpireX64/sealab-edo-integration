/**
 * Идентификация файла обмена информации об обстоятельствах
 * и особенностях рейса
 * (ИдИнфСоб, таб-7.3)
 */

import { formatDate, formatTime } from '../../../../helpers'

export type TShipperFileId = {
    /**
     * Идентификатор файла обмена информации об обстоятельствах
     * и особенностях рейса.
     * Содержит (повторяет) имя файла обмена.
     * (1-255 символов)
     */
    fileId: string

    /**
     * Дата и время формирования файла обмена информации
     * об обстоятельствах и особенностях рейса.
     */
    fileDateTime: Date

    /**
     * Электронная подпись файла обмена информации
     * об обстоятельствах и особенностях рейса.
     * Представляется в кодировке Base64.
     */
    signature: string
}

export function formatShipperFileId(data: TShipperFileId) {
    return {
        "ИдФайлИнфСоб": data.fileId,
        "ДатФайлИнфСоб": formatDate(data.fileDateTime),
        "ВрФайлИнфСоб": formatTime(data.fileDateTime),
        "ЭП": data.signature,
    }
}