/**
 * Контактные данные
 * (КонтактТип, таб-5.48)
 */

export type TContacts = {
    /** 
     * Номера телефона/факс
     * @throws {TypeError} Если указанный массив пустой
     */
    tel: string[]
    /** Адреса эл. почты */
    email?: string[]
    /** Иные контактные данные */
    extra?: string
}

export function formatContacts({ tel, email, extra }: TContacts) {
    if (tel.length < 1)
        throw new TypeError("Требуется указать хотя бы один контактный телефон")

    return {
        "Тлф": tel,
        "ЭлПочта": email,
        "ИнКонт": extra,
    }
}
