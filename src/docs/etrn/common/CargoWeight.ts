/**
 * Масса груза
 * (МассаТип, общий тип для документов ЭТрН)
 *
 * Используется в таб-5.41 (1110339) и таб-13.14 (1110341).
 */

export type TCargoWeight = {
    /**
     * Масса нетто груза в килограммах.
     * (Число, 17.3)
     */
    net?: number

    /**
     * Масса брутто груза в килограммах.
     * (Число, 17.3)
     */
    gross: number

    /**
     * Количество паллет.
     */
    palletCount?: number
}

export function formatCargoWeight(data: TCargoWeight) {
    return {
        "МасНетЗнач": data.net?.toFixed(3),
        "МасБрутЗнач": data.gross.toFixed(3),
        "КолПалл": data.palletCount != null ? String(data.palletCount) : undefined,
    }
}
