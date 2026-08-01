/**
 * Дополнительные сведения о товаре, перевозка которого подлежит учету
 * в государственной информационной системе
 * (СвГосСист, таб-5.10)
 */

export type TGovSystemInfo = {
    /**
     * Наименование государственной системы
     * (1-255 символов)
     */
    systemName: string

    /**
     * Учетная единица в государственной системе
     * (1-255 символов)
     */
    accountingUnit?: string

    /**
     * Иная информация о товаре, подлежащем учету в государственной системе
     * (1-1000 символов)
     */
    extraInfo?: string

    /**
     * Идентификационный номер учетной единицы в государственной системе
     * (Массив строк, 1-255 символов каждая)
     */
    unitIds: string[]
}

export function formatGovSystemInfo({ systemName, accountingUnit, extraInfo, unitIds }: TGovSystemInfo) {
    return {
        "НаимГосСист": systemName,
        "УчетЕд": accountingUnit,
        "ИнаяИнф": extraInfo,
        "ИдНомУчетЕд": unitIds,
    }
}
