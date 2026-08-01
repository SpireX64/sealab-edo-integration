/**
 * Габариты груза
 * (ГабарТип, таб-5.39)
 */

export type TDimensionsInfo = {
    /**
     * Высота, в метрах
     * (Число, 17.3)
     */
    height: number

    /**
     * Длина, в метрах
     * (Число, 17.3)
     */
    length: number

    /**
     * Ширина, в метрах
     * (Число, 17.3)
     */
    width: number
}

export function formatDimensionsInfo(data: TDimensionsInfo) {
    return {
        "ВысЗнач": data.height.toFixed(3),
        "ДлЗнач": data.length.toFixed(3),
        "ШирЗнач": data.width.toFixed(3),
    }
}
