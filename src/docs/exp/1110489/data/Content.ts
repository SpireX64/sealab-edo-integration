import {formatDate,mapArrayIfNotEmpty} from '../../../../helpers'
import {formatInfoField,type TInfoField} from '../../../common/InfoField'
import {formatConcreteAddress,type TConcreteAddress} from '../../1110486/data/Address'
import {formatWeight,formatValue,type TWeight,type TValue} from '../../1110486/data/Cargo'
import {formatDocumentRequisites,formatCorrection,type TDocumentRequisites,type TCorrection} from '../../1110486/data/DocumentRequisites'
import {formatParticipant,type TParticipant} from './Party'
import {formatConsignment,validateValue,type TConsignment} from './Cargo'
import {InfrastructureOwner,LoadingParty} from '../consts'
export type TInfrastructure={owner:InfrastructureOwner;unknownReason?:string;participant?:TParticipant}
export function formatInfrastructure(data:TInfrastructure) {
    if (![1,2,3].includes(data.owner) || (data.owner===InfrastructureOwner.Unknown && !data.unknownReason?.trim()) || (data.owner===InfrastructureOwner.Other && !data.participant)) throw new TypeError('Нужны владелец инфраструктуры или причина отсутствия информации')
    return {СовпГОВ:String(data.owner),ОбНетИнфОВлад:data.unknownReason,РекВладИнф:data.participant && formatParticipant(data.participant)}
}
export type TLoadingPerson={party:LoadingParty;authority?:TDocumentRequisites}
export function formatLoadingPerson(data:TLoadingPerson) {
    if (![1,2,3].includes(data.party) || (data.party===LoadingParty.Carrier && !data.authority)) throw new TypeError('При погрузке перевозчиком нужно основание полномочий')
    return {ЛицоПогруз:String(data.party),РеквДокЛицо:data.authority && formatDocumentRequisites(data.authority)}
}
export type TReceiptContent={id?:string;originalFileId?:string;previousReceiptId?:string;number:string;issuedAt:Date;registryNumber:string;registryDate:Date;instructionId:string;receivedOn:Date;receivedTime?:string;packageCount?:number;valueAvailable:boolean;weight?:TWeight;declaredValue?:TValue;actualValue?:TValue;consignments:TConsignment[];receiptAddress?:TConcreteAddress;client:TParticipant;forwarder:TParticipant;shipper:TParticipant;contract:TDocumentRequisites;accompanyingDocuments?:TDocumentRequisites[];infrastructure?:TInfrastructure;acceptingPerson?:TParticipant;acceptanceAuthority?:TDocumentRequisites;loadingPerson?:TLoadingPerson;correction?:TCorrection;infoField?:TInfoField[]}
export function formatReceiptContent(data:TReceiptContent) {
    validateValue(data)
    if (!data.consignments?.length) throw new TypeError('Нужны партии принятого груза')
    if (data.correction && (!data.id || !data.originalFileId)) throw new TypeError('Исправление требует УИД расписки и исходный файл')
    if (data.acceptingPerson && !data.acceptanceAuthority) throw new TypeError('Принимающему лицу нужны полномочия')
    if (data.receivedTime!==undefined && !/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(data.receivedTime)) throw new TypeError('Время приёмки должно иметь формат ЧЧ:ММ:СС')
    return {УИД_ЭкспР:data.id,СодОпер:'груз принят во владение экспедитором',ИдИсхФайл:data.originalFileId,УИД_ПредЭкспР:data.previousReceiptId,НомДок:data.number,ДатаДок:formatDate(data.issuedAt),НомРеестр:data.registryNumber,ДатаРеестр:formatDate(data.registryDate),УИД_ПорЭксп:data.instructionId,ФДатПол:formatDate(data.receivedOn),ФВрПол:data.receivedTime,КолМестГрВсего:data.packageCount,ВозмУкОбщСтГруз:data.valueAvailable?'1':'0',ВесГрВсего:data.weight && formatWeight(data.weight),ОбъявлСтГрВсего:data.declaredValue && formatValue(data.declaredValue),ДейстСтГрВсего:data.actualValue && formatValue(data.actualValue),СвГруз:data.consignments.map(formatConsignment),АдрПриемГруз:data.receiptAddress && formatConcreteAddress(data.receiptAddress),СвКлнт:formatParticipant(data.client),СвЭксп:formatParticipant(data.forwarder),СвГО:formatParticipant(data.shipper),ДогТрЭксп:formatDocumentRequisites(data.contract),СопрДок:mapArrayIfNotEmpty(data.accompanyingDocuments,formatDocumentRequisites),ВладИнфр:data.infrastructure && formatInfrastructure(data.infrastructure),СвЛицПриемГр:data.acceptingPerson && formatParticipant(data.acceptingPerson),ОснДовПриемГр:data.acceptanceAuthority && formatDocumentRequisites(data.acceptanceAuthority),СвЛицПогрГр:data.loadingPerson && formatLoadingPerson(data.loadingPerson),ИспрФО:data.correction && formatCorrection(data.correction),ИнфПол:mapArrayIfNotEmpty(data.infoField,formatInfoField)}
}
