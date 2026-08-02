/**
 * Идентификация файла обмена информации грузоотправителя
 * (ИдИнфГО, таб-7.3)
 */

import { formatDate, formatTime } from '../../../../helpers'

export type TShipperFileId = {
    /**
     * Дата формирования файла обмена информации грузоотправителя.
     */
    date: Date

    /**
     * Время формирования файла обмена информации грузоотправителя.
     */
    time: Date

    /**
     * Электронная подпись файла обмена информации грузоотправителя.
     * Представляется в кодировке Base64.
     */
    signBase64: string
}

export function formatShipperFileId({ date, time, signBase64 }: TShipperFileId) {
    return {
        "ДатФайлИнфГО": formatDate(date),
        "ВрФайлИнфГО": formatTime(time),
        "ЭП": signBase64,
    }
}
