/**
 * Размер платы за перевозку и (или) порядок расчетов
 * (РазмПлатРасчет, таб-7.9)
 */

import { TaxRate, formatTaxRate } from '../consts'

export type TPaymentInfo = {
    /**
     * Стоимость перевозки без налога – всего.
     * Обязателен при отсутствии {calculation}.
     * (Число, 19.2)
     */
    costWithoutTax?: number

    /**
     * Налоговая ставка.
     * Обязателен при наличии {costWithoutTax} или {costWithTax}.
     */
    taxRate?: TaxRate

    /**
     * Стоимость перевозки с налогом – всего.
     * (Число, 19.2)
     */
    costWithTax?: number

    /**
     * Порядок (механизм) расчета (исчислений) платы.
     * Обязателен при отсутствии {costWithoutTax}.
     * (1-2000 символов)
     */
    calculation?: string
}

export function formatPaymentInfo(data: TPaymentInfo) {
    if (data.costWithoutTax == null && !data.calculation) {
        throw new TypeError(
            "Требуется указать costWithoutTax или calculation"
        )
    }

    if ((data.costWithoutTax != null || data.costWithTax != null) && !data.taxRate) {
        throw new TypeError(
            "Требуется указать taxRate при наличии costWithoutTax или costWithTax"
        )
    }

    return {
        "КодОКВ": "643",
        "ВалНаим": "Российский рубль",
        "СтТовБезНДС": data.costWithoutTax?.toFixed(2),
        "НалСт": data.taxRate && formatTaxRate(data.taxRate),
        "СтТовУчНал": data.costWithTax?.toFixed(2),
        "Расчет": data.calculation,
    }
}
