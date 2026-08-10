/**
 * Фамилия, имя, отчество физического лица
 * (ФИОТип)
 *
 * Общий тип для документов ЭТрН (1110339, 1110340, 1110341),
 * ЭЗЗ (1110361, 1110362) и ЭПЛ (1110381, 1110382).
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
 * Форматирует ФИО в строку «Фамилия Имя Отчество».
 * Используется в 1110339 (таб-5.15, 5.19, 5.23, 5.26, 5.28).
 */
export function formatPersonFullName({firstName, lastName, middleName}: TPersonFullName) {
    const name = `${lastName} ${firstName}`
    return middleName ? `${name} ${middleName}` : name
}

/**
 * Форматирует ФИО в структуру с отдельными полями.
 * Используется в 1110340 (таб-7.8, 7.16), 1110341 (13.9)
 * и ЭЗЗ 1110361 (5.13, 5.15, 5.21, 5.24).
 */
export function formatPersonFullNameFields({firstName, lastName, middleName}: TPersonFullName) {
    return {
        "Фамилия": lastName,
        "Имя": firstName,
        "Отчество": middleName,
    }
}
