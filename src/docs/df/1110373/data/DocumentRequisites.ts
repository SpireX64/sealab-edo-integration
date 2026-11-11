/** Реквизиты приложений договора фрахтования, включая все доступные данные нерезидента. */
import { formatDate } from '../../../../helpers'
import { formatForeignPersonIdDocument, type TForeignPersonIdDocument } from '../../../common/ForeignPersonIdDocument'
export type TForeignIssuer = {legalEntity:boolean;country?:string;name?:string;id?:string;extra?:string;idDocument?:TForeignPersonIdDocument}
export function formatForeignIssuer(data:TForeignIssuer) {
    if (data.legalEntity && (!data.country || (!data.name && !data.id && !data.extra))) throw new TypeError('Иностранному ЮЛ нужны страна и идентифицирующие сведения')
    if (!data.legalEntity && (!data.idDocument || !data.name)) throw new TypeError('Иностранному гражданину нужны имя и документ личности')
    return {"ИдСтат":data.legalEntity?'ИО':'ИГ',"Стран":data.country,"Наим":data.name,"Идентиф":data.id,"ИныеСвед":data.extra,"УдЛичнИГ":data.idDocument && formatForeignPersonIdDocument(data.idDocument)}
}
export type TIssuer = {kind:'legalEntity'|'individual';inn:string}|{kind:'foreign';foreign:TForeignIssuer}|{kind:'authority';name:string}
export function formatIssuer(data:TIssuer) {
    switch(data.kind) {
        case 'legalEntity':return {"ИННЮЛ":[data.inn]}
        case 'individual':return {"ИННФЛ":[data.inn]}
        case 'foreign':return {"ДаннИно":formatForeignIssuer(data.foreign)}
        case 'authority':return {"НаимОИВ":[data.name]}
        default:throw new TypeError('Не указан вид составителя документа')
    }
}
export type TDocumentRequisites = {name?:string;documentNumber?:string;documentDate?:Date;id?:string;additionalDetails?:string;issuers:TIssuer[]}
export function formatDocumentRequisites(data:TDocumentRequisites) {
    if (!data.issuers?.length) throw new TypeError('Нужны составители документа')
    if (!data.id && (!data.name || !data.documentNumber || !data.documentDate)) throw new TypeError('Нужен идентификатор либо название, номер и дата документа')
    return {"НаимДок":data.name,"НомерДок":data.documentNumber,"ДатаДок":data.documentDate && formatDate(data.documentDate),"ИдДок":data.id,"ДопСведДок":data.additionalDetails,"ИдРекСост":data.issuers.map(formatIssuer)}
}
