/**
 * Прицеп (полуприцеп)
 * (Прицеп, таб-9.8)
 */

export type TTrailer = {
    /**
     * Марка прицепа (полуприцепа).
     * (1-1000 символов)
     */
    brand: string

    /**
     * Модель прицепа (полуприцепа).
     * (1-1000 символов)
     */
    model: string

    /**
     * Государственный регистрационный номер прицепа (полуприцепа).
     * (1-9 символов)
     */
    registrationNumber: string
}

export function formatTrailer(data: TTrailer) {
    return {
        "Марка": data.brand,
        "Модель": data.model,
        "РегНомер": data.registrationNumber,
    }
}