/** Содержание заказа-наряда фрахтователя. */
import { formatDate, formatDateTimeWithUtc, mapArrayIfNotEmpty } from '../../../../helpers'
import { formatInfoField, type TInfoField } from '../../../common/InfoField'
import { formatCorrection, type TCorrection } from '../../../esv/1110347/data/Content'
import { formatIndividual,formatLegalEntity,type TIndividual,type TLegalEntity } from '../../../esv/1110347/data/Party'
import { formatConcreteAddress,type TConcreteAddress } from './Address'
import { formatDocumentRequisites,type TDocumentRequisites } from './DocumentRequisites'
import { formatCargo,type TCargo } from './Cargo'
export type TCharterer = {kind:'individual';individual:TIndividual}|{kind:'legalEntity';legalEntity:TLegalEntity}
export function formatCharterer(data:TCharterer) {
    return data.kind==='individual'?{"ФтФЛ":formatIndividual(data.individual)}:{"ФтЮЛ":formatLegalEntity(data.legalEntity)}
}
export type TCharterConditions = {loadingAndCleaningProcedure:string;vehicleNotProvidedPenalty?:number;useRefusedPenalty?:number}
export function formatCharterConditions(data:TCharterConditions) {
    return {"ПорядОсущ":data.loadingAndCleaningProcedure,"РазШтрНеПрТС":data.vehicleNotProvidedPenalty?.toFixed(2),"РазШтрОткПол":data.useRefusedPenalty?.toFixed(2)}
}
export type TAccompanyingDocuments = {orderDocuments:TDocumentRequisites[];cargoDocuments:TDocumentRequisites[];statement?:TDocumentRequisites}
export function formatAccompanyingDocuments(data:TAccompanyingDocuments) {
    if (!data.orderDocuments?.length || !data.cargoDocuments?.length) throw new TypeError('Блок приложений требует документы к заказу-наряду и грузу')
    return {"ДокКЗН":data.orderDocuments.map(formatDocumentRequisites),"ДокКГр":data.cargoDocuments.map(formatDocumentRequisites),"РекСопрВед":data.statement && formatDocumentRequisites(data.statement)}
}
export type TVehicleSpecs = {type:string;brand:string;capacityTons:number;volume:number}
export function formatVehicleSpecs(data:TVehicleSpecs) {
    return {"Тип":data.type,"Марка":data.brand,"Грузопод":data.capacityTons.toFixed(2),"Вместим":data.volume.toFixed(2)}
}
export type TChartererInstructions = {transportRules?:string;vehicle:TVehicleSpecs;infoField?:TInfoField[]}
export function formatChartererInstructions(data:TChartererInstructions) {
    return {"УкНормПрвз":data.transportRules,"ПарТС":formatVehicleSpecs(data.vehicle),"ИнфПол":mapArrayIfNotEmpty(data.infoField,formatInfoField)}
}
export type TRoute = {text?:string;machineReadable?:string}
export function formatRoute(data:TRoute) {
    if (!data.text?.trim() && !data.machineReadable?.trim()) throw new TypeError('Нужен текстовый или машиночитаемый маршрут')
    return {"МршТекст":data.text,"МршМашЧит":data.machineReadable}
}
export type TVehicleSubmission = {submittedAt:Date;route:TRoute;address:TConcreteAddress}
export function formatVehicleSubmission(data:TVehicleSubmission) {
    const at=formatDateTimeWithUtc(data.submittedAt)
    return {"ДатВрПодТС":at.dateTime,"НалКоорТочВрПодТС":at.utc,"МршПрвз":formatRoute(data.route),"АдрМесПодТС":formatConcreteAddress(data.address)}
}
export type TChartererContent = {orderId?:string;number:string;issuedAt:Date;durationHours:number;correction?:TCorrection;charterer:TCharterer;conditions:TCharterConditions;cargo:TCargo;documents?:TAccompanyingDocuments;instructions:TChartererInstructions;submission:TVehicleSubmission;infoField?:TInfoField[]}
export function formatChartererContent(data:TChartererContent) {
    if (!Number.isInteger(data.durationHours) || data.durationHours<0 || String(data.durationHours).length>5) throw new TypeError('Срок пользования ТС — целые часы, до 5 цифр')
    return {"УИД_ЗН":data.orderId,"НомерЗН":data.number,"ДатаЗН":formatDate(data.issuedAt),"СвСрокВыпПрвз":String(data.durationHours),"ИспрЗН":data.correction && formatCorrection(data.correction),"СвФт":formatCharterer(data.charterer),"СвУслФрах":formatCharterConditions(data.conditions),"СвГруз":formatCargo(data.cargo),"СопрДок":data.documents && formatAccompanyingDocuments(data.documents),"СвУказФт":formatChartererInstructions(data.instructions),"СвМршПодТС":formatVehicleSubmission(data.submission),"ИнфПол":mapArrayIfNotEmpty(data.infoField,formatInfoField)}
}
export type {TCorrection,TIndividual,TLegalEntity,TInfoField}
