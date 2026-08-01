/**
 * Сведения о грузополучателе
 * (СвГП, таб-5.7)
 */

import { formatPartyDetails } from './5.29-PartyDetails'
import type { TPartyDetails } from './5.29-PartyDetails'
import { formatConcreteAddress } from './5.49-ConcreteAddress'
import type { TConcreteAddress } from './5.49-ConcreteAddress'

export type TConsigneeInfo = {
    ident: TPartyDetails
    deliveryAddress: TConcreteAddress
}

export function formatConsigneeInfo({ ident, deliveryAddress }: TConsigneeInfo) {
    return {
        "РекИдентГП": formatPartyDetails(ident),
        "АдресДостГр": formatConcreteAddress(deliveryAddress),
    }
}
