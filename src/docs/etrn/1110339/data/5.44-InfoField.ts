/**
 * Информационное поле
 * (ИнфПолТип, таб-5.44)
 */

import { formatTextInfo } from './5.47-TextInfo'
import type { TTextInfo } from './5.47-TextInfo'

export type TInfoField = {
    /**
     * Идентификатор файла информационного поля (UUID).
     * Указывается идентификатор файла, связанного со сведениями
     * данного электронного файла обмена.
     * (36 символов)
     */
    fileId?: string

    /**
     * Текстовая информация.
     */
    textInfo?: TTextInfo[]
}

export function formatInfoField(data: TInfoField) {
    return {
        "ИдФайлИнфПол": data.fileId,
        "ТекстИнф": data.textInfo?.map(formatTextInfo),
    }
}
