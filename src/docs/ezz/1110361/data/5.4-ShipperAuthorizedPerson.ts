/**
 * Сведения о лице (лицах), уполномоченном (ых) грузоотправителем
 * на заполнение и подписание заказа и заявки или погрузку груза
 * в транспортное средство, заполнение и подписание транспортной
 * накладной или осуществление платежей по договору перевозки
 * (СвЛицГО, таб-5.4)
 */

import { Authority, formatAuthority } from '../consts'
import { formatDocumentRequisites, type TDocumentRequisites } from './5.16-DocumentRequisites';
import { formatPartyInfo, type TPartyInfo } from './5.18-PartyInfo';

export type TShipperAuthorizedPerson = {
    /**
     * Полномочия действовать в интересах грузоотправителя.
     * 1 – заполнение и подписание заказа и заявки;
     * 2 – погрузка груза в транспортное средство,
     *     заполнение и подписание транспортной накладной;
     * 3 – осуществление платежей по договору перевозки.
     */
    authority: Authority

    /**
     * Реквизиты документа, подтверждающего соответствующие
     * указанные полномочия.
     * (таб-5.16)
     */
    authorityDocument: TDocumentRequisites

    /**
     * Реквизиты уполномоченного лица.
     * (таб-5.18)
     */
    personDetails: TPartyInfo
}

export function formatShipperAuthorizedPerson(data: TShipperAuthorizedPerson) {
    return {
        "Полн": formatAuthority(data.authority),
        "РеквДокПолн": formatDocumentRequisites(data.authorityDocument),
        "РеквЛицГО": formatPartyInfo(data.personDetails),
    }
}
