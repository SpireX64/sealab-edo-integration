/**
 * Параметры транспортного средства
 * (ПарамТСТип, таб-5.38)
 */

export type TVehicleSpecs = {
    /** Тип (1-1000 символов) */
    type: string

    /** Марка (1-1000 символов) */
    brand: string

    /** Грузоподъемность, в тоннах (Число, 5.2) */
    loadCapacity: number

    /** Вместимость, в кубических метрах (Число, 4.2) */
    capacity: number
}

export function formatVehicleSpecs(data: TVehicleSpecs) {
    return {
        "Тип": data.type,
        "Марка": data.brand,
        "Грузопод": data.loadCapacity.toFixed(2),
        "Вместим": data.capacity.toFixed(2),
    }
}
