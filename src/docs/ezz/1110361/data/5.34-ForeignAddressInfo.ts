/**
 * Информация об адресе, в том числе об адресе за пределами
 * территории Российской Федерации
 * (АдрИнфТип, таб-5.34)
 */

export type TForeignAddressInfo = {
    /**
     * Код страны.
     * Принимает значение в соответствии с Общероссийским
     * классификатором стран мира (ОКСМ).
     * (3 символа)
     */
    countryCode: string

    /**
     * Адрес.
     * (1-1000 символов)
     */
    addressText: string
}

export function formatForeignAddressInfo(data: TForeignAddressInfo) {
    return {
        "КодСтр": data.countryCode,
        "АдрТекст": data.addressText,
    }
}
