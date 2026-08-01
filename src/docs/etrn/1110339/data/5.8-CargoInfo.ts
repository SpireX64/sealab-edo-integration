/**
 * Сведения о грузе
 * (СвГруз, таб-5.8)
 */

import { formatCargoDescription } from './5.9-CargoDescription'
import type { TCargoDescription } from './5.9-CargoDescription'
import { formatDeclaredValueInfo } from './5.40-DeclaredValueInfo'
import type { TDeclaredValueInfo } from './5.40-DeclaredValueInfo'
import { formatInfoField } from './5.44-InfoField'
import type { TInfoField } from './5.44-InfoField'

export type TCargoInfo = {
    /** Описание груза */
    description: TCargoDescription[]
    /** Общая объявленная стоимость (ценность) груза */
    totalDeclaredValue?: TDeclaredValueInfo
    /** Информационное поле */
    infoField?: TInfoField[]
}

export function formatCargoInfo({ description, totalDeclaredValue, infoField }: TCargoInfo) {
    return {
        "ОпГруз": description.map(formatCargoDescription),
        "ОбщСтоим": totalDeclaredValue && formatDeclaredValueInfo(totalDeclaredValue),
        "ИнфПоле": infoField?.map(formatInfoField),
    }
}
