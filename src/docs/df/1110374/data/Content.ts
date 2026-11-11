/** Транспорт и водители согласованного договора фрахтования. */
import { formatDate,mapArrayIfNotEmpty } from '../../../../helpers'
import { formatContacts,type TContacts } from '../../../common/Contacts'
import { formatPersonFullNameFields,type TPersonFullName } from '../../../common/PersonFullName'
import { formatInfoField,type TInfoField } from '../../../common/InfoField'
export type TWaybill = {name:string;number:string;issuedAt?:Date;validity:string}
export function formatWaybill(data:TWaybill) {
    if (!data.number?.trim() || data.number.length>36) throw new TypeError('Номер путевого листа должен содержать 1–36 символов')
    return {"НаимПЛ":data.name,"НомерПЛ":data.number,"ДатаВыпПЛ":data.issuedAt && formatDate(data.issuedAt),"СвСрокПЛ":data.validity}
}
export type TDriver = {licenseNumber:string;licenseSeries:string;licenseIssuedAt:Date;licenseExpiresAt?:Date;inn?:string;contacts?:TContacts;fullName:TPersonFullName;waybill:TWaybill}
export function formatDriver(data:TDriver) {
    if (!data.licenseNumber?.trim() || !data.licenseSeries?.trim() || !data.licenseIssuedAt) throw new TypeError('Нужны номер, серия и дата ВУ')
    return {"НомВУ":data.licenseNumber,"СерВУ":data.licenseSeries,"ДатаВыдВУ":formatDate(data.licenseIssuedAt),"ДатаОконВУ":data.licenseExpiresAt && formatDate(data.licenseExpiresAt),"ИННФЛ":data.inn,"СредСвяз":data.contacts && formatContacts(data.contacts),"ФИО":formatPersonFullNameFields(data.fullName),"ПутевойЛист":formatWaybill(data.waybill)}
}
export type TVehicle = {registrationNumber:string;brand:string;capacityTons:number;volume:number;drivers:TDriver[]}
export function formatVehicle(data:TVehicle) {
    if (!data.drivers?.length) throw new TypeError('Для ТС нужны водители')
    return {"РегНомер":data.registrationNumber,"ПарТС":{"Марка":data.brand,"Грузопод":data.capacityTons.toFixed(2),"Вместим":data.volume.toFixed(2)},"СвВодит":data.drivers.map(formatDriver)}
}
export type TFreighterContent = {charterId:string;otherConditions?:string;vehicles?:TVehicle[];infoField?:TInfoField[]}
export function formatFreighterContent(data:TFreighterContent) {
    if (!data.charterId?.trim() || data.charterId.length>36) throw new TypeError('УИД договора должен содержать 1–36 символов')
    return {"УИД_ДФ":data.charterId,"ИныеУслв":data.otherConditions,"СвТС":mapArrayIfNotEmpty(data.vehicles,formatVehicle),"ИнфПол":mapArrayIfNotEmpty(data.infoField,formatInfoField)}
}
export type {TContacts,TPersonFullName,TInfoField}
