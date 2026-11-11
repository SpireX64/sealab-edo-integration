/** Описание груза и фактические признаки поручения 277@. */
import { mapArrayIfNotEmpty } from '../../../../helpers'
import { formatDimensions,type TDimensions } from '../../../common/Dimensions'
import { formatInfoField,type TInfoField } from '../../../common/InfoField'
import { StateRegistration } from '../consts'
export type TWeight = {netKg:number;grossKg:number;palletCount?:number;tareKg?:number}
export function formatWeight(data:TWeight) {return {"ВесНетто":data.netKg.toFixed(3),"ВесБрутто":data.grossKg.toFixed(3),"КолПалл":data.palletCount,"ВесТар":data.tareKg?.toFixed(3)}}
export type TValue = {currencyCode:string;currencyName:string;amount:number}
export function formatValue(data:TValue) {return {"КодОКВ":data.currencyCode,"НаимОКВ":data.currencyName,"СтГр":data.amount.toFixed(2)}}
export type TOriginCountry = {code:string;name:string}
export function formatOriginCountry(data:TOriginCountry) {return {"КодСтр":data.code,"НаимСтран":data.name}}
export type TPackaging = {typeCode:string;weightKg:number;count?:number;dimensions:TDimensions}
export function formatPackaging(data:TPackaging) {return {"ВидУпак":data.typeCode,"ВесУпак":data.weightKg.toFixed(3),"КолУп":data.count,"ГабарУпак":formatDimensions(data.dimensions)}}
export type TDangerousCargo = {regulation:string;unNumber:string;shippingName:string;hazardClass:string;technicalName?:string;description?:string;classificationCode?:string;packingGroup?:string;hazardLabel?:string;tunnelCode?:string;radionuclide?:string;physicalChemicalForm?:string;maxActivity?:string;packageCategory?:string;transportIndex?:string;criticalitySafetyIndex?:string;approvalCertificateId?:string;totalActivity?:string;controlTemperature?:string;emergencyTemperature?:string}
export function formatDangerousCargo(data:TDangerousCargo) {return {"НПА":data.regulation,"ИдОпаснООН":data.unNumber,"НадОтгНаим":data.shippingName,"КлассОпасн":data.hazardClass,"ТехНаим":data.technicalName,"Описание":data.description,"КласКод":data.classificationCode,"ГрУп":data.packingGroup,"ЗнОп":data.hazardLabel,"КодОгрЧерТун":data.tunnelCode,"НазРадионук":data.radionuclide,"ОписФизХимФорм":data.physicalChemicalForm,"МаксАкт":data.maxActivity,"КатУпак":data.packageCategory,"ТрансИндекс":data.transportIndex,"ИндексБез":data.criticalitySafetyIndex,"ОпозЗнак":data.approvalCertificateId,"ПолнАктГр":data.totalActivity,"КонтТемпер":data.controlTemperature,"АварТемпер":data.emergencyTemperature}}
/** 01 ЕГАИС, 02 ГИС МТ, 03 ВетИС, 04 ЛК, 05 Зерно, 06 Северный завоз, 99 иная. */
export type TStateSystem = {code:'01'|'02'|'03'|'04'|'05'|'06'|'99';otherName?:string;accountingUnit?:string;otherInfo?:string;unitId:string}
export function formatStateSystem(data:TStateSystem) {
    if ((data.code==='99')!==Boolean(data.otherName?.trim())) throw new TypeError('Наименование иной ГИС нужно только для кода 99')
    return {"НаимГосСист":data.code,"НаимГосСистИное":data.otherName,"УчетЕд":data.accountingUnit,"ИнаяИнф":data.otherInfo,"ИдНомУчетЕд":data.unitId}
}
export type TCargoDescription = {
    name:string;packageCount:number;dangerous:boolean;restrictedGoods:boolean;volumeKnown:boolean;volume?:number;transshipmentProhibited?:boolean;stateRegistration:StateRegistration;packaged:boolean;commodityCodeAvailable:boolean;commodityCode?:string
    okpd2Codes?:string[];gngCodes?:string[];etsngCodes?:string[];markings:string[];containerNumbers?:number[];originCountries:TOriginCountry[];weight:TWeight;packaging?:TPackaging[];declaredValue?:TValue;actualValue?:TValue;dangerousGoods?:TDangerousCargo[];stateSystems?:TStateSystem[];infoField?:TInfoField[]
}
export function formatCargoDescription(data:TCargoDescription) {
    if (data.declaredValue && data.actualValue) throw new TypeError('Указывается либо объявленная, либо действительная стоимость')
    for (const flag of [data.dangerous,data.restrictedGoods,data.volumeKnown,data.packaged,data.commodityCodeAvailable]) if (typeof flag!=='boolean') throw new TypeError('Признаки груза должны быть указаны явно')
    if (!data.markings?.length || !data.originCountries?.length) throw new TypeError('Нужны маркировки и страны происхождения груза')
    if (data.dangerous!==Boolean(data.dangerousGoods?.length)) throw new TypeError('Опасные свойства должны соответствовать признаку опасного груза')
    if (data.packaged!==Boolean(data.packaging?.length)) throw new TypeError('Упаковки должны соответствовать признаку наличия упаковки')
    if ((data.stateRegistration===StateRegistration.Registered)!==Boolean(data.stateSystems?.length)) throw new TypeError('Сведения ГИС обязательны только при учёте с известными идентификаторами')
    if (![StateRegistration.NotRequired,StateRegistration.Registered,StateRegistration.IdentifiersPending].includes(data.stateRegistration)) throw new TypeError('Не указан режим учёта в ГИС')
    if (data.volumeKnown && data.volume==null) throw new TypeError('Нужен определённый объём груза')
    if (data.commodityCodeAvailable!==Boolean(data.commodityCode?.trim())) throw new TypeError('Код ТН ВЭД должен соответствовать признаку наличия кода')
    return {"НаимГруз":data.name,"КолМестГр":data.packageCount,"ПрзОпаснГруз":data.dangerous?'1':'0',"ПрзИзъятВещ":data.restrictedGoods?'1':'0',"УказОбъем":data.volumeKnown?'1':'0',"Объем":data.volume?.toFixed(6),"ЗапрПерегруз":data.transshipmentProhibited===undefined?undefined:(data.transshipmentProhibited?'1':'0'),"УчГосСист":String(data.stateRegistration),"НалУпак":data.packaged?'1':'0',"НалКодТовНом":data.commodityCodeAvailable?'1':'0',"КодТовНом":data.commodityCode,"КодТовОКПД2":data.okpd2Codes,"КодГрузГНГ":data.gngCodes,"КодГрузЕТСНГ":data.etsngCodes,"Марк":data.markings,"НомКонтейн":data.containerNumbers,"СвСтрПроисх":data.originCountries.map(formatOriginCountry),"ВесГруз":formatWeight(data.weight),"ИнфУпГруз":mapArrayIfNotEmpty(data.packaging,formatPackaging),"ОбъявлСтГруз":data.declaredValue && formatValue(data.declaredValue),"ДейстСтГруз":data.actualValue && formatValue(data.actualValue),"СвОпаснГруз":mapArrayIfNotEmpty(data.dangerousGoods,formatDangerousCargo),"СвГосСист":mapArrayIfNotEmpty(data.stateSystems,formatStateSystem),"ИнфПол":mapArrayIfNotEmpty(data.infoField,formatInfoField)}
}
export type {TDimensions,TInfoField}
