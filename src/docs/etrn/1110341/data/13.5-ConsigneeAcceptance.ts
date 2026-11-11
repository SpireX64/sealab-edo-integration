/**
 * Сведения о приеме груза грузополучателем от перевозчика
 * (ПриемГрузГП, таб-13.5)
 */

import { formatDateTimeWithUtc, mapArrayIfNotEmpty } from '../../../../helpers'
import { MassDeterminationMethod, formatMassDeterminationMethod } from '../../common/MassDeterminationMethod'
import { formatAcceptedCargoByName, type TAcceptedCargoByName } from './13.6-AcceptedCargoByName';
import { formatInfoField, type TInfoField } from './13.16-InfoField';
import { formatAddress, type TAddress } from './13.20-Address';

export type TConsigneeAcceptance = {
    /**
     * Фактические дата и время прибытия транспортного средства под выгрузку.
     */
    actualArrivalDateTime: Date

    /**
     * Фактические дата и время убытия.
     */
    actualDepartureDateTime: Date

    /**
     * Заявленные дата и время прибытия транспортного средства под выгрузку.
     */
    plannedArrivalDateTime: Date

    /**
     * Метод определения массы груза.
     */
    massDeterminationMethod?: MassDeterminationMethod

    /**
     * Общее количество принятых грузовых мест.
     * Для насыпных и наливных грузов принимает значение: 1.
     */
    packageCount: number

    /**
     * Общие сведения о фактическом состоянии груза, тары,
     * упаковки, маркировки и опломбирования.
     * (1-10000 символов)
     */
    cargoCondition: string

    /**
     * Масса брутто принятого груза в килограммах.
     * (Число, 17.3)
     */
    grossWeight: number

    /**
     * Масса нетто принятого груза в килограммах.
     * (Число, 17.3)
     */
    netWeight?: number

    /**
     * Объем грузовых мест в кубических метрах.
     * (Число, 17.3)
     */
    volume?: number

    /**
     * Адрес места выгрузки.
     * (таб-13.20)
     */
    unloadingAddress: TAddress

    /**
     * Сведения о принятом грузе по отгрузочным наименованиям.
     * (таб-13.6)
     */
    acceptedCargoByName?: TAcceptedCargoByName[]

    /**
     * Информационное поле.
     * (таб-13.16)
     */
    infoField?: TInfoField[]
}

export function formatConsigneeAcceptance(data: TConsigneeAcceptance) {
    const actualArrival = formatDateTimeWithUtc(data.actualArrivalDateTime)
    const actualDeparture = formatDateTimeWithUtc(data.actualDepartureDateTime)
    const plannedArrival = formatDateTimeWithUtc(data.plannedArrivalDateTime)

    return {
        "ФДатВрПриб": actualArrival.dateTime,
        "НалКоорТочВрФПр": actualArrival.utc,
        "ФДатВрУбыт": actualDeparture.dateTime,
        "НалКоорТочВрФУб": actualDeparture.utc,
        "ЗаявДатВрПриб": plannedArrival.dateTime,
        "НалКоорТочВрЗПр": plannedArrival.utc,
        "МетОпрМасс": data.massDeterminationMethod && formatMassDeterminationMethod(data.massDeterminationMethod),
        "КолМестПриемЧ": data.packageCount,
        "ОбщСвСост": data.cargoCondition,
        "МасБрутЗначПрием": data.grossWeight.toFixed(3),
        "МасНетЗначПрием": data.netWeight?.toFixed(3),
        "Объем": data.volume?.toFixed(3),
        "АдрВыгруз": formatAddress(data.unloadingAddress),
        "СвПринПоНаим": mapArrayIfNotEmpty(data.acceptedCargoByName, formatAcceptedCargoByName),
        "ИнфПол": mapArrayIfNotEmpty(data.infoField, formatInfoField),
    }
}
