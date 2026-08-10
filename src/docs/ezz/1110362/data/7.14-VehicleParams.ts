/**
 * Параметры транспортного средства
 * (ПарамТСТип, таб-7.14)
 */

export type TVehicleParams = {
    /**
     * Тип.
     * (1-1000 символов)
     */
    type: string

    /**
     * Марка.
     * (1-1000 символов)
     */
    brand: string

    /**
     * Грузоподъемность, в тоннах.
     * (Число, 5.2)
     */
    capacityTons: number

    /**
     * Вместимость, в кубических метрах.
     * (Число, 5.2)
     */
    capacityCubicMeters: number
}

export function formatVehicleParams(data: TVehicleParams) {
    return {
        "Тип": data.type,
        "Марка": data.brand,
        "Грузопод": data.capacityTons.toFixed(2),
        "Вместим": data.capacityCubicMeters.toFixed(2),
    }
}