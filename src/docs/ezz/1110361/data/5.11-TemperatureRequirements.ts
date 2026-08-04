/**
 * Требования о соблюдении температурного режима перевозки
 * (ТемпРеж, таб-5.11)
 */

export type TTemperatureRequirements = {
    /**
     * Нижний предел температуры, градусов Цельсия (от).
     * Обязателен при отсутствии {maxCelsius}.
     */
    minCelsius?: number

    /**
     * Верхний предел температуры, градусов Цельсия (до).
     * Обязателен при отсутствии {minCelsius}.
     */
    maxCelsius?: number
}

export function formatTemperatureRequirements(data: TTemperatureRequirements) {
    if (data.minCelsius == null && data.maxCelsius == null) {
        throw new TypeError("Требуется указать minCelsius или maxCelsius")
    }

    return {
        "ТемпНеНиже": data.minCelsius?.toFixed(2),
        "ТемпНеВыше": data.maxCelsius?.toFixed(2),
    }
}
