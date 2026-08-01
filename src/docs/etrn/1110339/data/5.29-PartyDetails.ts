/**
 * (УчастникТрНТип, таб-5.29)
 */

import { formatIdentificationDetails } from './5.35-IdentificationDetails'
import type { TIdentificationDetails } from './5.35-IdentificationDetails'
import { formatParticipantInfo } from './5.30-ParticipantInfo'
import type { TParticipantInfo } from './5.30-ParticipantInfo'
import { formatAddress } from '../types'
import type { TAddress } from '../types'
import { formatContacts } from './5.48-Contacts'
import type { TContacts } from './5.48-Contacts'

export type TPartyDetails = {
    /**
     * Информация для участника документооборота.
     * (таб-5.30)
     */
    info?: TParticipantInfo

    /** Идентификационные сведения о лице, имеющем отношение к перевозке */
    partyId: TIdentificationDetails

    /** Сведения об адресе местонахождения */
    address?: TAddress

    /** Контактные данные */
    contacts: TContacts
}

export function formatPartyDetails({
    info,
    partyId,
    address,
    contacts,
}: TPartyDetails) {
    return {
        "ИнфДляУчаст": info && formatParticipantInfo(info),
        "ИдСв": formatIdentificationDetails(partyId),
        "Адрес": address && formatAddress(address),
        "Контакт": formatContacts(contacts),
    }
}
