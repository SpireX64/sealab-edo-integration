/**
 * Сведения о грузополучателе
 * (СвГП, таб-5.7)
 */

import { formatPartyDetails, type TPartyDetails } from './5.29-PartyDetails';
import { formatConcreteAddress, type TConcreteAddress } from './5.49-ConcreteAddress';

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
