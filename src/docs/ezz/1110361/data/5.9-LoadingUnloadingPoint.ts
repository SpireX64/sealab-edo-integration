/**
 * Пункты погрузки и выгрузки
 * (Пункт, таб-5.9)
 */

export type TLoadingUnloadingPoint = {
    /**
     * Пункт погрузки.
     * Указывается порядковый номер пункта в пути следования из таб-5.6.
     */
    loadingSequenceNumber: number

    /**
     * Пункт выгрузки.
     * Указывается порядковый номер пункта в пути следования из таб-5.6.
     */
    unloadingSequenceNumber: number

    /**
     * Количество грузовых мест.
     * Для насыпных и наливных грузов принимает значение: 1.
     */
    packageCount: number
}

export function formatLoadingUnloadingPoint(data: TLoadingUnloadingPoint) {
    return {
        "Погр": String(data.loadingSequenceNumber),
        "Выгр": String(data.unloadingSequenceNumber),
        "КолГрМест": String(data.packageCount),
    }
}
