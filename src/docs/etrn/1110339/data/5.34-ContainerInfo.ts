/**
 * Сведения о контейнерах
 * (СвКонтейнТип, таб-5.34)
 */

export type TContainerInfo = {
    /**
     * Количество контейнеров.
     * (Число, 2)
     */
    count: number

    /**
     * Идентификационные номера контейнеров.
     * Количество должно совпадать с {count}.
     * (Массив строк, 1-255 символов каждая)
     */
    ids: string[]
}

export function formatContainerInfo(data: TContainerInfo) {
    if (data.ids.length !== data.count) {
        throw new TypeError(
            `Количество номеров контейнеров (${data.ids.length}) ` +
            `не совпадает с заявленным количеством (${data.count})`
        )
    }

    return {
        "КолКонтейн": String(data.count),
        "ИдКонтейн": data.ids,
    }
}
