/**
 * Информационное поле
 * (ИнфПолТип)
 *
 * Общий тип для документов ЭТрН (1110339, 1110340, 1110341)
 * и ЭЗЗ (1110361).
 */

import { mapArrayIfNotEmpty } from '../../helpers'
import { formatTextInfo, type TTextInfo } from './TextInfo';

export type TInfoField = {
    /**
     * Идентификатор файла информационного поля.
     * Указывается идентификатор файла, связанного со сведениями
     * данного электронного файла обмена (GUID).
     * (36 символов)
     */
    fileId?: string

    /**
     * Текстовая информация.
     */
    textEntries?: TTextInfo[]
}

export function formatInfoField(data: TInfoField) {
    return {
        "ИдФайлИнфПол": data.fileId,
        "ТекстИнф": mapArrayIfNotEmpty(data.textEntries, formatTextInfo),
    }
}
