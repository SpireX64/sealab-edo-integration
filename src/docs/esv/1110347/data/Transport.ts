/** Передача контейнеров, перевозчик и транспорт ЭСВ. */
import { formatDate, formatDateTimeWithUtc, mapArrayIfNotEmpty } from '../../../../helpers'
import { formatPersonFullNameFields, type TPersonFullName } from '../../../common/PersonFullName'
import { formatConcreteAddress, type TConcreteAddress } from '../../../etrn/1110343/data/9.23-ConcreteAddress'
import { formatInfoField, type TInfoField } from '../../../common/InfoField'
import { formatDocumentRequisites, type TDocumentRequisites } from '../../../etrn/common/DocumentRequisites'
import { formatLegalEntity, formatSoleProprietor, formatResponsiblePerson, type TLegalEntity, type TSoleProprietor, type TResponsiblePerson } from './Party'
import { VehicleOwnershipType, IssuerType } from '../consts'
export type TContainerTransfer = {loadingAddress?:TConcreteAddress;unloadingAddress?:TConcreteAddress;vehicleLoadingAt?:Date;vehicleUnloadingAt?:Date}
export type TWaybill = {name:string;number:string;issuedAt?:Date;validity:string}
export type TDriver = {licenseNumber?:string;licenseSeries?:string;licenseIssuedAt?:Date;licenseExpiresAt?:Date;inn?:string;simpleSignIdMethod?:string;phones?:string[];fullName:TPersonFullName}
export type TCarrier = ({kind:'soleProprietor';soleProprietor:TSoleProprietor}|{kind:'legalEntity';legalEntity:TLegalEntity}) & {responsible:TResponsiblePerson;drivers:TDriver[];waybills:TWaybill[]}
export type TVehicle = {stsNumber?:string;vin?:string;regNumber:string;ownershipType?:VehicleOwnershipType;specs:{type:string;brand:string;capacityTons:number;volume?:number};ownershipDocument?:TDocumentRequisites}
export type TVehicles = {vehicle:TVehicle;trailers?:TVehicle[];infoField?:TInfoField[]}
export function formatContainerTransfer(data:TContainerTransfer) {
    const loading=data.vehicleLoadingAt && formatDateTimeWithUtc(data.vehicleLoadingAt)
    const unloading=data.vehicleUnloadingAt && formatDateTimeWithUtc(data.vehicleUnloadingAt)
    return {"ДатТСПогр":loading?.dateTime,"НалКоорТочВрТСПогр":loading?.utc,"ДатТСВыгр":unloading?.dateTime,"НалКоорТочВрТСВыгр":unloading?.utc,"АдрМП":data.loadingAddress && formatConcreteAddress(data.loadingAddress),"АдрМВ":data.unloadingAddress && formatConcreteAddress(data.unloadingAddress)}
}
export function formatDriver(data:TDriver) {
    return {"НомерВУ":data.licenseNumber,"СерияВУ":data.licenseSeries,"ДатаВыдВУ":data.licenseIssuedAt && formatDate(data.licenseIssuedAt),"ДатаОконВУ":data.licenseExpiresAt && formatDate(data.licenseExpiresAt),"ИННФЛ":data.inn,"СвСпИдПодп":data.simpleSignIdMethod,"Тлф":data.phones,"ФИО":formatPersonFullNameFields(data.fullName)}
}
export function formatWaybill(data:TWaybill) {
    return {"НаимПЛ":data.name,"НомерПЛ":data.number,"ДатаВыпПЛ":data.issuedAt && formatDate(data.issuedAt),"СвСрокПЛ":data.validity}
}
export function formatCarrier(data:TCarrier) {
    if (!data.drivers?.length || !data.waybills?.length) throw new TypeError("Перевозчику нужны водитель и путевой лист")
    return {...(data.kind==='soleProprietor'?{"ПрвИП":formatSoleProprietor(data.soleProprietor)}:{"ПрвЮЛ":formatLegalEntity(data.legalEntity)}),"СвОтвПрвз":formatResponsiblePerson(data.responsible,false),"СвВодит":data.drivers.map(formatDriver),"ПутевойЛист":data.waybills.map(formatWaybill)}
}
export function formatVehicle(data:TVehicle) {
    const needsBasis=data.ownershipType!==undefined && [VehicleOwnershipType.Lease,VehicleOwnershipType.Leasing,VehicleOwnershipType.GratuitousUse].includes(data.ownershipType)
    if (needsBasis && !data.ownershipDocument) throw new TypeError("Нужно основание аренды/лизинга/безвозмездного пользования ТС")
    if (needsBasis && data.ownershipDocument?.issuerRequisites.some(p=>p.issuerType===IssuerType.ForeignEntity)) throw new TypeError("Иностранный составитель основания владения недопустим при аренде/лизинге")
    return {"НомСТС":data.stsNumber,"НомерВИН":data.vin,"РегНомер":data.regNumber,"ТипВлад":data.ownershipType===undefined?undefined:String(data.ownershipType),"ПарТС":{"Тип":data.specs.type,"Марка":data.specs.brand,"Грузопод":data.specs.capacityTons.toFixed(2),"Вместим":data.specs.volume?.toFixed(2)},"ОснАрЛиз":data.ownershipDocument && formatDocumentRequisites(data.ownershipDocument)}
}
export function formatVehicles(data:TVehicles) {
    return {"ТС":formatVehicle(data.vehicle),"Прицеп":mapArrayIfNotEmpty(data.trailers,formatVehicle),"ИнфПол":mapArrayIfNotEmpty(data.infoField,formatInfoField)}
}
export type {TConcreteAddress,TInfoField,TDocumentRequisites}
