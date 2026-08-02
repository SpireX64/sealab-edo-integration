/**
 * Информационное поле
 * (ИнфПолТип, общий тип для документов ЭТрН)
 */

import { formatTextInfo } from './TextInfo'
import type { TTextInfo } from './TextInfo'

export type TInfoField = {
    /**
     * Идентификатор файла информационного поля (UUID).
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
