/**
 * Сведения о лице, имеющем отношение к перевозке
 * (об участнике перевозки)
 * (УчастникТип, таб-7.17)
 */

import { mapArrayIfNotEmpty } from '../../../../helpers'
import { formatParticipantInfo, type TParticipantInfo } from './7.18-ParticipantInfo';
import { formatIdentificationDetails, type TIdentificationDetails } from './7.19-IdentificationDetails';
import { formatAddressInfo, type TAddressInfo } from './7.25-AddressInfo';
import { formatContacts, type TContacts } from './7.35-Contacts';

export type TPartyInfo = {
    /**
     * Информация для участника документооборота.
     * (таб-7.18)
     */
    participantInfo?: TParticipantInfo[]

    /**
     * Идентификационные сведения о лице, имеющем отношение
     * к перевозке (об участнике перевозки).
     * (таб-7.19)
     */
    identificationDetails: TIdentificationDetails

    /**
     * Сведения об адресе.
     * Заполняется в отношении сведений о юридическом лице.
     * (таб-7.25)
     */
    address?: TAddressInfo

    /**
     * Контактные данные.
     * (таб-7.35)
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
