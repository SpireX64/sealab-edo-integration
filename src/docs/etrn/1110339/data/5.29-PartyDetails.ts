/**
 * (УчастникТрНТип, таб-5.29)
 */

import { formatIdentificationDetails, type TIdentificationDetails } from './5.35-IdentificationDetails';
import { formatParticipantInfo, type TParticipantInfo } from './5.30-ParticipantInfo';
import { formatAddress, type TAddress } from '../types';
import { formatContacts, type TContacts } from './5.48-Contacts';

export type TPartyDetails = {
    /**
     * Информация для участника документооборота.
     * (таб-5.30)
     */
    participantInfo?: TParticipantInfo

    /** Идентификационные сведения о лице, имеющем отношение к перевозке */
    partyId: TIdentificationDetails

    /** Сведения об адресе местонахождения */
    address?: TAddress

    /** Контактные данные */
    contacts: TContacts
}

export function formatPartyDetails({
    participantInfo,
    partyId,
    address,
    contacts,
}: TPartyDetails) {
    return {
        "ИнфДляУчаст": participantInfo && formatParticipantInfo(participantInfo),
        "ИдСв": formatIdentificationDetails(partyId),
        "Адрес": address && formatAddress(address),
        "Контакт": formatContacts(contacts),
    }
}
