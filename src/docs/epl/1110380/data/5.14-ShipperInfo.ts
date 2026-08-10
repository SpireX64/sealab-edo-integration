/**
 * Сведения о лице, имеющем отношение к перевозке
 * (об участнике перевозки)
 * (УчастникТип, таб-5.14)
 */

import { mapArrayIfNotEmpty } from '../../../../helpers'
import { formatParticipantInfo, type TParticipantInfo } from './5.15-ParticipantInfo';
import { formatParticipantIdentification, type TParticipantIdentification } from './5.16-ParticipantIdentification';
import { formatAddress, type TAddress } from './5.29-Address';
import { formatContacts, type TContacts } from './5.37-Contacts';

export type TShipperInfo = {
    /**
     * Информация для участника документооборота.
     * (таб-5.15)
     */
    participantInfo?: TParticipantInfo[]

    /**
     * Идентификационные сведения о лице, имеющем отношение
     * к перевозке (об участнике перевозки).
     * (таб-5.16)
     */
    identificationDetails: TParticipantIdentification

    /**
     * Сведения об адресе.
     * Заполняется в отношении сведений о юридическом лице.
     * (таб-5.29)
     */
    address?: TAddress

    /**
     * Контактные данные.
     * (таб-5.37)
     */
    contacts: TContacts
}

export function formatShipperInfo(data: TShipperInfo) {
    return {
        "ИнфДляУчаст": mapArrayIfNotEmpty(data.participantInfo, formatParticipantInfo),
        "ИдСв": formatParticipantIdentification(data.identificationDetails),
        "Адрес": data.address && formatAddress(data.address),
        "Конт": formatContacts(data.contacts),
    }
}