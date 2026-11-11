/** Реквизиты документа 277@: название, номер и дата обязательны даже при наличии ID. */
import { formatDate,mapArrayIfNotEmpty } from '../../../../helpers'
import { formatForeignParty,type TForeignParty } from './Party'
export type TIssuer = {kind:'legalEntity'|'individual';inn:string}|{kind:'foreign';foreign:TForeignParty}|{kind:'authority';name:string}
export function formatIssuer(data:TIssuer) {
    switch(data.kind) {case 'legalEntity':return {"ИННЮЛ":[data.inn]};case 'individual':return {"ИННФЛ":[data.inn]};case 'foreign':return {"ДаннИно":formatForeignParty(data.foreign)};case 'authority':return {"НаимОИВ":[data.name]};default:throw new TypeError('Не указан вид составителя')}
}
export type TDocumentRequisites = {name:string;number:string;issuedAt:Date;fileId?:string;id?:string;storageSystem?:string;storageUrl?:string;additionalInfo?:string;issuers?:TIssuer[]}
export function formatDocumentRequisites(data:TDocumentRequisites) {
    if (!data.name?.trim() || !data.number?.trim() || !data.issuedAt) throw new TypeError('Нужны название, номер и дата документа')
    return {"РеквНаимДок":data.name,"РеквНомерДок":data.number,"РеквДатаДок":formatDate(data.issuedAt),"РеквИдФайлДок":data.fileId,"РеквИдДок":data.id,"РИдСистХранД":data.storageSystem,"РеквУРЛСистДок":data.storageUrl,"РеквДопСведДок":data.additionalInfo,"РеквИдРекСост":mapArrayIfNotEmpty(data.issuers,formatIssuer)}
}
export type TCorrection = {previousFileId:string;number:number;issuedAt:Date}
export function formatCorrection(data:TCorrection) {return {"ИдПредФайлИспр":data.previousFileId,"НомИспр":data.number,"ДатаИспр":formatDate(data.issuedAt)}}
