import {mapArrayIfNotEmpty,formatDate} from '../../../../helpers'
import {formatInfoField,type TInfoField} from '../../../common/InfoField'
import {formatDimensions} from '../../../common/Dimensions'
import {formatCargoDescription as formatBaseCargo,type TCargoDescription as TBaseCargo,formatWeight,formatValue,type TWeight,type TValue} from '../../1110486/data/Cargo'
import {type TContainer as TBaseContainer} from '../../1110486/data/Container'
import {formatAddress,type TAddress} from '../../1110486/data/Address'
import {formatDocumentRequisites,type TDocumentRequisites} from '../../1110486/data/DocumentRequisites'
import {formatParticipant,type TParticipant} from './Party'
import {ContainerLoad} from '../consts'
export type TCargoDescription=Omit<TBaseCargo,'transshipmentProhibited'>&{deliveryMethod:string;notes:string}
export function formatCargoDescription(data:TCargoDescription) {
    if (!Number.isInteger(data.packageCount) || data.packageCount<0 || data.packageCount>9999999) throw new TypeError('Количество мест груза ограничено семью цифрами')
    for (const p of data.packaging??[]) if (p.count!==undefined && (!Number.isInteger(p.count) || p.count<0 || p.count>9999999)) throw new TypeError('Количество упаковок ограничено семью цифрами')
    const {ЗапрПерегруз,...cargo}=formatBaseCargo(data)
    return {...cargo,СпДостГруз:data.deliveryMethod,Отмет:data.notes}
}
export type TContainer=Omit<TBaseContainer,'provider'>&{load:ContainerLoad}
export function formatContainer(data:TContainer) {
    if (![1,2].includes(data.load)) throw new TypeError('Нужно указать загрузку контейнера')
    if ((data.sealCount!==undefined)!==Boolean(data.sealNumbers?.length)) throw new TypeError('Количество и номера пломб указываются вместе')
    if (data.internationalId && data.nonstandardId) throw new TypeError('Указывается только один вид идентификатора контейнера')
    return {НомКонтейн:data.sequenceNumber,ИСОКонтейн:data.isoCode,ЗагрКонтейн:String(data.load),ИспКонтейн:data.use===undefined?undefined:String(data.use),СумВесГруз:data.cargoWeightKg?.toFixed(4),ВесТара:data.tareWeightKg?.toFixed(4),КолПломб:data.sealCount,НомПломб:data.sealNumbers,ИдКонтейнМежд:data.internationalId?[data.internationalId]:undefined,ИдКонтейнНест:data.nonstandardId?[data.nonstandardId]:undefined,ГабарСпКонтейн:data.specialDimensions && formatDimensions(data.specialDimensions),ИнфПол:mapArrayIfNotEmpty(data.infoField,formatInfoField)}
}
export type TAcceptance={storageDays?:number;receivedOn:Date;receivedTime?:string;cargoCondition:string;tareCondition?:string;packagingCondition?:string;markingCondition?:string;sealCondition?:string;acceptingPerson?:TParticipant;authority?:TDocumentRequisites;infoField?:TInfoField[]}
export function formatAcceptance(data:TAcceptance) {
    if (data.storageDays!==undefined && (!Number.isInteger(data.storageDays) || data.storageDays<0 || data.storageDays>999)) throw new TypeError('Срок хранения — целые сутки, до 999')
    if (data.acceptingPerson && !data.authority) throw new TypeError('Принимающему на хранение лицу нужны полномочия')
    if (data.receivedTime!==undefined && !/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(data.receivedTime)) throw new TypeError('Время приёмки должно иметь формат ЧЧ:ММ:СС')
    return {СрокХран:data.storageDays===undefined?undefined:String(data.storageDays),ФДатХран:formatDate(data.receivedOn),ФВрХран:data.receivedTime,ФСостГрузХран:data.cargoCondition,ФСостТарХран:data.tareCondition,ФСостУпХран:data.packagingCondition,ФСостМаркХран:data.markingCondition,ФСостПломбХран:data.sealCondition,СвЛицПриемГрХран:data.acceptingPerson && formatParticipant(data.acceptingPerson),ОснДовПриемГрХран:data.authority && formatDocumentRequisites(data.authority),ИнфПол:mapArrayIfNotEmpty(data.infoField,formatInfoField)}
}
export type TInsurance={insurerName:string;conditions?:string[];insurer?:TParticipant;address:TAddress;policy:TDocumentRequisites}
export function formatInsurance(data:TInsurance) {return {НаимСтрахОрг:data.insurerName,УслСтрах:data.conditions,РекИдентСтрах:data.insurer && formatParticipant(data.insurer),АдрСтрахОрг:formatAddress(data.address),Полис:formatDocumentRequisites(data.policy)}}
export type TConsignment={number?:string;id?:string;packageCount?:number;weight?:TWeight;declaredValue?:TValue;actualValue?:TValue;acceptances:TAcceptance[];purchaseOrders?:TDocumentRequisites[];accompanyingDocuments?:TDocumentRequisites[];cargo:TCargoDescription[];containers?:TContainer[];insurance?:TInsurance;infoField?:TInfoField[]}
export function formatConsignment(data:TConsignment) {
    if (!data.cargo?.length || !data.acceptances?.length) throw new TypeError('Нужны груз и фактическая приёмка на хранение')
    if (data.declaredValue && data.actualValue) throw new TypeError('Указывается только один вид стоимости партии')
    return {НомПартГруз:data.number,ИдентПартГруз:data.id,КолМестПарт:data.packageCount,ВесГрузПарт:data.weight && formatWeight(data.weight),ОбъявлСтГрузПарт:data.declaredValue && formatValue(data.declaredValue),ДейстСтГрузПарт:data.actualValue && formatValue(data.actualValue),УслПриемГр:data.acceptances.map(formatAcceptance),РеквЗаказПок:mapArrayIfNotEmpty(data.purchaseOrders,formatDocumentRequisites),СопрДок:mapArrayIfNotEmpty(data.accompanyingDocuments,formatDocumentRequisites),ОпГрузХран:data.cargo.map(formatCargoDescription),СвКонтейн:mapArrayIfNotEmpty(data.containers,formatContainer),СвСтрах:data.insurance && formatInsurance(data.insurance),ИнфПол:mapArrayIfNotEmpty(data.infoField,formatInfoField)}
}
export type {TWeight,TValue,TInfoField,TDocumentRequisites}
