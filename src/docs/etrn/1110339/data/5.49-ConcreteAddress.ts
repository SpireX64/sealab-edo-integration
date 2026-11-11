/**
 * Сведения об адресе
 * (АдресПользТип, таб-5.49)
 */

import { formatAddress, type TAddress } from '../types';
import { formatCoordinates, type TCoordinates } from './5.42-Coordinates';

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
        "АдрКоммент": comment,
        "ГЛН": gln ? [gln] : undefined,
        "Коорд": coords && formatCoordinates(coords),
        ...formatAddress(address),
    }
}
