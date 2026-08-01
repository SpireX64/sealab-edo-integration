/**
 * Объявленная стоимость (ценность) груза
 * (ЦеннГрузТип, таб-5.40)
 */

export type TDeclaredValueInfo = {
    /**
     * Стоимость (ценность) груза с налогом — всего
     * (Число, 19.2)
     */
    amount: number

    /**
     * Валюта стоимости (ценности): код по ОКВ
     * (3 символа)
     */
    currencyCode?: string

    /**
     * Валюта стоимости (ценности): наименование по ОКВ
     * Формируется согласно указанному коду валюты.
     * (1-100 символов)
     */
    currencyName: string
}

export function formatDeclaredValueInfo(data: TDeclaredValueInfo) {
    return {
        "СтЦеннГр": data.amount.toFixed(2),
        "КодОКВ": data.currencyCode,
        "НаимОКВ": data.currencyName,
    }
}
