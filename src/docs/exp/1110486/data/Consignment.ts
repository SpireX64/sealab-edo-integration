/** Партия груза: стороны, маршрут, сроки, транспорт, страхование и услуги. */
import { formatDate,mapArrayIfNotEmpty } from '../../../../helpers'
import { formatInfoField,type TInfoField } from '../../../common/InfoField'
import { TransportMode,CarriageType,NotificationParty,ReceiptPlace,DeliveryPlace } from '../consts'
import { formatParticipant,type TParticipant } from './Party'
import { formatAddress,formatConcreteAddress,type TAddress,type TConcreteAddress } from './Address'
import { formatDocumentRequisites,type TDocumentRequisites } from './DocumentRequisites'
import { formatCargoDescription,formatWeight,formatValue,type TCargoDescription,type TWeight,type TValue } from './Cargo'
import { formatContainer,type TContainer } from './Container'
export type TNotification = {party:NotificationParty;method?:string;otherParty?:TParticipant}
export function formatNotification(data:TNotification) {
    if ((data.party===NotificationParty.Other)!==Boolean(data.otherParty)) throw new TypeError('Иной участник уведомления нужен только при стороне 3')
    return {"Сторона":String(data.party),"СпосУвед":data.method,"ИноеУвед":data.otherParty && formatParticipant(data.otherParty)}
}
export type TTransport = {mode:TransportMode;bodyType?:string}
export function formatTransport(data:TTransport) {
    if (data.bodyType!==undefined && data.mode!==TransportMode.Road && data.mode!==TransportMode.Rail) throw new TypeError('Тип кузова допустим только для автомобильного и железнодорожного транспорта')
    return {"ВидТС":String(data.mode),"ТипКузов":data.bodyType}
}
export type TClimate = {minimumCelsius?:number;maximumCelsius?:number;minimumHumidity?:number;maximumHumidity?:number}
export function formatClimate(data:TClimate) {return {"ТемпНеНиже":data.minimumCelsius?.toFixed(2),"ТемпНеВыше":data.maximumCelsius?.toFixed(2),"ВлажнНеНиже":data.minimumHumidity?.toFixed(2),"ВлажнНеВыше":data.maximumHumidity?.toFixed(2)}}
export type TInstructions = {deliveryDays?:number;transportRules:string;speedRestrictions?:string;notes:string;climate?:TClimate;infoField?:TInfoField[]}
export function formatInstructions(data:TInstructions) {return {"СрокДостГр":data.deliveryDays,"УкНормПрвз":data.transportRules,"ОгрСкор":data.speedRestrictions,"Отмет":data.notes,"КлимРеж":data.climate && formatClimate(data.climate),"ИнфПол":mapArrayIfNotEmpty(data.infoField,formatInfoField)}}
export type TInsurance = {insurerName:string;conditions?:string[];insurer?:TParticipant;address:TAddress;policy:TDocumentRequisites}
export function formatInsurance(data:TInsurance) {return {"НаимСтрахОрг":data.insurerName,"УслСтрах":data.conditions,"РекИдентСтрах":data.insurer && formatParticipant(data.insurer),"АдрСтрахОрг":formatAddress(data.address),"Полис":formatDocumentRequisites(data.policy)}}
export type TService = {id?:string;name:string;code?:string;description?:string;unitCode?:string;unitName?:string;quantity?:number;infoField?:TInfoField[]}
export function formatService(data:TService) {
    if (data.unitCode && !data.unitName) throw new TypeError('Для кода ОКЕИ нужно наименование единицы услуги')
    return {"ИдентУсл":data.id,"НаимУсл":data.name,"КодУсл":data.code,"ХарактУсл":data.description,"ОКЕИ_Усл":data.unitCode,"НаимЕдИзм":data.unitName,"КолУсл":data.quantity?.toFixed(2),"ИнфПол":mapArrayIfNotEmpty(data.infoField,formatInfoField)}
}
export type TConsignment = {
    notifyParties:boolean;shippingFrom:Date;shippingTo:Date;shippingTimeRange?:string;deliveryFrom?:Date;deliveryTo?:Date;deliveryTimeRange?:string;forwarderTakesPossession?:boolean;carriageType:CarriageType;id?:string;number?:string;packageCount?:number;route?:string;shipperEdoId?:string;consigneeEdoId?:string
    notifications?:TNotification[];consignee:TParticipant;shipper:TParticipant;transport:TTransport[];instructions?:TInstructions;weight?:TWeight;declaredValue?:TValue;actualValue?:TValue;cargo:TCargoDescription[];containers?:TContainer[];receipt:{place?:ReceiptPlace;address:TConcreteAddress};insurance?:TInsurance;services?:TService[];accompanyingDocuments?:TDocumentRequisites[];supplyOrders?:TDocumentRequisites[];delivery:{place?:DeliveryPlace;address:TConcreteAddress};infoField?:TInfoField[]
}
export function formatConsignment(data:TConsignment) {
    if (data.declaredValue && data.actualValue) throw new TypeError('Указывается либо объявленная, либо действительная стоимость')
    if (typeof data.notifyParties!=='boolean' || data.notifyParties!==Boolean(data.notifications?.length)) throw new TypeError('Уведомления должны соответствовать признаку уведомления сторон')
    if (![CarriageType.WithoutContainer,CarriageType.LoadedContainers,CarriageType.EmptyContainersAsCargo].includes(data.carriageType)) throw new TypeError('Не указан признак перевозки')
    if ((data.carriageType!==CarriageType.WithoutContainer)!==Boolean(data.containers?.length)) throw new TypeError('Контейнеры должны соответствовать признаку перевозки')
    if (!data.cargo?.length || !data.transport?.length) throw new TypeError('Нужны груз и вид транспорта партии')
    if (data.carriageType===CarriageType.WithoutContainer && data.cargo.some(c=>c.containerNumbers?.length)) throw new TypeError('Без контейнерной перевозки номера контейнеров в грузе запрещены')
    for (const range of [data.shippingTimeRange,data.deliveryTimeRange]) if (range!==undefined && !/^(?:[01]\d|2[0-3]):[0-5]\d-(?:[01]\d|2[0-3]):[0-5]\d[+-][01]\d:[0-5]\d$/.test(range)) throw new TypeError('Диапазон времени должен иметь формат ЧЧ:ММ-ЧЧ:ММ±ЧЧ:ММ')
    return {"ПрУведСторон":data.notifyParties?'1':'0',"ДатОтгрС":formatDate(data.shippingFrom),"ДатОтгрПо":formatDate(data.shippingTo),"ВрОтгр":data.shippingTimeRange,"ДатДостГрС":data.deliveryFrom && formatDate(data.deliveryFrom),"ДатДостГрПо":data.deliveryTo && formatDate(data.deliveryTo),"ВрДостГр":data.deliveryTimeRange,"ОтмПрием":data.forwarderTakesPossession===undefined?undefined:(data.forwarderTakesPossession?'1':'0'),"ПрзПрвз":String(data.carriageType),"ИдентПартГруз":data.id,"НомПартГруз":data.number,"КолМестПарт":data.packageCount,"МаршСлГруз":data.route,"УИГО":data.shipperEdoId,"УИГП":data.consigneeEdoId,"СвУведСторон":mapArrayIfNotEmpty(data.notifications,formatNotification),"СвГП":formatParticipant(data.consignee),"СвГО":formatParticipant(data.shipper),"СвТС":data.transport.map(formatTransport),"УказКлнт":data.instructions && formatInstructions(data.instructions),"ВесГрузПарт":data.weight && formatWeight(data.weight),"ОбъявлСтГрузПарт":data.declaredValue && formatValue(data.declaredValue),"ДейстСтГрузПарт":data.actualValue && formatValue(data.actualValue),"ОпГруз":data.cargo.map(formatCargoDescription),"СвКонтейн":mapArrayIfNotEmpty(data.containers,formatContainer),"АдрГруз":{"МестоПрием":data.receipt.place===undefined?undefined:String(data.receipt.place),"АдрПриемГруз":formatConcreteAddress(data.receipt.address)},"СвСтрах":data.insurance && formatInsurance(data.insurance),"СвУсл":mapArrayIfNotEmpty(data.services,formatService),"СопрДокПарт":mapArrayIfNotEmpty(data.accompanyingDocuments,formatDocumentRequisites),"РеквЗакПост":mapArrayIfNotEmpty(data.supplyOrders,formatDocumentRequisites),"АдрПунктНазн":{"МестоВыд":data.delivery.place===undefined?undefined:String(data.delivery.place),"АдрВыдГруз":formatConcreteAddress(data.delivery.address)},"ИнфПол":mapArrayIfNotEmpty(data.infoField,formatInfoField)}
}
