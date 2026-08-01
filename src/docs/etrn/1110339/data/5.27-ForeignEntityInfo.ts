/**
 * Сведения об иностранном лице, не состоящем на учете в налоговых органах
 * в качестве налогоплательщика
 * (СвИнНеУчТрНТип, таб-5.27)
 */

import { IssuerType } from '../consts'
import { formatPersonFullName } from '../types'
import type { TPersonFullName } from '../types'
import { formatForeignPersonIdDocument } from './5.46-ForeignPersonIdDocument'
import type { TForeignPersonIdDocument } from './5.46-ForeignPersonIdDocument'

export type TForeignEntityInfo = {
    type: IssuerType.ForeignEntity
} & (
    | {
        /** Является юр. лицом */
        legalEntity: true
        /** Страна */
        country: string
        /** Наименование юридического лица */
        name: string
        /** Идентификатор иностранного лица */
        id: string
        /** Иные сведения, идентифицирующие иностранное лицо */
        extra: string
    }
    | {
        /** Является физ. лицом */
        legalEntity: false
        country?: string | undefined
        /** Фамилия, имя, отчество (при наличии) физического лица */
        name: string | TPersonFullName
        /** 
         * Идентификатор иностранного лица.
         * Требуется при отсутствии {name} и {extra}
         */
        id?: string | undefined
        /**
         * Данные документа, удостоверяющего личность иностранного физического лица.
         * (таб-5.46)
         */
        idDocument: TForeignPersonIdDocument
        /** 
         * Иные сведения, идентифицирующие иностранное лицо
         * Требуется при отсутствии {name} и {id}
         */
        extra?: string
    }
)

export function formatForeignEntityInfo(data: TForeignEntityInfo) {
    if (!data.legalEntity) {
        if (!data.id && !data.extra) {
            throw new TypeError(
                "Требуется указать идентификатор (id) или иные сведения (extra) " +
                "для иностранного физического лица"
            )
        }
    }

    return {
        "СвИнНеУч": {
            "ИдСтат": data.legalEntity ? 'ЮЛ' : 'ФЛ',
            "Идентив": data.id,
            "Стран": data.country,
            "Наим": typeof data.name === 'string'
                ? data.name
                : formatPersonFullName(data.name),
            "УдЛичнИнФЛ": data.legalEntity ? undefined : formatForeignPersonIdDocument(data.idDocument),
            "ИныеСвед": data.extra,
        }
    }
}
