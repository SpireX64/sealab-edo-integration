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

export type TPersonFullName = {
    firstName: string;
    lastName: string;
    middleName?: string | undefined;
}

export function formatPersonFullName({firstName, lastName, middleName}: TPersonFullName) {
    const name = `${lastName} ${firstName}`
    return middleName ? `${name} ${middleName}` : name
}

// ─── TForeignCurrencyInfo ──────────────────────────────────
// Реэкспорт общего типа из docs/etrn/common

export { type TForeignCurrencyInfo, formatForeignCurrencyInfo } from '../common/ForeignCurrencyInfo'


// ─── TAddress / Адреса ─────────────────────────────────────

/**
 * Адрес в Российской Федерации
 * (АдрРФТип, таб-5.51)
 */
export type TRussianAddressInfo = {
    /** Индекс */
    postalCode: string
    /** Код региона */
    regionCode: string // (2 символа)
    /** Район */
    district?: string
    /** Город */
    city?: string
    /** Населенный пункт */
    settlement?: string
    /** Улица */
    street?: string
    /** Номер дома  */
    house?: string
    /** Корпус */
    building?: string
    /** Номер квартиры */
    apartment?: string
}

/**
 * Информация об адресе, в том числе об адресе за пределами территории Российской Федерации
 * (АдрИнфТип, таб-5.52)
 */
export type TGenericAddressInfo = {
    /** Код страны */
    countryCode: string // 3 символа
    /** Полный адрес текстом */
    addressText: string // 1000 символов
}

export type TFiasId = string

export type TAddress =
    | TRussianAddressInfo
    | TGenericAddressInfo
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

