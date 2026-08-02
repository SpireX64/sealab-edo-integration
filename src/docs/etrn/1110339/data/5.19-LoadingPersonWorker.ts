/**
 * Работник лица, осуществляющего погрузку груза в транспортное средство
 * (РабЛицПогрГр, таб-5.19)
 */

import { formatPersonFullName, type TPersonFullName } from '../types';
import { formatSettlementDoc, type TSettlementDoc } from './5.45-SettlementDoc';

export type TLoadingPersonWorker = {
    /**
     * Должность.
     * (1-128 символов)
     */
    position: string

    /**
     * Фамилия, имя, отчество (при наличии).
     */
    fullName: TPersonFullName

    /**
     * Иные сведения, идентифицирующие физическое лицо.
     * (1-255 символов)
     */
    extra?: string

    /**
     * Основание полномочий (доверия): должностные обязанности.
     * По умолчанию "Должностные обязанности".
     * Может быть указано только ОДНО из полей: jobDuties или otherAuthorityDoc.
     * (1-255 символов)
     */
    jobDuties?: string

    /**
     * Основание полномочий (доверия): иные основания (документ).
     * Может быть указано только ОДНО из полей: jobDuties или otherAuthorityDoc.
     * (таб-5.45)
     */
    otherAuthorityDoc?: TSettlementDoc
}

export function formatLoadingPersonWorker(data: TLoadingPersonWorker) {
    if (data.jobDuties && data.otherAuthorityDoc) {
        throw new TypeError(
            "Должно быть указано только одно из полей: " +
            "jobDuties или otherAuthorityDoc"
        )
    }

    return {
        "Должность": data.position,
        "ФИО": formatPersonFullName(data.fullName),
        "ИныеСвед": data.extra,
        "ОДолжОб": data.jobDuties ?? "Должностные обязанности",
        "ОПИное": data.otherAuthorityDoc && formatSettlementDoc(data.otherAuthorityDoc),
    }
}
