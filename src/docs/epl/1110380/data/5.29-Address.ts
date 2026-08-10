/**
 * Адрес местонахождения
 * (АдресТип, таб-5.29)
 *
 * Одно из полей обязательно.
 */

import { AddressType } from '../consts'
import { formatRussianAddress, type TRussianAddress } from './5.30-RussianAddress';
import { formatFiasAddress, type TFiasAddress } from './5.31-FiasAddress';
import { formatForeignAddressInfo, type TForeignAddressInfo } from './5.36-ForeignAddressInfo';

export type TAddress =
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

export function formatAddress(data: TAddress) {
    switch (data.addressType) {
        case AddressType.RussianAddress:
            return { "АдрРФ": formatRussianAddress(data.russianAddress) }

        case AddressType.FiasAddress:
            return { "АдрФИАС": formatFiasAddress(data.fiasAddress) }

        case AddressType.ForeignAddressInfo:
            return { "АдрИнф": formatForeignAddressInfo(data.foreignAddressInfo) }
    }
}