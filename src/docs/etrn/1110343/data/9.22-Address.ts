/** Адрес участника (АдресТип, таб-9.22); отличается тегами от адреса места. */
import { formatAddress as formatPlaceAddress, type TRussianAddress, type TForeignAddressInfo } from '../../1110339/types'
export type TAddress = (TRussianAddress & { postalCode: string }) | TForeignAddressInfo | string
export function formatAddress(data: TAddress) {
    if (typeof data !== 'string' && !('countryCode' in data) && !/^\d{6}$/.test(data.postalCode)) {
        throw new TypeError("Не указан шестизначный индекс адреса в РФ")
    }
    const node = formatPlaceAddress(data)
    if ('АдресРФ' in node) return { "АдрРФ": node.АдресРФ }
    if ('АдресИнф' in node) return { "АдрИнф": node.АдресИнф }
    return node
}
