/**
 * Описание груза
 * (ОпГруз, таб-5.9)
 */

import { formatFlag } from '../../../../helpers'
import { formatDimensions, type TDimensions } from './5.39-DimensionsInfo';
import { formatDangerousGoodsInfo, type TDangerousGoodsInfo } from './5.33-DangerousGoodsInfo';
import { formatContainerInfo, type TContainerInfo } from './5.34-ContainerInfo';
import { formatCargoWeight, type TCargoWeight } from './5.41-WeightInfo';
import { formatDeclaredValueInfo, type TDeclaredValueInfo } from './5.40-DeclaredValueInfo';
import { formatIdentificationDetails, type TIdentificationDetails } from './5.35-IdentificationDetails';
import { formatGovSystemInfo, type TGovSystemInfo } from './5.10-GovSystemInfo';

export type TCargoDescription = {
    /**
     * Отгрузочное наименование груза
     * (1-1000 символов)
     */
    name: string

    /**
     * Код товарной номенклатуры
     * (4 символа)
     */
    tnVedCode: string

    /**
     * Состояние груза
     * (1-1000 символов)
     */
    condition: string

    /**
     * Способ упаковки
     * (1-1000 символов)
     */
    packagingMethod: string

    /**
     * Вид тары
     * (2 символа)
     */
    containerType: string

    /**
     * Плотность груза в соответствии с документацией на груз
     * (Число, 5.2)
     */
    density?: number

    /**
     * Объем груза в кубических метрах
     * (Число, 17.3)
     */
    volume?: number

    /**
     * Количество грузовых мест согласно описанию груза.
     * Для насыпных и наливных грузов принимает значение: 1.
     * (Число, 4)
     */
    packageCount: number

    /**
     * Отметка о перевозке в составе груза товара,
     * перевозка которого подлежит учету в государственной информационной системе.
     *
     * - false — в составе груза отсутствует товар, подлежащий учету в ГИС
     * - true  — в составе груза присутствует товар, подлежащий учету в ГИС
     */
    isStateTracked?: boolean

    /**
     * Другая необходимая информация о грузе
     * (1-1000 символов)
     */
    additionalDetails?: string

    /**
     * Маркировка
     * (Массив строк, 1-1000 символов каждая)
     */
    marking: string[]

    /**
     * Габариты груза, в метрах.
     * Заполняется при перевозке крупногабаритного груза.
     */
    dimensions?: TDimensions

    /**
     * Сведения об опасном грузе.
     * Заполняется в случае перевозки опасного груза.
     */
    dangerousGoods?: TDangerousGoodsInfo

    /**
     * Сведения о контейнерах.
     * Обязателен если название груза "Контейнер".
     */
    containers?: TContainerInfo

    /**
     * Плановая масса груза, в килограммах.
     */
    plannedWeight: TCargoWeight

    /**
     * Объявленная стоимость (ценность) груза.
     */
    declaredValue?: TDeclaredValueInfo

    /**
     * Сведения о заказчике услуг, связанных с перевозкой груза.
     */
    customerInfo?: TIdentificationDetails

    /**
     * Дополнительные сведения о товаре, перевозка которого
     * подлежит учету в государственной информационной системе.
     * 
     * Обязателен когда `isStateTracked === true`.
     */
    stateTrackingInfo?: TGovSystemInfo
}

export function formatCargoDescription(data: TCargoDescription) {
    if (data.isStateTracked && !data.stateTrackingInfo) {
        throw new TypeError("Требуется указать доп. сведения о товаре (ГИС)")
    }

    if (data.name === "Контейнер" && !data.containers) {
        throw new TypeError("Требуется указать сведения о контейнерах для груза \"Контейнер\"")
    }

    return {
        "НаимГруз": data.name,
        "КодТовНом": data.tnVedCode,
        "СостГруз": data.condition,
        "СпУпак": data.packagingMethod,
        "ВидТар": data.containerType,
        "Плотн": data.density?.toFixed(2),
        "Объем": data.volume?.toFixed(3),
        "КолМестГр": String(data.packageCount),
        "УчГосСист": formatFlag(data.isStateTracked),
        "ДрОГруз": data.additionalDetails,
        "Марк": data.marking,
        "Габар": data.dimensions && formatDimensions(data.dimensions),
        "СвОпГруз": data.dangerousGoods && formatDangerousGoodsInfo(data.dangerousGoods),
        "СвКонтейн": data.containers && formatContainerInfo(data.containers),
        "ПлМасГруз": formatCargoWeight(data.plannedWeight),
        "ЦеннГруз": data.declaredValue && formatDeclaredValueInfo(data.declaredValue),
        "ЗакУсл": data.customerInfo && formatIdentificationDetails(data.customerInfo),
        "СвГосСист": data.stateTrackingInfo && formatGovSystemInfo(data.stateTrackingInfo),
    }
}
