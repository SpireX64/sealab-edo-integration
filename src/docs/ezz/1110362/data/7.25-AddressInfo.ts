/**
 * Адрес местонахождения
 * (АдресТип, таб-7.25)
 *
 * Одно из полей обязательно.
 */

import { AddressType } from '../consts'
import { formatRussianAddress, type TRussianAddress } from './7.26-RussianAddress';
import { formatFiasAddress, type TFiasAddress } from './7.27-FiasAddress';
import { formatForeignAddressInfo, type TForeignAddressInfo } from './7.34-ForeignAddressInfo';

export type TAddressInfo =
    | {
        addressType: AddressType.RussianAddress

        russianAddress: TRussianAddress
    }
    | {
        addressType: AddressType.FiasAddress

        fiasAddress: TFiasAddress
    }
    | {
        addressType: AddressType.ForeignAddressInfo

        foreignAddressInfo: TForeignAddressInfo
    }

export function formatAddressInfo(data: TAddressInfo) {
    switch (data.addressType) {
        case AddressType.RussianAddress:
            return { "АдрРФ": formatRussianAddress(data.russianAddress) }

        case AddressType.FiasAddress:
            return { "АдрФИАС": formatFiasAddress(data.fiasAddress) }

        case AddressType.ForeignAddressInfo:
            return { "АдрИнф": formatForeignAddressInfo(data.foreignAddressInfo) }
    }
}