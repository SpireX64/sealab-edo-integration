/**
 * Информация об адресе, в том числе об адресе
 * за пределами территории Российской Федерации
 * (АдрИнфТип)
 *
 * Общий тип для документов 1110339 (таб-5.52) и 1110341 (таб-13.22).
 */

export type TForeignAddressInfo = {
    /**
     * Код страны.
     * Принимает значение в соответствии с Общероссийским
     * классификатором стран мира.
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
