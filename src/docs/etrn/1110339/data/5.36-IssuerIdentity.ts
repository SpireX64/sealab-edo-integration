/**
 * Идентифицирующие реквизиты сторон, составивших документ
 * (ИдРекСостТип, таб-5.36)
 */

import { IssuerType } from '../consts'

export type TForeignIssuerIdentity = {
    /** Является юридическим лицом */
    legalEntity: boolean

    /** Страна */
    country: string;

    /** Наименование юр.лица или ФИО физ.лица */
    name?: string;

    /** 
     * Идентификатор.
     * Требуется для юр.лиц, а так же при отсутствии значения поля "name".
     */
    id?: string
}

export type TIssuerIdentity = 
    | {
        type: IssuerType.Individual | IssuerType.SoleProprietor
        /**
         * ИНН физического лица,
         * в том числе индивидуального предпринимателя
         */
        id: string
    }
    | {
        /** ИНН юридического лица */
        type: IssuerType.LegalEntity
        id: string
    }
    | {
        type: IssuerType.ForeignEntity
        /**
         * Данные иностранного лица, не состоящего на учете
         * в налоговых органах в качестве налогоплательщика
         */
        id: TForeignIssuerIdentity
    }
    | {
        type: IssuerType.ExecutiveAuthority
        /** 
         * Краткое наименование органа исполнительной власти
         * (специализированной уполномоченной организации), выдавшего документ
         */
        id: string
    }

export function formatIssuerIdentity(issuer: TIssuerIdentity) {
    switch (issuer.type) {
        case IssuerType.Individual:
        case IssuerType.SoleProprietor:
            return { "ИННФЛ": [issuer.id] }

        case IssuerType.LegalEntity:
            return { "ИННЮЛ": [issuer.id] }

        case IssuerType.ExecutiveAuthority:
            return { "НаимОИВ": [issuer.id] }

        case IssuerType.ForeignEntity: {
            const { legalEntity, name, country, id } = issuer.id;

            if (legalEntity) {
                if (!id || !name) {
                    throw new TypeError("Требуется наименование и идентификатор иностранного юр.лица")
                }
            } else {
                if (!id && !name) {
                    throw new TypeError("Требуется указать имя или идентификатор иностранного физ.лица")
                }
            }

            return { 
                "ДаннИно": {
                    "ИдСтат": legalEntity ? 'ЮЛ' : 'ФЛ',
                    "Стран": country,
                    "Наим": name,
                    "Идентиф": id,
                },
            };
        }
    }
}
