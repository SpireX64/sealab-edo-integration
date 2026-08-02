/**
 * Идентифицирующие реквизиты сторон, составивших документ
 * (ИдРекСостТип, таб-7.11)
 *
 * Может быть только одно из указанных полей.
 */

import { IssuerType } from '../../common/IssuerType'
import { formatForeignEntityNotRegistered } from '../../common/ForeignEntityNotRegistered'
import type { TForeignEntityNotRegistered } from '../../common/ForeignEntityNotRegistered'

export type TIssuerRequisites =
    | {
        issuerType: IssuerType.Individual | IssuerType.SoleProprietor

        /**
         * ИНН физического лица, в том числе индивидуального предпринимателя.
         * (1-12 символов)
         */
        inn: string
    }
    | {
        issuerType: IssuerType.LegalEntity

        /**
         * ИНН юридического лица.
         * (1-10 символов)
         */
        inn: string
    }
    | {
        issuerType: IssuerType.ForeignEntity

        /**
         * Данные иностранного лица, не состоящего на учете
         * в налоговых органах в качестве налогоплательщика.
         * (таб-7.10)
         */
        foreignEntity: TForeignEntityNotRegistered
    }
    | {
        issuerType: IssuerType.ExecutiveAuthority

        /**
         * Краткое наименование органа исполнительной власти
         * (специализированной уполномоченной организации), выдавшего документ.
         * (1-255 символов)
         */
        name: string
    }

export function formatIssuerRequisites(data: TIssuerRequisites) {
    switch (data.issuerType) {
        case IssuerType.Individual:
        case IssuerType.SoleProprietor:
            return { "ИННФЛ": data.inn }

        case IssuerType.LegalEntity:
            return { "ИННЮЛ": data.inn }

        case IssuerType.ForeignEntity:
            return { "ДаннИно": formatForeignEntityNotRegistered(data.foreignEntity) }

        case IssuerType.ExecutiveAuthority:
            return { "НаимОИВ": data.name }
    }
}
