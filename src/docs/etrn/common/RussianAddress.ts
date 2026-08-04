/**
 * Адрес в Российской Федерации
 * (АдрРФТип)
 *
 * Общий тип для документов 1110339 (таб-5.51) и 1110341 (таб-13.21).
 */

export type TRussianAddress = {
    /**
     * Индекс.
     * (6 символов)
     */
    postalCode: string

    /**
     * Код региона.
     * (2 символа)
     */
    regionCode: string

    /**
     * Район.
     * (1-50 символов)
     */
    district?: string

    /**
     * Город.
     * (1-50 символов)
     */
    city?: string

    /**
     * Населенный пункт.
     * (1-50 символов)
     */
    settlement?: string

    /**
     * Улица.
     * (1-50 символов)
     */
    street?: string

    /**
     * Номер дома.
     * (1-20 символов)
     */
    house?: string

    /**
     * Корпус.
     * (1-20 символов)
     */
    building?: string

    /**
     * Квартира.
     * (1-20 символов)
     */
    apartment?: string
}

export function formatRussianAddress(data: TRussianAddress) {
    return {
        "Индекс": data.postalCode,
        "КодРегион": data.regionCode,
        "Район": data.district,
        "Город": data.city,
        "НаселПункт": data.settlement,
        "Улица": data.street,
        "Дом": data.house,
        "Корпус": data.building,
        "Кварт": data.apartment,
    }
}
