/**
 * Идентифицирующие реквизиты сторон, составивших документ
 * (ИдРекСостТип, таб-5.17)
 *
 * Может быть только одно из указанных полей.
 */

import { IssuerType } from '../consts'
import { formatForeignEntityNotRegistered, type TForeignEntityNotRegistered } from './5.23-ForeignEntityNotRegistered';

export type TIssuerRequisites =
    | {
        issuerType: IssuerType.Individual | IssuerType.SoleProprietor

        /**
         * ИНН физического лица, в том числе
         * индивидуального предпринимателя.
         * (12 символов)
         */
        inn: string
    }
    | {
        issuerType: IssuerType.LegalEntity

        /**
         * ИНН организации, состоящей на учете в налоговом органе.
         * (10 символов)
         */
        inn: string
    }
    | {
        issuerType: IssuerType.ForeignEntity

        /**
         * Данные иностранной организации (иностранного гражданина),
         * не состоящей (его) на учете в налоговых органах.
         * (таб-5.23)
         */
        foreignEntity: TForeignEntityNotRegistered
    }
    | {
        issuerType: IssuerType.ExecutiveAuthority

        /**
         * Краткое наименование органа исполнительной власти
         * (специализированной уполномоченной организации),
         * выдавшего документ.
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
