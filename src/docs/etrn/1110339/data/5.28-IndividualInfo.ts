/**
 * Сведения о физическом лице
 * (СвФЛТрНТип, таб-5.28)
 */

import { IssuerType } from '../consts'
import { formatPersonFullName } from '../types'
import type { TPersonFullName } from '../types'

export type TIndividualInfo = {
    type: IssuerType.Individual
    /** Фамилия, имя, отчество */
    name: string | TPersonFullName
    /** ИНН физического лица */
    inn: string
    /** Иные сведения, идентифицирующие физическое лицо */
    extra?: string
}

export function formatIndividualInfo(data: TIndividualInfo) {
    return {
        "СвФЛУчаст": {
            "ФИО": typeof data.name === "string"
                ? data.name
                : formatPersonFullName(data.name),
            "ИННФЛ": data.inn,
            "ИныеСвед": data.extra,
        }
    }
}
