/**
 * Информационное поле
 * (ИнфПолТип, таб-5.40)
 */

import { mapArrayIfNotEmpty } from '../../../../helpers'
import { formatTextInfo, type TTextInfo } from './5.41-TextInfo';

export type TInfoField = {
    /**
     * Идентификатор файла информационного поля.
     * GUID связанного файла.
     * (36 символов)
     */
    fileId?: string

    /**
     * Текстовая информация.
     * (таб-5.41)
     */
    textEntries?: TTextInfo[]
}

export function formatInfoField(data: TInfoField) {
    return {
        "ИдФайлИнфПол": data.fileId,
        "ТекстИнф": mapArrayIfNotEmpty(data.textEntries, formatTextInfo),
    }
}
