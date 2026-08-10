/**
 * Сведения о номере адресного элемента
 * (НомерТип, таб-7.31)
 */

export type TAddressElementNumber = {
    /**
     * Тип элемента.
     * (1-50 символов)
     */
    elementType: string

    /**
     * Номер элемента.
     * (1-255 символов)
     */
    elementNumber: string
}

export function formatAddressElementNumber(data: TAddressElementNumber) {
    return {
        "Тип": data.elementType,
        "Номер": data.elementNumber,
    }
}