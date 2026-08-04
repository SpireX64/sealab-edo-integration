/**
 * Сведения о лице, имеющем отношение к перевозке
 * (об участнике перевозки)
 * (УчастникТип, таб-5.18)
 */

import { mapArrayIfNotEmpty } from '../../../../helpers'
import { formatParticipantInfo, type TParticipantInfo } from './5.19-ParticipantInfo';
import { formatIdentificationDetails, type TIdentificationDetails } from './5.20-IdentificationDetails';
import { formatAddressInfo, type TAddressInfo } from './5.26-AddressInfo';
import { formatContacts, type TContacts } from './5.39-Contacts';

export type TPartyInfo = {
    /**
     * Информация для участника документооборота.
     * (таб-5.19)
     */
    participantInfo?: TParticipantInfo[]

    /**
     * Идентификационные сведения о лице, имеющем отношение
     * к перевозке (об участнике перевозки).
     * (таб-5.20)
     */
    identificationDetails: TIdentificationDetails

    /**
     * Сведения об адресе.
     * Заполняется в отношении сведений о юридическом лице.
     * (таб-5.26)
     */
    address?: TAddressInfo

    /**
     * Контактные данные.
     * (таб-5.39)
     */
    contacts: TContacts
}

export function formatPartyInfo(data: TPartyInfo) {
    return {
        "ИнфДляУчаст": mapArrayIfNotEmpty(data.participantInfo, formatParticipantInfo),
        "ИдСв": formatIdentificationDetails(data.identificationDetails),
        "Адрес": data.address && formatAddressInfo(data.address),
        "Конт": formatContacts(data.contacts),
    }
}
