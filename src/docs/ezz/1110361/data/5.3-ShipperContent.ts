/**
 * Содержание заказа и заявки, информация грузоотправителя
 * (СодИнфГО, таб-5.3)
 */

import { formatDate, mapArrayIfNotEmpty } from '../../../../helpers'
import { formatShipperAuthorizedPerson, type TShipperAuthorizedPerson } from './5.4-ShipperAuthorizedPerson';
import { formatVehicleSubmissionPoint, type TVehicleSubmissionPoint } from './5.5-VehicleSubmissionPoint';
import { formatLoadingUnloadingAddress, type TLoadingUnloadingAddress } from './5.6-LoadingUnloadingAddress';
import { formatCargoDescription, type TCargoDescription } from './5.8-CargoDescription';
import { formatVehicleRequirements, type TVehicleRequirements } from './5.10-VehicleRequirements';
import { formatTemperatureRequirements, type TTemperatureRequirements } from './5.11-TemperatureRequirements';
import { formatHumidityRequirements, type THumidityRequirements } from './5.12-HumidityRequirements';
import { formatPartyInfo, type TPartyInfo } from './5.18-PartyInfo';
import { formatInfoField, type TInfoField } from './5.40-InfoField';

const CONTENT_OPERATION = "Предоставление заказа и заявки на перевозку груза автомобильным транспортом"

export type TShipperContent = {
    /**
     * Уникальный идентификатор документа заказа и заявки.
     * Выдается ГИС ЭПД.
     * (1-36 символов)
     */
    uniqueId?: string

    /**
     * Порядковый номер заказа и заявки.
     * При отсутствии указывается: «Без номера».
     * (1-1000 символов)
     */
    orderNumber: string

    /**
     * Дата заказа и заявки.
     */
    orderDate: Date

    /**
     * Указания, необходимые для выполнения фитосанитарных, санитарных,
     * карантинных требований, установленных законодательством РФ.
     * При отсутствии указывается «Отсутствуют».
     * (1-2000 символов)
     */
    regulatoryInstructions: string

    /**
     * Рекомендации о предельных сроках перевозки.
     * Заполняется в случае перевозки пищевых продуктов.
     * (1-1000 символов)
     */
    deadlineRecommendations?: string

    /**
     * Сведения о предоставлении транспортного средства
     * для перевозки пищевых продуктов.
     * При отсутствии указывается «Отсутствуют».
     * (1-2000 символов)
     */
    foodTransportInfo: string

    /**
     * Иные условия перевозки.
     * (1-1000 символов)
     */
    otherConditions?: string

    /**
     * Наименование конечного пункта маршрута.
     * Заполняется в случае необходимости определения маршрута перевозки
     * с учетом обязанности доставки порожнего контейнера или
     * предоставленного грузоотправителем перевозчику оборудования
     * для крепления груза.
     * (1-1000 символов)
     */
    routeEndPoint?: string

    /**
     * Наименования промежуточных пунктов маршрута.
     * (1-1000 символов каждый)
     */
    routeIntermediatePoints?: string[]

    /**
     * Сведения о грузоотправителе.
     * (таб-5.18)
     */
    shipperInfo: TPartyInfo

    /**
     * Сведения о перевозчике.
     * (таб-5.18)
     */
    carrierInfo: TPartyInfo

    /**
     * Сведения о лице (лицах), уполномоченном (ых) грузоотправителем.
     * (таб-5.4)
     */
    authorizedPersons: TShipperAuthorizedPerson

    /**
     * Пункт подачи транспортного средства.
     * (таб-5.5)
     */
    vehicleSubmissionPoint: TVehicleSubmissionPoint

    /**
     * Адреса пунктов погрузки и выгрузки.
     * (таб-5.6)
     */
    loadingUnloadingAddresses: TLoadingUnloadingAddress[]

    /**
     * Описание груза.
     * (таб-5.8)
     */
    cargoDescriptions: TCargoDescription[]

    /**
     * Параметры транспортного средства, необходимые
     * для осуществления перевозки груза.
     * (таб-5.10)
     */
    vehicleRequirements: TVehicleRequirements

    /**
     * Требования о соблюдении температурного режима перевозки.
     * (таб-5.11)
     */
    temperatureRequirements?: TTemperatureRequirements

    /**
     * Требования о соблюдении режима влажности.
     * (таб-5.12)
     */
    humidityRequirements?: THumidityRequirements

    /**
     * Информационное поле.
     * (таб-5.40)
     */
    infoFields?: TInfoField[]
}

export function formatShipperContent(data: TShipperContent) {
    return {
        "УИД_Зак": data.uniqueId,
        "СодОпер": CONTENT_OPERATION,
        "НомЗак": data.orderNumber ?? "Без номера",
        "ДатаЗак": formatDate(data.orderDate),
        "УкНормПрвз": data.regulatoryInstructions ?? "Отсутствуют",
        "ПредСрПрвз": data.deadlineRecommendations,
        "ПрвзПищПрод": data.foodTransportInfo ?? "Отсутствуют",
        "ИныеУслв": data.otherConditions,
        "КонПунктМрш": data.routeEndPoint,
        "ПромПунктМрш": mapArrayIfNotEmpty(data.routeIntermediatePoints, (v) => v),
        "СвГО": formatPartyInfo(data.shipperInfo),
        "СвПрв": formatPartyInfo(data.carrierInfo),
        "СвЛицГО": formatShipperAuthorizedPerson(data.authorizedPersons),
        "ПунктПод": formatVehicleSubmissionPoint(data.vehicleSubmissionPoint),
        "АдрПункт": mapArrayIfNotEmpty(data.loadingUnloadingAddresses, formatLoadingUnloadingAddress),
        "ОпГруз": mapArrayIfNotEmpty(data.cargoDescriptions, formatCargoDescription),
        "ПарТСПрвз": formatVehicleRequirements(data.vehicleRequirements),
        "ТемпРеж": data.temperatureRequirements && formatTemperatureRequirements(data.temperatureRequirements),
        "ВлажнРеж": data.humidityRequirements && formatHumidityRequirements(data.humidityRequirements),
        "ИнфПол": mapArrayIfNotEmpty(data.infoFields, formatInfoField),
    }
}
