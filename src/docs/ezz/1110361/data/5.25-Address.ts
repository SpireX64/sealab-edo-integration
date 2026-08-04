/**
 * Сведения об адресе
 * (АдресПользТип, таб-5.25)
 */

import { formatAddressInfo, type TAddressInfo } from './5.26-AddressInfo';
import { formatCoordinates, type TCoordinates } from './5.27-Coordinates';

export type TAddress = {
    /**
     * Комментарии к адресу.
     * (1-2000 символов)
     */
    comment?: string

    /**
     * Глобальный номер места нахождения (GLN места).
     * (13 символов)
     */
    gln?: string

    /**
     * Координаты места.
     * (таб-5.27)
     */
    coordinates?: TCoordinates

    /**
     * Сведения об адресе местонахождения.
     * (таб-5.26)
     */
    addressInfo: TAddressInfo
}

export function formatAddress(data: TAddress) {
    return {
        "АдрКоммент": data.comment,
        "ГЛН": data.gln,
        "Коорд": data.coordinates && formatCoordinates(data.coordinates),
        "Адрес": formatAddressInfo(data.addressInfo),
    }
}
