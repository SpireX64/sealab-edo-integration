/**
 * Сведения об адресе
 * (АдресПользТип, таб-5.27)
 */

import { formatCoordinates, type TCoordinates } from './5.28-Coordinates';
import { formatAddress, type TAddress } from './5.29-Address';

export type TDeparturePoint = {
    /**
     * Комментарии к адресу.
     * (1-2000 символов)
     */
    addressComment?: string

    /**
     * Глобальный номер места нахождения (GLN места).
     * Позволяет определить расположение юридических лиц,
     * их функциональных подразделений и физических объектов.
     * (13 символов)
     */
    gln?: string

    /**
     * Координаты места.
     * (таб-5.28)
     */
    coordinates?: TCoordinates

    /**
     * Сведения об адресе местонахождения.
     * (таб-5.29)
     */
    address: TAddress
}

export function formatDeparturePoint(data: TDeparturePoint) {
    return {
        "АдрКоммент": data.addressComment,
        "ГЛН": data.gln,
        "Коорд": data.coordinates && formatCoordinates(data.coordinates),
        "Адрес": formatAddress(data.address),
    }
}