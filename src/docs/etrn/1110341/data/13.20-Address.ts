/**
 * Сведения об адресе
 * (АдресПользТип, таб-13.20)
 *
 * Одно из полей {russianAddress, foreignAddressInfo, garCode} обязательно.
 */

import { formatRussianAddress, type TRussianAddress } from './13.21-RussianAddress';
import { formatForeignAddressInfo, type TForeignAddressInfo } from './13.22-ForeignAddressInfo';
import { formatCoordinates, type TCoordinates } from './13.13-Coordinates';

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
     * (таб-13.13)
     */
    coordinates?: TCoordinates
} & (
    | {
        addressType: 'russian'

        /**
         * Реквизиты адреса на территории Российской Федерации.
         * (таб-13.21)
         */
        russianAddress: TRussianAddress
    }
    | {
        addressType: 'foreign'

        /**
         * Информация об адресе, в том числе об адресе
         * за пределами территории Российской Федерации.
         * (таб-13.22)
         */
        foreignAddressInfo: TForeignAddressInfo
    }
    | {
        addressType: 'gar'

        /**
         * Уникальный номер адреса объекта адресации
         * в государственном адресном реестре.
         * (1-36 символов)
         */
        garCode: string
    }
)

export function formatAddress(data: TAddress) {
    let addressFields: Record<string, unknown>

    switch (data.addressType) {
        case 'russian':
            addressFields = { "АдресРФ": formatRussianAddress(data.russianAddress) }
            break
        case 'foreign':
            addressFields = { "АдресИнф": formatForeignAddressInfo(data.foreignAddressInfo) }
            break
        case 'gar':
            addressFields = { "КодГАР": [data.garCode] }
            break
    }

    return {
        "АдрКоммент": data.comment,
        "ГЛН": data.gln ? [data.gln] : undefined,
        "Коорд": data.coordinates && formatCoordinates(data.coordinates),
        ...addressFields,
    }
}
