/** Новый грузополучатель (УчастникТрНТип, таб-9.12). */
import { formatIdentificationDetails, type TIdentificationDetails } from './9.14-IdentificationDetails'
import { formatParticipantInfo, type TParticipantInfo } from './9.13-ParticipantInfo'
import { formatAddress, type TAddress } from './9.22-Address'
import { formatContacts, type TContacts } from './9.27-Contacts'
export type TPartyDetails = {
    participantInfo?: TParticipantInfo
    partyId: TIdentificationDetails
    address: TAddress
    contacts?: TContacts
}
export function formatPartyDetails(data: TPartyDetails) {
    if (!data.address) throw new TypeError("Не указан адрес нового грузополучателя")
    return {
        "ИнфДляУчаст": data.participantInfo && formatParticipantInfo(data.participantInfo),
        "ИдСв": formatIdentificationDetails(data.partyId),
        "Адрес": formatAddress(data.address),
        "Контакт": data.contacts && formatContacts(data.contacts),
    }
}
