/** Фактическая передача и выгрузка контейнеров у получателя. */
import { formatDateTimeWithUtc, mapArrayIfNotEmpty } from '../../../../helpers'
import { formatInfoField, type TInfoField } from '../../../common/InfoField'
import { formatConcreteAddress, type TConcreteAddress } from '../../../etrn/1110343/data/9.23-ConcreteAddress'
import { formatCorrection, type TCorrection } from '../../1110347/data/Content'
import { formatCargoWeight, type TCargoWeight } from '../../1110348/data/Content'
export type TContainerTransfer = {submittedForUnloadingAt?:Date;containerReturnedAt?:Date}
export function formatContainerTransfer(data:TContainerTransfer) {
    const submitted=data.submittedForUnloadingAt && formatDateTimeWithUtc(data.submittedForUnloadingAt)
    const returned=data.containerReturnedAt && formatDateTimeWithUtc(data.containerReturnedAt)
    return {"ДатВрПодВыгр":submitted?.dateTime,"НалКоорТочВрПодВыгр":submitted?.utc,"ДатВрВозврКонт":returned?.dateTime,"НалКоорТочВрВозврКонт":returned?.utc}
}
export type TUnloading = {vehicleArrivedAt?:Date;positionedForUnloadingAt?:Date;vehicleDepartedAt?:Date;containerCondition?:string;packageCount?:number;address?:TConcreteAddress;weight?:TCargoWeight;infoField?:TInfoField[]}
export function formatUnloading(data:TUnloading) {
    const arrived=data.vehicleArrivedAt && formatDateTimeWithUtc(data.vehicleArrivedAt)
    const positioned=data.positionedForUnloadingAt && formatDateTimeWithUtc(data.positionedForUnloadingAt)
    const departed=data.vehicleDepartedAt && formatDateTimeWithUtc(data.vehicleDepartedAt)
    return {"ДатаТСПриб":arrived?.dateTime,"НалКоорТочВрТСПриб":arrived?.utc,"ДатаПВыгр":positioned?.dateTime,"НалКоорТочВрПВыгр":positioned?.utc,"ДатаТСУбыт":departed?.dateTime,"НалКоорТочВрТСУбыт":departed?.utc,"СВФСостКонт":data.containerCondition,"КолМест":data.packageCount,"АдрМВ":data.address && formatConcreteAddress(data.address),"МасГруз":data.weight && formatCargoWeight(data.weight),"ИнфПол":mapArrayIfNotEmpty(data.infoField,formatInfoField)}
}
export type TConsigneeContent = {statementId:string;correction?:TCorrection;containers:TContainerTransfer[];unloading:TUnloading;infoField?:TInfoField[]}
export function formatConsigneeContent(data:TConsigneeContent) {
    if (!data.statementId?.trim() || data.statementId.length>1000) throw new TypeError('Не указан УИД ЭСВ (1–1000 символов)')
    if (!data.containers?.length) throw new TypeError('Не указана передача контейнеров')
    return {"УИД_СВ":data.statementId,"ИспрСВ":data.correction && formatCorrection(data.correction),"СвКонтейн":data.containers.map(formatContainerTransfer),"СдачКонтВыгр":formatUnloading(data.unloading),"ИнфПол":mapArrayIfNotEmpty(data.infoField,formatInfoField)}
}
export type {TCorrection,TConcreteAddress,TInfoField,TCargoWeight}
