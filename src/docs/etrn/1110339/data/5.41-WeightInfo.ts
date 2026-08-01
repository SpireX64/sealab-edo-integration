/**
 * Масса груза
 * (МассаТип, таб-5.41)
 */

export type TWeightInfo = {
    /**
     * Масса нетто груза в килограммах
     * (Число, 17.3)
     */
    net?: number

    /**
     * Масса брутто груза в килограммах
     * (Число, 17.3)
     */
    gross: number

    /**
     * Количество паллет
     * (Число, 4)
     */
    palletCount?: number
}

export function formatWeightInfo(data: TWeightInfo) {
    return {
        "МасНетЗнач": data.net?.toFixed(3),
        "МасБрутЗнач": data.gross.toFixed(3),
        "КолПал": data.palletCount != null ? String(data.palletCount) : undefined,
    }
}
