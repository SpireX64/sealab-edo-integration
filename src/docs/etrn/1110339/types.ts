/**
 * Общие типы и функции форматирования для документа ЭТрН 1110339,
 * не привязанные к конкретной таблице спецификации.
 */

// ─── TRange ────────────────────────────────────────────────

/** Диапазон значений (min/max) */
export type TRange = {
    /** Нижний предел */
    min?: number
    /** Верхний предел */
    max?: number
}

// ─── TPersonFullName ───────────────────────────────────────
// Реэкспорт общего типа из docs/etrn/common

export { type TPersonFullName, formatPersonFullName } from '../common/PersonFullName'

// ─── TForeignCurrencyInfo ──────────────────────────────────
// Реэкспорт общего типа из docs/etrn/common

export { type TForeignCurrencyInfo, formatForeignCurrencyInfo } from '../common/ForeignCurrencyInfo'


// ─── TAddress / Адреса ─────────────────────────────────────

import type { TRussianAddress } from '../common/RussianAddress'

export type { TRussianAddress }

/**
 * Адрес в Российской Федерации
 * (АдрРФТип, таб-5.51)
 *
 * Устаревший алиас для TRussianAddress.
 */
export type TRussianAddressInfo = TRussianAddress

import type { TForeignAddressInfo } from '../common/ForeignAddressInfo'

export type { TForeignAddressInfo }

export type TFiasId = string

export type TAddress =
    | TRussianAddressInfo
    | TForeignAddressInfo
    | TFiasId

export function formatAddress(address: TAddress) {
    if (typeof address === "string") {
        return { "КодГАР": address }
    }

    if ("countryCode" in address) {
        return {
            "КодСтр": address.countryCode,
            "АдрТекст": address.addressText,
        }
    }

    return {
        "Индекс": address.postalCode,
        "КодРегион": address.regionCode,
        "Район": address.district,
        "Город": address.city,
        "НаселПункт": address.settlement,
        "Улица": address.street,
        "Дом": address.house,
        "Корпус": address.building,
        "Кварт": address.apartment,
    }
}

