/**
 * Адрес местонахождения
 * (АдресТип, таб-5.26)
 *
 * Одно из полей обязательно.
 */

import { formatRussianAddress, type TRussianAddress } from './5.28-RussianAddress';
import { formatFiasAddress, type TFiasAddress } from './5.29-FiasAddress';
import { formatForeignAddressInfo, type TForeignAddressInfo } from './5.34-ForeignAddressInfo';

export type TAddressInfo =
    | { russianAddress: TRussianAddress }
    | { fiasAddress: TFiasAddress }
    | { foreignAddressInfo: TForeignAddressInfo }

export function formatAddressInfo(data: TAddressInfo) {
    if ('russianAddress' in data) {
        return { "АдрРФ": formatRussianAddress(data.russianAddress) }
    }
    if ('fiasAddress' in data) {
        return { "АдрФИАС": formatFiasAddress(data.fiasAddress) }
    }
    return { "АдрИнф": formatForeignAddressInfo(data.foreignAddressInfo) }
}
