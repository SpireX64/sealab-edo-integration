/** Условия отправителя и фактическая погрузка контейнеров ЭСВ. */
import { formatDateTimeWithUtc, mapArrayIfNotEmpty } from '../../../../helpers'
import { formatInfoField, type TInfoField } from '../../../common/InfoField'
import { formatConcreteAddress, type TConcreteAddress } from '../../../etrn/1110343/data/9.23-ConcreteAddress'
import { formatCorrection, type TCorrection } from '../../1110347/data/Content'
export type TTemperatureConditions = {minimumCelsius?:number;maximumCelsius?:number;minimumHumidity?:number;maximumHumidity?:number}
export function formatTemperatureConditions(data:TTemperatureConditions) {
    return {"ТемпНеНижеСВ":data.minimumCelsius?.toFixed(2),"ТемпНеВышеСВ":data.maximumCelsius?.toFixed(2),"ВлажнНеНижеСВ":data.minimumHumidity?.toFixed(2),"ВлажнНеВышеСВ":data.maximumHumidity?.toFixed(2)}
}
export type TShipperInstructions = {transportRules?:string;deliveryDeadline?:string;transshipmentProhibited?:true;seals?:string;temperature?:TTemperatureConditions;infoField?:TInfoField[]}
export function formatShipperInstructions(data:TShipperInstructions) {
    if (data.transshipmentProhibited!==undefined && data.transshipmentProhibited!==true) throw new TypeError('Запрет перегрузки передаётся только при наличии запрета')
    return {"УкНормПрвз":data.transportRules,"ПредСрПрвз":data.deliveryDeadline,"ЗапрПерегруз":data.transshipmentProhibited?'1':undefined,"СвПломба":data.seals,"ТемпРеж":data.temperature && formatTemperatureConditions(data.temperature),"ИнфПол":mapArrayIfNotEmpty(data.infoField,formatInfoField)}
}
export type TContainerTransfer = {cargoSubmittedAt?:Date;containerReturnedAt?:Date}
export function formatContainerTransfer(data:TContainerTransfer) {
    const submitted=data.cargoSubmittedAt && formatDateTimeWithUtc(data.cargoSubmittedAt)
    const returned=data.containerReturnedAt && formatDateTimeWithUtc(data.containerReturnedAt)
    return {"ДатВрСдГрКонт":submitted?.dateTime,"НалКоорТочВрСдГрКонт":submitted?.utc,"ДатВрВозврКонт":returned?.dateTime,"НалКоорТочВрВозврКонт":returned?.utc}
}
export type TCargoWeight = {grossKg:number;netKg?:number;palletCount?:number}
export function formatCargoWeight(data:TCargoWeight) {
    return {"МасНетЗнач":data.netKg?.toFixed(3),"МасБрутЗнач":data.grossKg.toFixed(3),"КолПалл":data.palletCount}
}
export type TLoading = {vehicleArrivedAt?:Date;loadedAt?:Date;vehicleDepartedAt?:Date;containerCondition?:string;packageCount?:number;address?:TConcreteAddress;weight?:TCargoWeight;infoField?:TInfoField[]}
export function formatLoading(data:TLoading) {
    const arrived=data.vehicleArrivedAt && formatDateTimeWithUtc(data.vehicleArrivedAt)
    const loaded=data.loadedAt && formatDateTimeWithUtc(data.loadedAt)
    const departed=data.vehicleDepartedAt && formatDateTimeWithUtc(data.vehicleDepartedAt)
    return {"ДатаТСПриб":arrived?.dateTime,"НалКоорТочВрТСПриб":arrived?.utc,"ФактДатаПогр":loaded?.dateTime,"НалКоорТочВрПогр":loaded?.utc,"ДатаТСУбыт":departed?.dateTime,"НалКоорТочВрТСУбыт":departed?.utc,"СВФСостКонт":data.containerCondition,"КолМест":data.packageCount,"АдрМП":data.address && formatConcreteAddress(data.address),"МасГруз":data.weight && formatCargoWeight(data.weight),"ИнфПол":mapArrayIfNotEmpty(data.infoField,formatInfoField)}
}
export type TShipperContent = {statementId:string;correction?:TCorrection;instructions?:TShipperInstructions;containers:TContainerTransfer[];loading:TLoading;infoField?:TInfoField[]}
export function formatShipperContent(data:TShipperContent) {
    if (!data.statementId?.trim() || data.statementId.length>1000) throw new TypeError('Не указан УИД ЭСВ (1–1000 символов)')
    if (!data.containers?.length) throw new TypeError('Не указана передача контейнеров')
    return {"УИД_СВ":data.statementId,"ИспрСВ":data.correction && formatCorrection(data.correction),"УказГО":data.instructions && formatShipperInstructions(data.instructions),"СвКонтейн":data.containers.map(formatContainerTransfer),"СдачКонтПогруз":formatLoading(data.loading),"ИнфПол":mapArrayIfNotEmpty(data.infoField,formatInfoField)}
}
export type {TCorrection,TConcreteAddress,TInfoField}
