/**
 * Климатический режим перевозки
 * (КлимРеж, таб-5.14)
 */

import type { TRange } from '../types'

export type TClimateMode = {
    /** Диапазон температуры, градусов Цельсия (Число, 6.2) */
    temperature?: TRange

    /** Диапазон влажности, процент (Число, 5.2) */
    humidity?: TRange
}

export function formatClimateMode(data: TClimateMode) {
    return {
        "ТемпНеНиже": data.temperature?.min?.toFixed(2),
        "ТемпНеВыше": data.temperature?.max?.toFixed(2),
        "ВлажнНеНиже": data.humidity?.min?.toFixed(2),
        "ВлажнНеВыше": data.humidity?.max?.toFixed(2),
    }
}
