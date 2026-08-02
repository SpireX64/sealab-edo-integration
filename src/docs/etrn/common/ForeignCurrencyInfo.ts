/**
 * Сведения об иностранной валюте
 * (общий тип для документов ЭТрН)
 */

import { formatDate } from '../../../helpers'

export type TForeignCurrencyInfo = {
    /**
     * Код валюты по ОКВ.
     * (3 символа)
     */
    currencyCode: string

    /**
     * Наименование валюты по ОКВ.
     * (1-100 символов)
     */
    currencyName: string

    /**
     * Дата, на которую определяется курс валюты.
     */
    exchangeRateDate?: Date

    /**
     * Курс валюты.
     * (Число, 10.4)
     */
    exchangeRate?: number
}

export function formatForeignCurrencyInfo(data: TForeignCurrencyInfo | undefined) {
    if (!data) return {}
    return {
        "КодОКВ": data.currencyCode,
        "НаимОКВ": data.currencyName,
        "ДатаКурсВал": data.exchangeRateDate && formatDate(data.exchangeRateDate),
        "КурсВал": data.exchangeRate?.toFixed(4),
    }
}
