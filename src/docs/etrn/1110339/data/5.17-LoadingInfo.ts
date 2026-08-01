/**
 * Сведения грузоотправителя о передаче груза
 * при приеме груза перевозчиком
 * (СвПогруз, таб-5.17)
 */

import { formatDateTimeWithUtc } from '../../../../helpers'
import { MassDeterminationMethod, formatMassDeterminationMethod } from '../consts'
import { formatConcreteAddress } from './5.49-ConcreteAddress'
import type { TConcreteAddress } from './5.49-ConcreteAddress'
import { formatLoadingPersonInfo } from './5.18-LoadingPersonInfo'
import type { TLoadingPersonInfo } from './5.18-LoadingPersonInfo'
import { formatInfrastructureOwnerInfo } from './5.20-InfrastructureOwnerInfo'
import type { TInfrastructureOwnerInfo } from './5.20-InfrastructureOwnerInfo'
import { formatSettlementDoc } from './5.45-SettlementDoc'
import type { TSettlementDoc } from './5.45-SettlementDoc'
import { formatInfoField } from './5.44-InfoField'
import type { TInfoField } from './5.44-InfoField'

export type TLoadingInfo = {
    /**
     * Заявленные дата и время подачи транспортного средства под погрузку.
     */
    plannedArrivalDateTime: Date

    /**
     * Фактические дата и время прибытия под погрузку.
     */
    actualArrivalDateTime: Date

    /**
     * Фактические дата и время убытия.
     */
    actualDepartureDateTime: Date

    /**
     * Фактическое состояние тары при приеме груза перевозчиком
     * от лица, осуществляющего погрузку груза в транспортное средство.
     * (1-1000 символов)
     */
    packagingCondition?: string

    /**
     * Фактическое состояние упаковки при приеме груза перевозчиком
     * от лица, осуществляющего погрузку груза в транспортное средство.
     * (1-1000 символов)
     */
    containerCondition?: string

    /**
     * Фактическое состояние кузова при приеме груза перевозчиком
     * от лица, осуществляющего погрузку груза в транспортное средство.
     * (1-1000 символов)
     */
    bodyCondition?: string

    /**
     * Масса брутто груза.
     * (1-1000 символов)
     */
    grossWeight: string

    /**
     * Метод определения массы груза.
     */
    massDeterminationMethod: MassDeterminationMethod

    /**
     * Количество грузовых мест при приеме груза перевозчиком.
     * Для насыпных и наливных грузов принимает значение: 1.
     * (Число, 4)
     */
    packageCount: number

    /**
     * Адрес места погрузки.
     * (таб-5.49)
     */
    loadingAddress: TConcreteAddress

    /**
     * Сведения о лице, осуществляющем погрузку груза в транспортное средство.
     * (таб-5.18)
     */
    loadingPerson: TLoadingPersonInfo

    /**
     * Сведения о владельце объекта инфраструктуры пункта погрузки.
     * (таб-5.20)
     */
    infrastructureOwner: TInfrastructureOwnerInfo

    /**
     * Основание беспрепятственного доступа к объекту инфраструктуры пункта погрузки:
     * документ.
     * Заполняется, когда владелец объекта инфраструктуры известен и не является грузоотправителем.
     * Может быть указано только ОДНО из полей: infrastructureAccessDoc или infrastructureAccessText.
     * (таб-5.45)
     */
    infrastructureAccessDoc?: TSettlementDoc

    /**
     * Основание беспрепятственного доступа к объекту инфраструктуры пункта погрузки:
     * текст при отсутствии подтверждающих документов.
     * Заполняется, когда владелец объекта инфраструктуры известен и не является грузоотправителем.
     * Может быть указано только ОДНО из полей: infrastructureAccessDoc или infrastructureAccessText.
     * (1-1000 символов)
     */
    infrastructureAccessText?: string

    /** Информационное поле (таб-5.44) */
    infoField?: TInfoField[]
}

export function formatLoadingInfo(data: TLoadingInfo) {
    const plannedArrival = formatDateTimeWithUtc(data.plannedArrivalDateTime)
    const actualArrival = formatDateTimeWithUtc(data.actualArrivalDateTime)
    const actualDeparture = formatDateTimeWithUtc(data.actualDepartureDateTime)

    if (data.infrastructureAccessDoc && data.infrastructureAccessText) {
        throw new TypeError(
            "Должно быть указано только одно из полей: " +
            "infrastructureAccessDoc или infrastructureAccessText"
        )
    }

    return {
        "ЗаявПогр": plannedArrival.dateTime,
        "НалКоорТочВрЗаяв": plannedArrival.utc,
        "ФДатВрПриб": actualArrival.dateTime,
        "НалКоорТочВрФПогр": actualArrival.utc,
        "ФДатВрУбыт": actualDeparture.dateTime,
        "НалКоорТочВрФУбыт": actualDeparture.utc,
        "ФСостТар": data.packagingCondition,
        "ФСостУп": data.containerCondition,
        "ФСостКуз": data.bodyCondition,
        "МасБрутОтгр": data.grossWeight,
        "МетОпрМасс": formatMassDeterminationMethod(data.massDeterminationMethod),
        "КолМестПрием": String(data.packageCount),
        "ФАдресПогр": formatConcreteAddress(data.loadingAddress),
        "СвЛицПогрГр": formatLoadingPersonInfo(data.loadingPerson),
        "ВладИнфр": formatInfrastructureOwnerInfo(data.infrastructureOwner),
        "ОснДостОбИнфрДок": data.infrastructureAccessDoc && formatSettlementDoc(data.infrastructureAccessDoc),
        "ОснДостОбИнфрТекст": data.infrastructureAccessText,
        "ИнфПол": data.infoField?.map(formatInfoField),
    }
}
