/** Сумма налога (таб-17.5): число либо явное освобождение от НДС. */
export type TTaxAmount = { amount: number; withoutVat?: never } | { amount?: never; withoutVat: true }
export function formatTaxAmount(data: TTaxAmount) {
    if (data?.withoutVat === true && data.amount === undefined) return { "БезНДС": ["без НДС"] }
    if (data && data.withoutVat === undefined && typeof data.amount === 'number' && Number.isFinite(data.amount)) return { "СумНДС": [data.amount.toFixed(2)] }
    throw new TypeError("Укажите фактическую сумму НДС или явное отсутствие НДС")
}
