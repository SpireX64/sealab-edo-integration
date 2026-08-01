/**
 * Сведения об адресе
 * (АдресПользТип, таб-5.49)
 */

import { formatAddress } from '../types'
import type { TAddress } from '../types'
import { formatCoordinates } from './5.42-Coordinates'
import type { TCoordinates } from './5.42-Coordinates'

export type TConcreteAddress = {
    /** Глобальный номер места нахождения (GLN места) */
    gln?: string
    /** Комментарии к адресу */
    comment?: string
    /** Координаты места */
    coords?: TCoordinates
    /** Адрес места */
    address: TAddress
}

export function formatConcreteAddress({gln, coords, comment, address}: TConcreteAddress) {
    return {
        ...formatAddress(address),
        "АдрКоммент": comment,
        "ГЛН": gln,
        "Коорд": coords && formatCoordinates(coords),
    }
}
