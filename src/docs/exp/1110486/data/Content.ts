/** Поручение клиента: партии груза и договор транспортной экспедиции. */
import { formatDate,mapArrayIfNotEmpty } from '../../../../helpers'
import { formatInfoField,type TInfoField } from '../../../common/InfoField'
import { formatValue,type TValue } from './Cargo'
import { formatConsignment,type TConsignment } from './Consignment'
import { formatParticipant,type TParticipant } from './Party'
import { formatDocumentRequisites,formatCorrection,type TDocumentRequisites,type TCorrection } from './DocumentRequisites'
export type TInstructionContent = {id?:string;originalFileId?:string;withdrawnInstructionId?:string;number:string;issuedAt:Date;hasAccompanyingDocuments:boolean;declaredValue?:TValue;actualValue?:TValue;clientNotes?:string[];consignments:TConsignment[];client:TParticipant;forwarder:TParticipant;contract:TDocumentRequisites;transportRequests?:TDocumentRequisites[];correction?:TCorrection;accompanyingDocuments?:TDocumentRequisites[];infoField?:TInfoField[]}
export function formatInstructionContent(data:TInstructionContent) {
    if (data.declaredValue && data.actualValue) throw new TypeError('Указывается либо объявленная, либо действительная стоимость')
    if (!data.number?.trim() || !data.consignments?.length) throw new TypeError('Нужны номер поручения и партии груза')
    if (typeof data.hasAccompanyingDocuments!=='boolean' || data.hasAccompanyingDocuments!==Boolean(data.accompanyingDocuments?.length)) throw new TypeError('Сопроводительные документы должны соответствовать признаку ДокГруз')
    if (data.correction && (!data.id || !data.originalFileId)) throw new TypeError('Исправление требует УИД поручения и исходный файл')
    if (!data.correction && data.originalFileId) throw new TypeError('Исходный файл указывается только для исправления')
    return {"УИД_ПорЭксп":data.id,"СодОпер":"представление электронного поручения экспедитору","ИдИсхФайл":data.originalFileId,"УИД_ПорЭкспОтз":data.withdrawnInstructionId,"НомДок":data.number,"ДатаДок":formatDate(data.issuedAt),"ДокГруз":data.hasAccompanyingDocuments?'1':'0',"ОбщОбъявлСтГруз":data.declaredValue && formatValue(data.declaredValue),"ОбщДейстСтГруз":data.actualValue && formatValue(data.actualValue),"ИныеДанКлнт":data.clientNotes,"СвГруз":data.consignments.map(formatConsignment),"СвКлнт":formatParticipant(data.client),"СвЭксп":formatParticipant(data.forwarder),"ДогТрЭксп":formatDocumentRequisites(data.contract),"РеквЗаявТранс":mapArrayIfNotEmpty(data.transportRequests,formatDocumentRequisites),"ИспрФО":data.correction && formatCorrection(data.correction),"СопрДок":mapArrayIfNotEmpty(data.accompanyingDocuments,formatDocumentRequisites),"ИнфПол":mapArrayIfNotEmpty(data.infoField,formatInfoField)}
}
