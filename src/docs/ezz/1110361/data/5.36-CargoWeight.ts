/**
 * Масса грузовых мест
 * (таб-5.36)
 */

export type TCargoWeight = {
    /**
     * Масса нетто груза в килограммах.
     * (Число, 17.3)
     */
    netWeight?: number

    /**
     * Масса брутто груза в килограммах.
     * (Число, 17.3)
     */
    grossWeight: number

    /**
     * Масса тары в килограммах.
     * Заполняется при перевозке наливных или насыпных грузов.
     * (Число, 17.3)
     */
    tareWeight?: number
}

export function formatCargoWeight(data: TCargoWeight) {
    return {
        "МасНетЗнач": data.netWeight?.toFixed(3),
        "МасБрутЗнач": data.grossWeight.toFixed(3),
        "КолПалл": data.tareWeight?.toFixed(3),
    }
}
