import {mapArrayIfNotEmpty} from '../../../../helpers'
import {formatInfoField,type TInfoField} from '../../../common/InfoField'
import {formatDimensions} from '../../../common/Dimensions'
import {formatCargoDescription as formatBaseCargo,type TCargoDescription as TBaseCargo,formatWeight,formatValue,type TWeight,type TValue} from '../../1110486/data/Cargo'
import {type TContainer as TBaseContainer} from '../../1110486/data/Container'
import {CarriageType} from '../consts'
export type TCargoDescription=Omit<TBaseCargo,'transshipmentProhibited'>&{deliveryMethod:string;notes:string;valueAvailable:boolean}
export function validateValue(data:{valueAvailable:boolean;declaredValue?:TValue;actualValue?:TValue}) {
    if (typeof data.valueAvailable!=='boolean' || data.valueAvailable!==Boolean(data.declaredValue || data.actualValue)) throw new TypeError('Стоимость должна соответствовать признаку её наличия')
    if (data.declaredValue && data.actualValue) throw new TypeError('Указывается только один вид стоимости')
}
export function formatCargoDescription(data:TCargoDescription) {
    validateValue(data)
    const base=formatBaseCargo(data)
    // В расписке номер контейнера стоит перед товарными кодами; запрета перегрузки нет.
    const {ЗапрПерегруз,КодТовОКПД2,КодГрузГНГ,КодГрузЕТСНГ,Марк,НомКонтейн,СвСтрПроисх,ВесГруз,ИнфУпГруз,ОбъявлСтГруз,ДейстСтГруз,СвОпаснГруз,СвГосСист,ИнфПол,...attributes}=base
    return {...attributes,СпДостГруз:data.deliveryMethod,Отмет:data.notes,ВозмУкСтГруз:data.valueAvailable?'1':'0',НомКонтейн,КодТовОКПД2,КодГрузГНГ,КодГрузЕТСНГ,Марк,СвСтрПроисх,ВесГруз,ИнфУпГруз,ОбъявлСтГруз,ДейстСтГруз,СвОпаснГруз,СвГосСист,ИнфПол}
}
export type TContainer=Omit<TBaseContainer,'use'>
export function formatContainer(data:TContainer) {
    if ((data.sealCount!==undefined)!==Boolean(data.sealNumbers?.length)) throw new TypeError('Количество и номера пломб указываются вместе')
    if (data.internationalId && data.nonstandardId) throw new TypeError('Указывается только один вид идентификатора контейнера')
    if (data.isoCode!==undefined && data.isoCode.length!==4) throw new TypeError('ISO-код контейнера должен содержать 4 символа')
    return {НомКонтейн:data.sequenceNumber,ИСОКонтейн:data.isoCode,ПредКонтейн:String(data.provider),СумВесГруз:data.cargoWeightKg?.toFixed(4),ВесТара:data.tareWeightKg?.toFixed(4),КолПломб:data.sealCount,НомПломб:data.sealNumbers,ИдКонтейнМежд:data.internationalId?[data.internationalId]:undefined,ИдКонтейнНест:data.nonstandardId?[data.nonstandardId]:undefined,ГабарСпКонтейн:data.specialDimensions && formatDimensions(data.specialDimensions),ИнфПол:mapArrayIfNotEmpty(data.infoField,formatInfoField)}
}
export type TAcceptance={cargoCondition:string;tareCondition?:string;packagingCondition?:string;markingCondition?:string;sealCondition?:string;forwarderObligations:string[];infoField?:TInfoField[]}
export function formatAcceptance(data:TAcceptance) {
    if (!data.cargoCondition?.trim() || !data.forwarderObligations?.length) throw new TypeError('Нужны фактическое состояние груза и обязательства экспедитора')
    return {ФСостГруз:data.cargoCondition,ФСостТар:data.tareCondition,ФСостУп:data.packagingCondition,ФСостМарк:data.markingCondition,ФСостПломб:data.sealCondition,ОбязЭксп:data.forwarderObligations,ИнфПол:mapArrayIfNotEmpty(data.infoField,formatInfoField)}
}
import {formatDocumentRequisites,type TDocumentRequisites} from '../../1110486/data/DocumentRequisites'
export type TConsignment={number?:string;id?:string;packageCount?:number;valueAvailable:boolean;carriageType:CarriageType;weight?:TWeight;declaredValue?:TValue;actualValue?:TValue;acceptance:TAcceptance;supplyOrders?:TDocumentRequisites[];accompanyingDocuments?:TDocumentRequisites[];cargo:TCargoDescription[];containers?:TContainer[];infoField?:TInfoField[]}
export function formatConsignment(data:TConsignment) {
    validateValue(data)
    if (!data.cargo?.length) throw new TypeError('Нужен принятый груз')
    if (![0,1,2].includes(data.carriageType) || (data.carriageType!==0)!==Boolean(data.containers?.length)) throw new TypeError('Контейнеры должны соответствовать признаку перевозки')
    if (data.carriageType===0 && data.cargo.some(c=>c.containerNumbers?.length)) throw new TypeError('Номера контейнеров запрещены без контейнерной перевозки')
    return {НомПартГруз:data.number,ИдентПартГруз:data.id,КолМестПарт:data.packageCount,ВозмУкСтПарт:data.valueAvailable?'1':'0',ПрзПрвз:String(data.carriageType),ВесГрузПарт:data.weight && formatWeight(data.weight),ОбъявлСтГрузПарт:data.declaredValue && formatValue(data.declaredValue),ДейстСтГрузПарт:data.actualValue && formatValue(data.actualValue),УслПрием:formatAcceptance(data.acceptance),РеквЗаказПост:mapArrayIfNotEmpty(data.supplyOrders,formatDocumentRequisites),СопрДокПарт:mapArrayIfNotEmpty(data.accompanyingDocuments,formatDocumentRequisites),ОпГруз:data.cargo.map(formatCargoDescription),СвКонтейн:mapArrayIfNotEmpty(data.containers,formatContainer),ИнфПол:mapArrayIfNotEmpty(data.infoField,formatInfoField)}
}
export type {TWeight,TValue,TInfoField,TDocumentRequisites}
