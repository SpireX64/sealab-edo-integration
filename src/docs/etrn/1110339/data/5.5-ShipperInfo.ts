/**
 * Сведения о грузоотправителе
 * (СвГО, таб-5.5)
 */

import { formatPartyDetails, type TPartyDetails } from './5.29-PartyDetails';
import { formatSettlementDoc, type TSettlementDoc } from './5.45-SettlementDoc';

export type TShipperInfo = {
    /** Флаг, указывающий, что грузоотправитель является экспедитором */
    isForwarder?: boolean
    /** Реквизиты, позволяющие идентифицировать грузоотправителя */
    ident: TPartyDetails
    thirdPartySettlementDoc?: TSettlementDoc
}

export function formatShipperInfo({
    isForwarder,
    ident,
    thirdPartySettlementDoc,
}: TShipperInfo) {
    return {
        "ГОЭксп": Number(isForwarder),
        "РекИдентГО": formatPartyDetails(ident),
        "ОснРасчИным": thirdPartySettlementDoc && formatSettlementDoc(thirdPartySettlementDoc),
    }
}
