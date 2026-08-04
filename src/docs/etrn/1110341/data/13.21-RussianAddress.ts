/**
 * Адрес в Российской Федерации
 * (АдрРФТип, таб-13.21)
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
     * Дом.
     * (1-20 символов)
     */
    building?: string

    /**
     * Корпус.
     * (1-20 символов)
     */
    block?: string

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
        "Дом": data.building,
        "Корпус": data.block,
        "Кварт": data.apartment,
    }
}
