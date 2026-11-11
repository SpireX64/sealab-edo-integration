import {formatDate,mapArrayIfNotEmpty} from '../../../../helpers'
import {formatInfoField,type TInfoField} from '../../../common/InfoField'
import {formatConcreteAddress,type TConcreteAddress} from '../../1110486/data/Address'
import {formatDocumentRequisites,formatCorrection,type TDocumentRequisites,type TCorrection} from '../../1110486/data/DocumentRequisites'
import {formatParticipant,type TParticipant} from './Party'
import {formatConsignment,type TConsignment} from './Cargo'
export type TWarehouse={ownedByForwarder:boolean;address:TConcreteAddress;owner?:TParticipant}
export function formatWarehouse(data:TWarehouse) {
    if (typeof data.ownedByForwarder!=='boolean' || (!data.ownedByForwarder && !data.owner)) throw new TypeError('Нужны сведения о стороннем владельце склада')
    return {ВладСкладЭксп:data.ownedByForwarder?'1':'0',АдрСклад:formatConcreteAddress(data.address),СвВладСклад:data.owner && formatParticipant(data.owner)}
}
export type TWarehouseReceiptContent={id?:string;originalFileId?:string;previousReceiptId?:string;number:string;issuedAt:Date;registryNumber:string;registryDate:Date;instructionId:string;forwardingReceiptId?:string;consignment:TConsignment;client:TParticipant;forwarder:TParticipant;contract:TDocumentRequisites;accompanyingDocuments?:TDocumentRequisites[];warehouse:TWarehouse;correction?:TCorrection;infoField?:TInfoField[]}
export function formatWarehouseReceiptContent(data:TWarehouseReceiptContent) {
    if (data.correction && (!data.id || !data.originalFileId)) throw new TypeError('Исправление требует УИД расписки и исходный файл')
    return {УИД_СкладР:data.id,СодОпер:'выдача электронной складской расписки',ИдИсхФайл:data.originalFileId,УИД_ПредСкладР:data.previousReceiptId,НомДок:data.number,ДатаДок:formatDate(data.issuedAt),НомРеестр:data.registryNumber,ДатаРеестр:formatDate(data.registryDate),УИД_ПорЭксп:data.instructionId,УИД_ЭкспРас:data.forwardingReceiptId,СвГруз:formatConsignment(data.consignment),СвКлнт:formatParticipant(data.client),СвЭксп:formatParticipant(data.forwarder),ДогТрЭксп:formatDocumentRequisites(data.contract),СопрДок:mapArrayIfNotEmpty(data.accompanyingDocuments,formatDocumentRequisites),СведСклад:formatWarehouse(data.warehouse),ИспрФО:data.correction && formatCorrection(data.correction),ИнфПол:mapArrayIfNotEmpty(data.infoField,formatInfoField)}
}
