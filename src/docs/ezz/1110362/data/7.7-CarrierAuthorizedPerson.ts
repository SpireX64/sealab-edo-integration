/**
 * Сведения о лице, уполномоченном перевозчиком
 * на заполнение и подписание заказа и заявки
 * (СвЛицПрв, таб-7.7)
 */

import { formatDocumentRequisites, type TDocumentRequisites } from './7.15-DocumentRequisites';
import { formatPartyInfo, type TPartyInfo } from './7.17-PartyInfo';

export type TCarrierAuthorizedPerson = {
    /**
     * Реквизиты доверенности перевозчика уполномоченному лицу
     * на заполнение и подписание заказа и заявки.
     * (таб-7.15)
     */
    authorityDocument: TDocumentRequisites

    /**
     * Реквизиты уполномоченного лица.
     * (таб-7.17)
     */
    personDetails: TPartyInfo
}

export function formatCarrierAuthorizedPerson(data: TCarrierAuthorizedPerson) {
    return {
        "РеквДовер": formatDocumentRequisites(data.authorityDocument),
        "РеквЛицПрв": formatPartyInfo(data.personDetails),
    }
}
