/**
 * Идентификация файла обмена информации об обстоятельствах
 * и особенностях рейса
 * (ИдИнфСоб, таб-9.3)
 *
 * Структурно идентичен таб-7.3 документа 1110381.
 */

import { formatDate, formatTime } from '../../../../helpers'

export type TFileIdentification = {
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

export function formatFileIdentification(data: TFileIdentification) {
    return {
        "ИдФайлИнфСоб": data.fileId,
        "ДатФайлИнфСоб": formatDate(data.fileDateTime),
        "ВрФайлИнфСоб": formatTime(data.fileDateTime),
        "ЭП": data.signature,
    }
}