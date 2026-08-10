/**
 * Фамилия, имя, отчество физического лица
 * (ФИОТип, таб-7.14)
 */

export type TPersonFullName = {
    /**
     * Фамилия.
     * (1-60 символов)
     */
    lastName: string

    /**
     * Имя.
     * (1-60 символов)
     */
    firstName: string

    /**
     * Отчество.
     * (1-60 символов)
     */
    middleName?: string
}

export function formatPersonFullNameFields(data: TPersonFullName) {
    return {
        "Фамилия": data.lastName,
        "Имя": data.firstName,
        "Отчество": data.middleName,
    }
}