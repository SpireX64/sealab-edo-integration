import {formatDate,mapArrayIfNotEmpty} from '../../../../helpers'
import {formatPersonFullNameFields,type TPersonFullName} from '../../../common/PersonFullName'
import {formatInfoField,type TInfoField} from '../../../common/InfoField'
import {formatConcreteAddress,type TConcreteAddress} from '../../1110486/data/Address'
import {formatContacts,type TContacts} from '../../1110486/data/Party'
import {formatCorrection,type TCorrection} from '../../1110486/data/DocumentRequisites'
import {ReturnMethod} from '../consts'
export type TCargoReturn={method:ReturnMethod;from?:Date;to?:Date;timeRange?:string;contactPerson:TPersonFullName;contacts?:TContacts;address?:TConcreteAddress}
export function formatCargoReturn(data:TCargoReturn) {
    if (![1,2].includes(data.method)) throw new TypeError('Не указан способ возврата груза')
    if (data.timeRange!==undefined && !/^(?:[01]\d|2[0-3]):[0-5]\d-(?:[01]\d|2[0-3]):[0-5]\d[+-][01]\d:[0-5]\d$/.test(data.timeRange)) throw new TypeError('Диапазон возврата должен иметь формат ЧЧ:ММ-ЧЧ:ММ±ЧЧ:ММ')
    return {УслВозврГруз:String(data.method),ДатВозврС:data.from && formatDate(data.from),ДатВозврПо:data.to && formatDate(data.to),ВрВозвр:data.timeRange,КонтЛицо:formatPersonFullNameFields(data.contactPerson),Контакт:data.contacts && formatContacts(data.contacts),АдрПунктВозвр:data.address && formatConcreteAddress(data.address)}
}
export type TWithdrawalContent={instructionId:string;withdrawnOn:Date;originalFileId?:string;stoppedOn?:Date;stoppedTime?:string;reason?:string;actualExpenses?:number;cargoInstructions?:string;notes?:string[];cargoReturn?:TCargoReturn;correction?:TCorrection;infoField?:TInfoField[]}
export function formatWithdrawalContent(data:TWithdrawalContent) {
    if (Boolean(data.correction)!==Boolean(data.originalFileId)) throw new TypeError('Исправление и исходный файл указываются вместе')
    if (data.stoppedTime!==undefined && !/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d[+-][01]\d:[0-5]\d$/.test(data.stoppedTime)) throw new TypeError('Время прекращения должно иметь формат ЧЧ:ММ:СС±ЧЧ:ММ')
    if (data.actualExpenses!==undefined && !Number.isFinite(data.actualExpenses)) throw new TypeError('Фактические расходы должны быть числом')
    return {УИД_ПорЭксп:data.instructionId,СодОпер:'отзыв поручения экспедитору и обязательство возместить экспедитору фактические расходы',ИдИсхФайл:data.originalFileId,ДатаОтз:formatDate(data.withdrawnOn),ДатаПрИсп:data.stoppedOn && formatDate(data.stoppedOn),ВремяПрИсп:data.stoppedTime,ПричОтз:data.reason,СумФактРасх:data.actualExpenses?.toFixed(2),УказГруз:data.cargoInstructions,ИныеДанКлнт:data.notes,СвВозврГруз:data.cargoReturn && formatCargoReturn(data.cargoReturn),ИспрФО:data.correction && formatCorrection(data.correction),ИнфПол:mapArrayIfNotEmpty(data.infoField,formatInfoField)}
}
