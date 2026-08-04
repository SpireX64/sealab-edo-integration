/**
 * Контактные данные
 * (КонтактТип, таб-5.39)
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
        "ИнКонт": data.otherContacts,
    }
}
