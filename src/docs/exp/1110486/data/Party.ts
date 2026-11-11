/** Участники экспедиции: сведения, адрес, банк и контакты. */
import { formatDate } from '../../../../helpers'
import { formatPersonFullNameFields,type TPersonFullName } from '../../../common/PersonFullName'
import { formatAddress,type TAddress } from './Address'
export type TContacts = {phones?:string[];emails?:string[];otherContacts?:string}
export function formatContacts(data:TContacts) {
    if (!data.phones?.length && !data.emails?.length && !data.otherContacts?.trim()) throw new TypeError('Нужен хотя бы один способ связи')
    return {"Тлф":data.phones?.length?data.phones:undefined,"ЭлПочта":data.emails?.length?data.emails:undefined,"ИнКонт":data.otherContacts?[data.otherContacts]:undefined}
}
export type TForeignParty = {legalEntity:boolean;countryCode:string;countryName:string;name:string;id?:string;otherDetails?:string}
export function formatForeignParty(data:TForeignParty) {
    if (!data.id && !data.otherDetails) throw new TypeError('Иностранному участнику нужна идентификация или иные сведения')
    return {"ИдСтат":data.legalEntity?'ИО':'ИГ',"КодСтр":data.countryCode,"НаимСтран":data.countryName,"Наим":data.name,"Идентиф":data.id,"ИныеСвед":data.otherDetails}
}
export type TSoleProprietor = {inn:string;registrationDetails?:string;ogrnip?:string;ogrnipIssuedAt?:Date;otherDetails?:string;fullName:TPersonFullName}
export function formatSoleProprietor(data:TSoleProprietor) {return {"ИННФЛ":data.inn,"СвГосРегИП":data.registrationDetails,"ОГРНИП":data.ogrnip,"ДатаОГРНИП":data.ogrnipIssuedAt && formatDate(data.ogrnipIssuedAt),"ИныеСвед":data.otherDetails,"ФИО":formatPersonFullNameFields(data.fullName)}}
export type TLegalEntity = {name:string;inn:string;kpp?:string;ogrn?:string}
export function formatLegalEntity(data:TLegalEntity) {return {"НаимОрг":data.name,"ИННЮЛ":data.inn,"КПП":data.kpp,"ОГРН":data.ogrn}}
export type TIndividual = {inn?:string;otherDetails?:string;fullName?:TPersonFullName}
export function formatIndividual(data:TIndividual) {
    if (!data.fullName && !data.otherDetails) throw new TypeError('Физлицу нужны ФИО либо иные сведения')
    return {"ИННФЛ":data.inn,"ИныеСвед":data.otherDetails,"ФИО":data.fullName && formatPersonFullNameFields(data.fullName)}
}
export type TIdentification = {kind:'soleProprietor';soleProprietor:TSoleProprietor}|{kind:'legalEntity';legalEntity:TLegalEntity}|{kind:'foreign';foreign:TForeignParty}|{kind:'individual';individual:TIndividual}
export function formatIdentification(data:TIdentification) {
    switch(data.kind) {
        case 'soleProprietor':return {"СвИП":formatSoleProprietor(data.soleProprietor)}
        case 'legalEntity':return {"СвЮЛУч":formatLegalEntity(data.legalEntity)}
        case 'foreign':return {"СвИнНеУч":formatForeignParty(data.foreign)}
        case 'individual':return {"СвФЛУч":formatIndividual(data.individual)}
        default:throw new TypeError('Не указан вид участника')
    }
}
export type TBankDetails = {accountNumber:string;bank:{name:string;bik:string;correspondentAccount?:string}}
export function formatBankDetails(data:TBankDetails) {return {"НомерСчета":data.accountNumber,"СвБанк":{"НаимБанк":data.bank.name,"БИК":data.bank.bik,"КорСчет":data.bank.correspondentAccount}}}
export type TParticipant = {identification:TIdentification;okpo?:string;legalFormCode?:string;department?:string;participantInfo?:string;shortName?:string;address?:TAddress;bankDetails?:TBankDetails;contacts?:TContacts}
export function formatParticipant(data:TParticipant) {return {"ОКПО":data.okpo,"КодОПФ":data.legalFormCode,"СтруктПодр":data.department,"ИнфДляУчаст":data.participantInfo,"СокрНаим":data.shortName,"ИдСв":formatIdentification(data.identification),"Адрес":data.address && formatAddress(data.address),"БанкРекв":data.bankDetails && formatBankDetails(data.bankDetails),"Контакт":data.contacts && formatContacts(data.contacts)}}
export type {TPersonFullName,TAddress}
