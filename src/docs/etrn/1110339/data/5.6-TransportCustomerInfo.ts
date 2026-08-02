/**
 * Сведения о заказчике услуг по организации перевозки груза
 * (СвЗак, таб-5.6)
 */

import { formatPartyDetails, type TPartyDetails } from './5.29-PartyDetails';
import { formatSettlementDoc, type TSettlementDoc } from './5.45-SettlementDoc';

export type TTransportCustomerInfo = {
    /** 
     * Реквизиты, позволяющие идентифицировать заказчика услуг,
     * связанных с перевозкой груза
     */
    ident: TPartyDetails;

    /**
     * Реквизиты договора на выполнение услуг
     * по организации перевозки груза
     */
    contract: TSettlementDoc;
}

export function formatTransportCustomerInfo({ ident, contract }: TTransportCustomerInfo) {
    return {
        "РекИдентЗак": formatPartyDetails(ident),
        "ДогУслПер":  formatSettlementDoc(contract),
    }
}
