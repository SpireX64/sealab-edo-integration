/**
 * Сведения о лице, осуществляющем погрузку груза в транспортное средство
 * (СвЛицПогрГр, таб-5.18)
 */

import { formatFlag } from '../../../../helpers'
import { formatPartyDetails } from './5.29-PartyDetails'
import type { TPartyDetails } from './5.29-PartyDetails'
import { formatSettlementDoc } from './5.45-SettlementDoc'
import type { TSettlementDoc } from './5.45-SettlementDoc'
import { formatLoadingPersonWorker } from './5.19-LoadingPersonWorker'
import type { TLoadingPersonWorker } from './5.19-LoadingPersonWorker'
import { formatIssuerIdentity } from './5.36-IssuerIdentity'
import type { TIssuerIdentity } from './5.36-IssuerIdentity'

export type TLoadingPersonInfo =
    | {
        /**
         * Лицо, осуществляющее погрузку, является грузоотправителем.
         * 1 – совпадает с грузоотправителем.
         */
        matchesShipper: true

        /**
         * Идентифицирующий реквизит грузоотправителя.
         * (таб-5.36)
         */
        shipperIdentity: TIssuerIdentity
    }
    | {
        /**
         * Лицо, осуществляющее погрузку, не является грузоотправителем.
         * 2 – не совпадает с грузоотправителем.
         */
        matchesShipper: false

        /**
         * Реквизиты лица, осуществляющего погрузку груза в транспортное средство.
         * (таб-5.29)
         */
        personDetails: TPartyDetails

        /**
         * Основание, по которому лицо осуществляет погрузку груза в транспортное средство.
         * (таб-5.45)
         */
        authorityDoc: TSettlementDoc

        /**
         * Работник лица, осуществляющего погрузку груза в транспортное средство.
         * (таб-5.19)
         */
        worker: TLoadingPersonWorker
    }

export function formatLoadingPersonInfo(data: TLoadingPersonInfo) {
    if (data.matchesShipper) {
        return {
            "СовпГОП": formatFlag(data.matchesShipper, 1),
            "ИдентРекГО": formatIssuerIdentity(data.shipperIdentity),
        }
    }

    return {
        "СовпГОП": formatFlag(data.matchesShipper, 1),
        "РекЛицПогрГр": formatPartyDetails(data.personDetails),
        "ОснПогрГр": formatSettlementDoc(data.authorityDoc),
        "РабЛицПогрГр": formatLoadingPersonWorker(data.worker),
    }
}
