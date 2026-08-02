/**
 * Сведения об индивидуальном предпринимателе
 * (СвИПТрНТип, таб-5.26)
 */

import { IssuerType } from '../consts'
import { formatPersonFullName, type TPersonFullName } from '../types';

export type TSoleProprietorInfo = {
    type: IssuerType.SoleProprietor
    /** ФИО */
    name: TPersonFullName | string
    /** ИНН физ.лица */
    inn: string
    /** ОГРН (Основной государственный регистрационный номер индивидуального предпринимателя) */
    ogrn?: string | undefined
    /** Иные сведения, идентифицирующие физическое лицо */
    extra?: string | undefined
}

export function formatSoleProprietorInfo(data: TSoleProprietorInfo) {
    return {
        "СвИП": {
            "ФИО": typeof data.name === "string"
                ? data.name
                : formatPersonFullName(data.name),
            "ИННФЛ": data.inn,
            "ОГРНИП": data.ogrn,
            "ИныеСвед": data.extra,
        }
    }
}
