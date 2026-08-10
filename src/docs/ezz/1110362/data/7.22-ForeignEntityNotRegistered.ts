/**
 * Сведения об иностранной организации (иностранном гражданине),
 * не состоящей (ем) на учете в налоговых органах
 * (СвИнНеУчТип, таб-7.22)
 */

import { formatForeignPersonIdDocument, type TForeignPersonIdDocument } from './7.24-ForeignPersonIdDocument';

export type TForeignEntityNotRegistered = {
    /**
     * Идентификация статуса.
     * true — иностранная организация (ИО),
     * false — иностранный гражданин (ИГ).
     */
    isOrganization: boolean

    /**
     * Страна.
     * Обязателен для иностранной организации.
     * (1-255 символов)
     */
    country?: string

    /**
     * Наименование иностранной организации полное /
     * Фамилия, имя, отчество (при наличии) иностранного гражданина.
     * Обязателен для иностранного гражданина.
     * (1-1000 символов)
     */
    name?: string

    /**
     * Идентификатор иностранной организации (иностранного гражданина).
     * Обязателен для иностранной организации при отсутствии
     * наименования и иных сведений.
     * (1-255 символов)
     */
    identifier?: string

    /**
     * Иные сведения, идентифицирующие иностранную организацию
     * (иностранного гражданина).
     * Обязателен для иностранной организации при отсутствии
     * идентификатора и наименования.
     * (1-255 символов)
     */
    otherInfo?: string

    /**
     * Данные документа, удостоверяющего личность
     * иностранного гражданина.
     * Обязателен для иностранного гражданина.
     * (таб-7.24)
     */
    identityDocument?: TForeignPersonIdDocument
}

export function formatForeignEntityNotRegistered(data: TForeignEntityNotRegistered) {
    if (data.isOrganization) {
        if (!data.name && !data.identifier && !data.otherInfo) {
            throw new TypeError(
                "Для иностранной организации требуется указать наименование, идентификатор или иные сведения"
            )
        }
    } else {
        if (!data.name) {
            throw new TypeError(
                "Для иностранного гражданина требуется указать наименование (ФИО)"
            )
        }
        if (!data.identityDocument) {
            throw new TypeError(
                "Для иностранного гражданина требуется указать документ, удостоверяющий личность"
            )
        }
    }

    return {
        "ИдСтат": data.isOrganization ? "ИО" : "ИГ",
        "Стран": data.isOrganization ? data.country : undefined,
        "Наим": data.name,
        "Идентиф": data.identifier,
        "ИныеСвед": data.otherInfo,
        "УдЛичнИГ": data.identityDocument && formatForeignPersonIdDocument(data.identityDocument),
    }
}