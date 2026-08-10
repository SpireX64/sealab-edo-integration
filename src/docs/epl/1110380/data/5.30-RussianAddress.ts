/**
 * Сведения об адресе в Российской Федерации,
 * содержащиеся в ЕГРЮЛ
 * (АдрРФТип, таб-5.30)
 */

export type TRussianAddress = {
    /**
     * Почтовый индекс.
     * (6 символов)
     */
    postalCode: string

    /**
     * Код субъекта Российской Федерации.
     * Принимает значение в соответствии со справочником
     * «Коды субъектов Российской Федерации и иных территорий
     * Российской Федерации».
     * (2 символа)
     */
    regionCode: string

    /**
     * Район.
     * (1-255 символов)
     */
    district?: string

    /**
     * Город.
     * (1-255 символов)
     */
    city?: string

    /**
     * Населенный пункт.
     * (1-255 символов)
     */
    settlement?: string

    /**
     * Улица.
     * (1-255 символов)
     */
    street?: string

    /**
     * Дом.
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

    /**
     * Иные сведения об адресе в Российской Федерации.
     * (1-1000 символов)
     */
    otherInfo?: string
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
        "ИныеСвед": data.otherInfo,
    }
}