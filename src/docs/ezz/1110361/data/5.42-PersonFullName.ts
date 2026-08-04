/**
 * Фамилия, имя, отчество
 * (ФИОТип, таб-5.42)
 */

export type TPersonFullName = {
    /** Имя */
    firstName: string;

    /** Фамилия */
    lastName: string;

    /** Отчество (при наличии) */
    middleName?: string | undefined;
}

/**
 * Форматирует ФИО в структуру с отдельными полями.
 */
export function formatPersonFullName({firstName, lastName, middleName}: TPersonFullName) {
    return {
        "Фамилия": lastName,
        "Имя": firstName,
        "Отчество": middleName,
    }
}
