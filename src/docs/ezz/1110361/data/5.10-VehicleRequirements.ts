/**
 * Параметры транспортного средства, необходимые
 * для осуществления перевозки груза
 * (ПарТСПрвз, таб-5.10)
 */

export type TVehicleRequirements = {
    /**
     * Тип транспортного средства.
     * (1-1000 символов)
     */
    vehicleType: string

    /**
     * Грузоподъемность, в тоннах.
     */
    capacityTons: number

    /**
     * Вместимость, в кубических метрах.
     */
    capacityCubicMeters: number

    /**
     * Тип погрузки.
     * (1-1000 символов)
     */
    loadingType?: string

    /**
     * Тип кузова.
     * (1-1000 символов)
     */
    bodyType?: string

    /**
     * Другие необходимые параметры.
     * (1-1000 символов)
     */
    otherParameters?: string
}

export function formatVehicleRequirements(data: TVehicleRequirements) {
    return {
        "Тип": data.vehicleType,
        "Грузопод": data.capacityTons.toFixed(2),
        "Вместим": data.capacityCubicMeters.toFixed(2),
        "ТипПогр": data.loadingType,
        "ТипКуз": data.bodyType,
        "ДрПарам": data.otherParameters,
    }
}
