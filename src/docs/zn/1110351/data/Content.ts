/** Согласование заказа-наряда фрахтовщиком. */
import { formatDate,mapArrayIfNotEmpty } from '../../../../helpers'
import { formatPersonFullNameFields,type TPersonFullName } from '../../../common/PersonFullName'
import { formatContacts,type TContacts } from '../../../common/Contacts'
import { formatInfoField,type TInfoField } from '../../../common/InfoField'
import { formatLegalEntity,type TLegalEntity } from '../../../esv/1110347/data/Party'
import { formatWaybill,type TWaybill } from '../../../esv/1110347/data/Transport'
import { formatVehicleSpecs,formatRoute,type TVehicleSpecs,type TRoute } from '../../1110350/data/Content'
import { formatDocumentRequisites,type TDocumentRequisites } from '../../1110350/data/DocumentRequisites'
export type TSoleProprietor = {inn:string;ogrnip?:string;fullName:TPersonFullName;contacts:TContacts}
export function formatSoleProprietor(data:TSoleProprietor) {
    return {"ИННФЛ":data.inn,"ОГРНИП":data.ogrnip,"ФИО":formatPersonFullNameFields(data.fullName),"Конт":formatContacts(data.contacts)}
}
export type TFreighter = {kind:'soleProprietor';soleProprietor:TSoleProprietor}|{kind:'legalEntity';legalEntity:TLegalEntity}
export function formatFreighter(data:TFreighter) {
    return data.kind==='soleProprietor'?{"ФщИП":formatSoleProprietor(data.soleProprietor)}:{"ФщЮЛ":formatLegalEntity(data.legalEntity)}
}
export type TAcceptance = {acceptedAt:Date;position:string;fullName:TPersonFullName}
export function formatAcceptance(data:TAcceptance) {
    return {"ДатаПринЗН":formatDate(data.acceptedAt),"ДолжПринЗН":data.position,"ФИО":formatPersonFullNameFields(data.fullName)}
}
export type TDriver = {licenseNumber:string;licenseSeries:string;licenseIssuedAt:Date;licenseExpiresAt?:Date;inn?:string;simpleSignIdMethod?:string;contacts?:TContacts[];fullName:TPersonFullName;waybills:TWaybill[]}
export function formatDriver(data:TDriver) {
    if (!data.licenseNumber?.trim() || !data.licenseSeries?.trim() || !data.licenseIssuedAt) throw new TypeError('Нужны номер, серия и дата ВУ водителя')
    if (!data.waybills?.length) throw new TypeError('Водителю нужен путевой лист')
    return {"НомВУ":data.licenseNumber,"СерВУ":data.licenseSeries,"ДатаВыдВУ":formatDate(data.licenseIssuedAt),"ДатаОконВУ":data.licenseExpiresAt && formatDate(data.licenseExpiresAt),"ИННФЛ":data.inn,"СвСпИдПодп":data.simpleSignIdMethod,"СредСвяз":mapArrayIfNotEmpty(data.contacts,formatContacts),"ФИО":formatPersonFullNameFields(data.fullName),"ПутевойЛист":data.waybills.map(formatWaybill)}
}
export type TVehicles = {count:number;registrationNumber:string;specs:TVehicleSpecs;drivers:TDriver[]}
export function formatVehicles(data:TVehicles) {
    if (!data.drivers?.length) throw new TypeError('Не указаны водители')
    return {"Колво":data.count,"РегНомер":data.registrationNumber,"ПарТС":formatVehicleSpecs(data.specs),"СвВодит":data.drivers.map(formatDriver)}
}
export type TOtherConditions = {permitNumber?:string;permitIssuedAt?:Date;permitValidity?:string;permitId?:string;workRestRegime:string;route?:TRoute;acts?:TDocumentRequisites[]}
export function formatOtherConditions(data:TOtherConditions) {
    // Условие встроенного Schematron XSD: без ИдСР обязательны номер, дата и срок разрешения.
    if (!data.permitId && (!data.permitNumber || !data.permitIssuedAt || !data.permitValidity)) throw new TypeError('Нужен идентификатор спецразрешения либо номер, дата и срок')
    if (!data.workRestRegime?.trim()) throw new TypeError('Нужен режим труда и отдыха')
    return {"НомСР":data.permitNumber,"ДатаСР":data.permitIssuedAt && formatDate(data.permitIssuedAt),"СрокСР":data.permitValidity,"ИдСР":data.permitId,"РежТрОтд":data.workRestRegime,"СведМрш":data.route && formatRoute(data.route),"СвАкт":mapArrayIfNotEmpty(data.acts,formatDocumentRequisites)}
}
export type TPayment = {serviceCost:number;tollRoadCost?:number;customsCost?:number;cleaningCost?:number;calculation?:string;total?:number;infoField?:TInfoField[]}
export function formatPayment(data:TPayment) {
    return {"СтУсл":data.serviceCost.toFixed(2),"РасхПлатДор":data.tollRoadCost?.toFixed(2),"РасхТамПош":data.customsCost?.toFixed(2),"РасхПром":data.cleaningCost?.toFixed(2),"Расчет":data.calculation,"РазмерПлат":data.total?.toFixed(2),"ИнфПол":mapArrayIfNotEmpty(data.infoField,formatInfoField)}
}
export type TFreighterContent = {orderId:string;freighter:TFreighter;acceptance:TAcceptance;vehicles:TVehicles;otherConditions:TOtherConditions[];payment?:TPayment;infoField?:TInfoField[]}
export function formatFreighterContent(data:TFreighterContent) {
    if (!data.orderId?.trim() || data.orderId.length>1000) throw new TypeError('Не указан УИД заказа-наряда')
    if (!data.otherConditions?.length) throw new TypeError('Нужны прочие условия заказа-наряда')
    return {"УИД_ЗН":data.orderId,"СвФщ":formatFreighter(data.freighter),"СвПринЗНИсп":formatAcceptance(data.acceptance),"СвТС":formatVehicles(data.vehicles),"СвПрочУсл":data.otherConditions.map(formatOtherConditions),"СвРазПлатТС":data.payment && formatPayment(data.payment),"ИнфПол":mapArrayIfNotEmpty(data.infoField,formatInfoField)}
}
export type {TPersonFullName,TContacts,TInfoField,TLegalEntity,TWaybill,TVehicleSpecs,TRoute,TDocumentRequisites}
