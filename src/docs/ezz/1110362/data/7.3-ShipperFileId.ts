/**
 * Идентификация файла обмена информации грузоотправителя
 * (ИдИнфГО, таб-7.3)
 */

import { formatDate, formatTime } from '../../../../helpers'

export type TShipperFileId = {
    /**
     * Идентификатор файла обмена информации грузоотправителя.
     * Содержит (повторяет) имя файла обмена информации
     * грузоотправителя без расширения.
     * (1-255 символов)
     */
    fileId: string

    /**
     * Дата и время формирования файла обмена информации
     * грузоотправителя.
     * Указывается (повторяет) значение из файла обмена
     * информации грузоотправителя.
     */
    createdAt: Date

    /**
     * Электронная подпись файла обмена информации
     * грузоотправителя.
     * Представляется в кодировке Base64.
     */
    signatureBase64: string
}

export function formatShipperFileId(data: TShipperFileId) {
    return {
        "ИдФайлИнфГО": data.fileId,
        "ДатФайлИнфГО": formatDate(data.createdAt),
        "ВрФайлИнфГО": formatTime(data.createdAt),
        "ЭП": data.signatureBase64,
    }
}
