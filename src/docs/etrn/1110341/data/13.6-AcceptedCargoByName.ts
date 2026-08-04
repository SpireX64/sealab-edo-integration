/**
 * Сведения о принятом грузе по отгрузочным наименованиям
 * (СвПринПоНаим, таб-13.6)
 */

import { mapArrayIfNotEmpty } from '../../../../helpers'
import { formatCargoWeight, type TCargoWeight } from './13.14-CargoWeight';

export type TAcceptedCargoByName = {
    /**
     * Отгрузочное наименование принятого груза.
     * Для опасных грузов указывается в соответствии с ДОПОГ.
     * (1-1000 символов)
     */
    cargoName: string

    /**
     * Состояние груза, тары, упаковки, маркировки и опломбирования.
     * (1-10000 символов)
     */
    cargoCondition: string

    /**
     * Плотность груза в соответствии с документацией на груз.
     * (Число, 5.2)
     */
    density?: number

    /**
     * Объем груза, в кубических метрах.
     * (Число, 17.3)
     */
    volume?: number

    /**
     * Количество грузовых мест.
     * Для насыпных и наливных грузов принимает значение: 1.
     */
    packageCount: number

    /**
     * Перечень маркировок.
     * (1-1000 символов каждый)
     */
    markings?: string[]

    /**
     * Масса груза.
     * (таб-13.14)
     */
    cargoWeight?: TCargoWeight
}

export function formatAcceptedCargoByName(data: TAcceptedCargoByName) {
    return {
        "НаимГруз": data.cargoName,
        "СостГруз": data.cargoCondition,
        "Плотн": data.density?.toFixed(2),
        "Объем": data.volume?.toFixed(3),
        "КолМест": data.packageCount,
        "ПерМарк": mapArrayIfNotEmpty(data.markings, m => m),
        "МасГруз": data.cargoWeight && formatCargoWeight(data.cargoWeight),
    }
}
