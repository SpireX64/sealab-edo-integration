/** Адрес места выгрузки (АдресПользТип, таб-9.23). */
import { formatConcreteAddress as formatPlace, type TConcreteAddress as TPlace } from '../../1110339/data/5.49-ConcreteAddress'
import type { TAddress } from './9.22-Address'
export type TConcreteAddress = Omit<TPlace, 'address'> & { address: TAddress }
export function formatConcreteAddress(data: TConcreteAddress) {
    const address = data.address
    if (typeof address !== 'string' && !('countryCode' in address) && !/^\d{6}$/.test(address.postalCode)) {
        throw new TypeError("Не указан шестизначный индекс пункта выгрузки в РФ")
    }
    return formatPlace(data)
}
