import {formatDate,formatTime,mapArrayIfNotEmpty} from '../../../../helpers'
import {formatPersonFullNameFields,type TPersonFullName} from '../../../common/PersonFullName'
import {formatInfoField,type TInfoField} from '../../../common/InfoField'
import {formatDocumentRequisites,formatCorrection,type TDocumentRequisites,type TCorrection} from '../../1110486/data/DocumentRequisites'
import {formatParticipant,type TParticipant} from './Party'
import {ExecutionMode,TransportMode,VatRate} from '../consts'
export type TClientFileId={fileId:string;createdAt:Date;signBase64:string}
export function formatClientFileId(data:TClientFileId) {return {ИдФайлИнфКлнт:data.fileId,ДатФайлИнфКлнт:formatDate(data.createdAt),ВрФайлИнфКлнт:formatTime(data.createdAt),ЭП:[data.signBase64]}}
/** Сумма услуги уже включает НДС; неизвестная сумма налога не вычисляется. */
export type TPayment={amountIncludingVat:number;vatRate:VatRate;currencyCode:string;currencyName:string;vatAmount?:number|'без НДС';document?:TDocumentRequisites}
export function formatPayment(data:TPayment) {
    if (!Object.values(VatRate).includes(data.vatRate)) throw new TypeError('Ставка НДС отсутствует в формате 1110487')
    if (!Number.isFinite(data.amountIncludingVat) || data.amountIncludingVat<0 || (typeof data.vatAmount==='number' && (!Number.isFinite(data.vatAmount) || data.vatAmount<0))) throw new TypeError('Суммы должны быть неотрицательными числами')
    return {ОбщСтУсл:data.amountIncludingVat.toFixed(2),НалСт:data.vatRate,КодОКВ:data.currencyCode,НаимОКВ:data.currencyName,СумНал:data.vatAmount===undefined?undefined:data.vatAmount==='без НДС'?{БезНДС:['без НДС']}:{СумНал:[data.vatAmount.toFixed(2)]},ДокОплУсл:data.document && formatDocumentRequisites(data.document)}
}
export type TDriver={licenseNumber?:string;licenseSeries?:string;licenseIssuedAt?:Date;inn?:string;identificationInfo?:string;phones:string[];fullName:TPersonFullName;waybill?:TDocumentRequisites}
export function formatDriver(data:TDriver) {
    if (!data.inn && !(data.licenseNumber && data.licenseSeries && data.licenseIssuedAt)) throw new TypeError('Водителю нужен ИНН либо номер, серия и дата ВУ')
    if (!data.phones?.length) throw new TypeError('Нужен телефон водителя')
    return {НомВУ:data.licenseNumber,СерВУ:data.licenseSeries,ДатаВыдВУ:data.licenseIssuedAt && formatDate(data.licenseIssuedAt),ИННФЛ:data.inn,СвСпИдПодп:data.identificationInfo,Тлф:data.phones,ФИО:formatPersonFullNameFields(data.fullName),ПутевойЛист:data.waybill && formatDocumentRequisites(data.waybill)}
}
export type TVehicle={mode:TransportMode;bodyType?:string;registrationNumber?:string;brand?:string;model?:string;drivers?:TDriver[]}
export function formatVehicle(data:TVehicle) {
    if (![1,2,3,4,5].includes(data.mode)) throw new TypeError('Не указан вид транспорта')
    if (data.bodyType!==undefined && data.mode!==1 && data.mode!==4) throw new TypeError('Кузов допустим только для автомобильного и железнодорожного транспорта')
    if (data.mode!==1 && (data.registrationNumber!==undefined || data.brand!==undefined || data.model!==undefined || data.drivers?.length)) throw new TypeError('Номер, марка, модель и водители доступны только автомобильному транспорту')
    return {ВидТС:String(data.mode),ТипКузов:data.bodyType,РегНомер:data.registrationNumber,Марка:data.brand,Модель:data.model,СвВодит:mapArrayIfNotEmpty(data.drivers,formatDriver)}
}
export type TTransportation={route:string;vehicles?:TVehicle[]}
export type TService={executionMode:ExecutionMode;id?:string;name:string;code?:string;description?:string;unitCode?:string;unitName?:string;quantity?:number;consignmentIds?:string[];consignmentNumbers?:string[];thirdParty?:{participant:TParticipant;authority?:TDocumentRequisites};payment?:TPayment;transportation?:TTransportation[];supplyOrders?:TDocumentRequisites[];infoField?:TInfoField[]}
export function formatService(data:TService) {
    if (![1,2,3].includes(data.executionMode) || (data.executionMode===ExecutionMode.Personally && data.thirdParty)) throw new TypeError('Третье лицо допустимо только при привлечении исполнителя или смешанном исполнении')
    if (data.unitCode && !data.unitName) throw new TypeError('Для ОКЕИ нужно название единицы')
    return {ПризнИсп:String(data.executionMode),ИдентУсл:data.id,НаимУсл:data.name,КодУсл:data.code,ХарактУсл:data.description,ОКЕИ_Усл:data.unitCode,НаимЕдИзм:data.unitName,КолУсл:data.quantity?.toFixed(2),ИдентПартГруз:data.consignmentIds,НомПартГруз:data.consignmentNumbers,СвПредстЭксп:data.thirdParty && {РекИдПредст:formatParticipant(data.thirdParty.participant),ОснОкУслИным:data.thirdParty.authority && formatDocumentRequisites(data.thirdParty.authority)},СвОплата:data.payment && formatPayment(data.payment),СвТрсГруз:mapArrayIfNotEmpty(data.transportation,t=>({МаршСлГруз:t.route,СвТСДост:mapArrayIfNotEmpty(t.vehicles,formatVehicle)})),РеквЗакПост:mapArrayIfNotEmpty(data.supplyOrders,formatDocumentRequisites),ИнфПол:mapArrayIfNotEmpty(data.infoField,formatInfoField)}
}
export type TForwarderContent={instructionId:string;registryNumber:string;registryDate:Date;originalFileId?:string;notes?:string[];services?:TService[];correction?:TCorrection;infoField?:TInfoField[]}
export function formatForwarderContent(data:TForwarderContent) {
    if (Boolean(data.correction)!==Boolean(data.originalFileId)) throw new TypeError('Исправление и исходный файл указываются вместе')
    return {УИД_ПорЭксп:data.instructionId,НомРеестр:data.registryNumber,ДатаРеестр:formatDate(data.registryDate),СодОпер:'согласование подлежащих оказанию транспортно-экспедиционных услуг и условий',ИдИсхФайл:data.originalFileId,ИныеДанЭксп:data.notes,ДопИнфЭксп:mapArrayIfNotEmpty(data.services,formatService),ИспрФО:data.correction && formatCorrection(data.correction),ИнфПол:mapArrayIfNotEmpty(data.infoField,formatInfoField)}
}
