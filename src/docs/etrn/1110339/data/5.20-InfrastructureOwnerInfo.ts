/**
 * Сведения о владельце объекта инфраструктуры пункта погрузки
 * (ВладИнфр, таб-5.20)
 */

import {
    InfraOwnerMatchesShipper,
    formatInfrastructureOwnerMatchesShipper,
} from '../consts'
import { formatPartyDetails, type TPartyDetails } from './5.29-PartyDetails';
import { formatIssuerIdentity, type TIssuerIdentity } from './5.36-IssuerIdentity';

export type TInfrastructureOwnerInfo =
    | {
        /**
         * Владелец инфраструктуры совпадает с грузоотправителем.
         * 1 – совпадает.
         */
        matchesShipper: InfraOwnerMatchesShipper.Matches

        /**
         * Идентифицирующий реквизит грузоотправителя.
         * (таб-5.36)
         */
        shipperIdentity: TIssuerIdentity
    }
    | {
        /**
         * Владелец инфраструктуры не совпадает с грузоотправителем.
         * 2 – не совпадает.
         */
        matchesShipper: InfraOwnerMatchesShipper.NotMatches

        /**
         * Реквизиты владельца объекта инфраструктуры пункта погрузки.
         * (таб-5.29)
         */
        ownerRequisites: TPartyDetails
    }
    | {
        /**
         * Владелец инфраструктуры неизвестен.
         * 3 – не совпадает, владелец неизвестен.
         */
        matchesShipper: InfraOwnerMatchesShipper.Unknown

        /**
         * Обстоятельства, являющиеся причиной отсутствия информации
         * о владельце инфраструктуры пункта погрузки.
         * (1-1000 символов)
         */
        noInfoReason: string
    }

export function formatInfrastructureOwnerInfo(data: TInfrastructureOwnerInfo) {
    switch (data.matchesShipper) {
        case InfraOwnerMatchesShipper.Matches:
            return {
                "СовпГОВ": formatInfrastructureOwnerMatchesShipper(data.matchesShipper),
                "ИдентРекГО": formatIssuerIdentity(data.shipperIdentity),
            }

        case InfraOwnerMatchesShipper.NotMatches:
            return {
                "СовпГОВ": formatInfrastructureOwnerMatchesShipper(data.matchesShipper),
                "РекВладИнф": formatPartyDetails(data.ownerRequisites),
            }

        case InfraOwnerMatchesShipper.Unknown:
            return {
                "СовпГОВ": formatInfrastructureOwnerMatchesShipper(data.matchesShipper),
                "ОбНетИнфОВлад": data.noInfoReason,
            }
    }
}
