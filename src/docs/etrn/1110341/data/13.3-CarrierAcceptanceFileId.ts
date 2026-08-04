/**
 * Идентификация файла обмена информации перевозчика о приеме груза
 * (ИдИнфПрвПрием, таб-13.3)
 */

import { formatDate, formatTime } from '../../../../helpers'

export type TCarrierAcceptanceFileId = {
    /**
     * Идентификатор файла обмена информации перевозчика о приеме груза.
     * Содержит (повторяет) имя файла без расширения.
     * (1-255 символов)
     */
    fileId: string

    /**
     * Дата формирования файла обмена информации перевозчика о приеме груза.
     */
    date: Date

    /**
     * Время формирования файла обмена информации перевозчика о приеме груза.
     */
    time: Date

    /**
     * Электронная подпись файла обмена информации перевозчика о приеме груза.
     * Представляется в кодировке Base64.
     */
    signBase64: string
}

export function formatCarrierAcceptanceFileId({ fileId, date, time, signBase64 }: TCarrierAcceptanceFileId) {
    return {
        "ИдФайлИнфПрвПрием": fileId,
        "ДатФайлПрвПрием": formatDate(date),
        "ВрФайлПрвПрием": formatTime(time),
        "ЭП": signBase64,
    }
}
