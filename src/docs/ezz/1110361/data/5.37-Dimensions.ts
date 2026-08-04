/**
 * Габариты груза
 * (ГабарТип, таб-5.37)
 */

export type TDimensions = {
    /**
     * Высота, в метрах.
     * (Число, 5.3)
     */
    height: number

    /**
     * Длина, в метрах.
     * (Число, 5.3)
     */
    length: number

    /**
     * Ширина, в метрах.
     * (Число, 5.3)
     */
    width: number
}

export function formatDimensions(data: TDimensions) {
    return {
        "ВысЗнач": data.height.toFixed(3),
        "ДлЗнач": data.length.toFixed(3),
        "ШирЗнач": data.width.toFixed(3),
    }
}
