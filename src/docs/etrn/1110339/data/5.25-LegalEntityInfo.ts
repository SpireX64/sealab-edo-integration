/**
 * Сведения о юридическом лице, состоящем на учете в налоговых органах
 * (СвЮЛУчТрНТип, таб-5.25)
 */

import { IssuerType } from '../consts'

export type TLegalEntityInfo = {
    type: IssuerType.LegalEntity
    /** Наименование организации */
    name: string
    /** ИНН организации */
    inn: string
    /** КПП организации */
    kpp?: string | undefined
}

export function formatLegalEntityInfo(data: TLegalEntityInfo) {
    return {
        "СвЮЛУч": {
            "НаимОрг": data.name,
            "ИННЮЛ": data.inn,
            "КПП": data.kpp,
        }
    }
}
