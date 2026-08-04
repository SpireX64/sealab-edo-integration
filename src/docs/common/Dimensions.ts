/**
 * Габариты груза
 * (ГабарТип)
 *
 * Общий тип для документов ЭТрН (1110339) и ЭЗЗ (1110361).
 */

export type TDimensions = {
    /**
     * Высота, в метрах.
     * (Число, 3 знака после запятой)
     */
    height: number

    /**
     * Длина, в метрах.
     * (Число, 3 знака после запятой)
     */
    length: number

    /**
     * Ширина, в метрах.
     * (Число, 3 знака после запятой)
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
