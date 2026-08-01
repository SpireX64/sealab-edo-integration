/**
 * Расчет и размер штрафа
 * (РазмШтр, таб-5.22)
 */

import { formatForeignCurrencyInfo } from '../types'
import type { TForeignCurrencyInfo } from '../types'

export type TPenaltyInfo = {
    /**
     * Фактическое количество единиц измерения для расчета штрафа
     * (фактическая база для расчета штрафа).
     * (1-255 символов)
     */
    actualUnitCount?: string

    /**
     * Итоговый размер штрафа в валюте Российской Федерации.
     * Обязателен при отсутствии {foreignAmount}.
     * (Число, 19.2)
     */
    rubAmount?: number

    /**
     * Сведения об иностранной валюте.
     * Заполняется в случае, если условиями договора предусмотрен
     * расчет штрафа в валюте, отличной от валюты Российской Федерации.
     */
    foreignCurrency?: TForeignCurrencyInfo

    /**
     * Итоговый размер штрафа в иностранной валюте.
     * Обязателен при отсутствии {rubAmount}.
     * (Число, 19.2)
     */
    foreignAmount?: number

    /**
     * Расчет штрафа.
     * (1-1000 символов)
     */
    calculation?: string
}

export function formatPenaltyInfo(data: TPenaltyInfo) {
    if (!data.rubAmount && !data.foreignAmount) {
        throw new TypeError(
            "Требуется указать итоговый размер штрафа в рублях или иностранной валюте"
        )
    }

    return {
        "ФактКолЕдИзм": data.actualUnitCount,
        "ИтогРазмШтрРФ": data.rubAmount?.toFixed(2),
        ...formatForeignCurrencyInfo(data.foreignCurrency),
        "ИтогРазмШтрИн": data.foreignAmount?.toFixed(2),
        "РасчШтр": data.calculation,
    }
}
