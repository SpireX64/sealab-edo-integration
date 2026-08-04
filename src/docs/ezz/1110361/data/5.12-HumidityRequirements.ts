/**
 * Требования о соблюдении режима влажности
 * (ВлажнРеж, таб-5.12)
 */

export type THumidityRequirements = {
    /**
     * Нижний предел влажности, процент (от).
     * Обязателен при отсутствии {maxPercent}.
     */
    minPercent?: number

    /**
     * Верхний предел влажности, процент (до).
     * Обязателен при отсутствии {minPercent}.
     */
    maxPercent?: number
}

export function formatHumidityRequirements(data: THumidityRequirements) {
    if (data.minPercent == null && data.maxPercent == null) {
        throw new TypeError("Требуется указать minPercent или maxPercent")
    }

    return {
        "ВлажнНеНиже": data.minPercent?.toFixed(2),
        "ВлажнНеВыше": data.maxPercent?.toFixed(2),
    }
}
