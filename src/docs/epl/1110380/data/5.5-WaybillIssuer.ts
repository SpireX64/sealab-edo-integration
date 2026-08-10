/**
 * Сведения о лице, оформившем путевой лист
 * (СвЛицПЛ, таб-5.5)
 */

import { WaybillIssuerKind, formatWaybillIssuerKind } from '../consts'
import { formatIdentificationDetails, type TIdentificationDetails } from './5.6-IdentificationDetails';
import { formatAddress, type TAddress } from './5.29-Address';
import { formatContacts, type TContacts } from './5.37-Contacts';

export type TWaybillIssuer = {
    /**
     * Лицо, оформившее путевой лист.
     * С – собственник (владелец) транспортного средства;
     * А – арендодатель, предоставивший в аренду транспортное средство
     * с экипажем.
     */
    issuerKind: WaybillIssuerKind

    /**
     * Идентификационные сведения.
     * (таб-5.6)
     */
    identificationDetails: TIdentificationDetails

    /**
     * Адрес в пределах местонахождения юридического лица /
     * адрес регистрации по месту жительства
     * индивидуального предпринимателя.
     * (таб-5.29)
     */
    address: TAddress

    /**
     * Контактные данные.
     * (таб-5.37)
     */
    contacts: TContacts
}

export function formatWaybillIssuer(data: TWaybillIssuer) {
    return {
        "ЛицоОфПЛ": formatWaybillIssuerKind(data.issuerKind),
        "ИдСв": formatIdentificationDetails(data.identificationDetails),
        "Адрес": formatAddress(data.address),
        "Контакт": formatContacts(data.contacts),
    }
}