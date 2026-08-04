/**
 * Описание груза
 * (ОпГруз, таб-5.8)
 */

import { formatFlag, mapArrayIfNotEmpty } from '../../../../helpers'
import { MassDeterminationMethod, formatMassDeterminationMethod } from '../consts'
import { formatCargoWeight, type TCargoWeight } from './5.36-CargoWeight';
import { formatDimensions, type TDimensions } from './5.37-Dimensions';
import { formatDangerousGoods, type TDangerousGoods } from './5.38-DangerousGoods';
import { formatPartyInfo, type TPartyInfo } from './5.18-PartyInfo';
import { formatDocumentRequisites, type TDocumentRequisites } from './5.16-DocumentRequisites';
import { formatLoadingUnloadingPoint, type TLoadingUnloadingPoint } from './5.9-LoadingUnloadingPoint';
import { formatInfoField, type TInfoField } from './5.40-InfoField';

export type TCargoDescription = {
    /**
     * Отгрузочное наименование груза.
     * Для опасных грузов — в соответствии с ДОПОГ/ADR.
     * В случае погрузки контейнера — «Контейнер».
     * (1-2000 символов)
     */
    name: string

    /**
     * Состояние груза.
     * (1-1000 символов)
     */
    condition: string

    /**
     * Вид тары.
     * Принимает значение в соответствии с классификатором
     * видов груза, упаковки и упаковочных материалов
     * (Решение КТС № 378), или «00» при отсутствии тары.
     * (2 символа)
     *
     * @see ContainerType
     */
    containerType: string

    /**
     * Другая необходимая информация о грузе.
     * (1-1000 символов)
     */
    additionalDetails?: string

    /**
     * Количество грузовых мест.
     * Для насыпных и наливных грузов принимает значение: 1.
     */
    packageCount: number

    /**
     * Метод определения массы грузовых мест.
     */
    massDeterminationMethod: MassDeterminationMethod

    /**
     * Объем грузовых мест, в кубических метрах.
     */
    volume: number

    /**
     * Отсутствие возможности распределения груза
     * по длине грузовой платформы.
     * false — груз может быть распределён,
     * true  — отсутствует возможность распределения.
     */
    cannotDistribute: boolean

    /**
     * Делимость груза.
     * false — неделимый груз,
     * true  — делимый груз.
     */
    divisible: boolean

    /**
     * Водитель не принимает участие в погрузке груза в контейнер.
     * false — водитель принимает участие,
     * true  — водитель не принимает участие.
     * Заполняется в случае перевозки груза в контейнере.
     */
    driverExcludedFromLoading?: boolean

    /**
     * Подача порожнего контейнера грузоотправителю.
     * false — приём к перевозке гружёного контейнера,
     * true  — подача порожнего контейнера.
     * Заполняется в случае перевозки груза в контейнере.
     */
    emptyContainerDelivery?: boolean

    /**
     * Масса грузовых мест, в килограммах.
     * (таб-5.36)
     */
    cargoWeight: TCargoWeight

    /**
     * Размеры грузовых мест (высота, ширина и длина), в метрах.
     * (таб-5.37)
     */
    dimensions: TDimensions

    /**
     * Информация по каждому опасному веществу, материалу или изделию.
     * Заполняется в случае перевозки опасного груза.
     * (таб-5.38)
     */
    dangerousGoods?: TDangerousGoods

    /**
     * Сведения о заказчике услуг по организации перевозки груза.
     * (таб-5.18)
     */
    customerInfo?: TPartyInfo

    /**
     * Реквизиты договора на выполнение услуг по организации
     * перевозки груза.
     * Обязателен при наличии {customerInfo}.
     * (таб-5.16)
     */
    customerContract?: TDocumentRequisites

    /**
     * Пункты погрузки и выгрузки.
     * (таб-5.9)
     */
    loadingUnloadingPoints?: TLoadingUnloadingPoint[]

    /**
     * Информационное поле.
     * (таб-5.40)
     */
    infoFields?: TInfoField[]
}

export function formatCargoDescription(data: TCargoDescription) {
    return {
        "НаимГруз": data.name,
        "СостГруз": data.condition,
        "ВидТар": data.containerType,
        "ДрОГруз": data.additionalDetails,
        "КолГрМест": String(data.packageCount),
        "МетОпрМасс": formatMassDeterminationMethod(data.massDeterminationMethod),
        "Объем": data.volume.toFixed(2),
        "РаспрГр": formatFlag(data.cannotDistribute),
        "ДелГр": formatFlag(data.divisible),
        "УчВодПогрГр": formatFlag(data.driverExcludedFromLoading),
        "ПрГрКонт": formatFlag(data.emptyContainerDelivery),
        "МасГруз": formatCargoWeight(data.cargoWeight),
        "РазмерГрМест": formatDimensions(data.dimensions),
        "ИнфОпасн": data.dangerousGoods && formatDangerousGoods(data.dangerousGoods),
        "ЗакУсл": data.customerInfo && formatPartyInfo(data.customerInfo),
        "ДогУслПрвз": data.customerContract && formatDocumentRequisites(data.customerContract),
        "Пункт": mapArrayIfNotEmpty(data.loadingUnloadingPoints, formatLoadingUnloadingPoint),
        "ИнфПол": mapArrayIfNotEmpty(data.infoFields, formatInfoField),
    }
}
