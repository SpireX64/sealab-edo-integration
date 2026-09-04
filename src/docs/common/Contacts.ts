/**
 * Контактные данные
 * (КонтактТип)
 *
 * Общий тип для документов ЭТрН (1110339) и ЭЗЗ (1110361).
 */

export type TContacts = {
    /**
     * Номер контактного телефона/факс.
     * (1-255 символов, массив)
     */
    phones: string[]

    /**
     * Адрес электронной почты.
     * (1-255 символов, массив)
     */
    emails?: string[]

    /**
     * Иные контактные данные.
     * (1-255 символов)
     */
    otherContacts?: string
}

export function formatContacts(data: TContacts) {
    if (data.phones.length === 0) {
        throw new TypeError("Требуется указать хотя бы один номер телефона")
    }

    return {
        "Тлф": data.phones,
        "ЭлПочта": data.emails?.length ? data.emails : undefined,
        "ИнКонт": data.otherContacts ? [data.otherContacts] : undefined,
    }
}
