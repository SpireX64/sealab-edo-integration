/** Участники договора фрахтования. */
import { formatPersonFullNameFields,type TPersonFullName } from '../../../common/PersonFullName'
import { formatContacts,type TContacts } from '../../../common/Contacts'
import { formatAddress,type TAddress } from './Address'
export type TIndividual = {inn:string;fullName:TPersonFullName;contacts:TContacts}
export function formatIndividual(data:TIndividual) {return {"ИННФЛ":data.inn,"ФИО":formatPersonFullNameFields(data.fullName),"Конт":formatContacts(data.contacts)}}
export type TSoleProprietor = TIndividual & {ogrnip?:string}
export function formatSoleProprietor(data:TSoleProprietor) {return {"ИННФЛ":data.inn,"ОГРНИП":data.ogrnip,"ФИО":formatPersonFullNameFields(data.fullName),"Конт":formatContacts(data.contacts)}}
export type TLegalEntity = {name:string;inn?:string;otherDetails?:string;address:TAddress;contacts:TContacts}
export function formatLegalEntity(data:TLegalEntity) {return {"НаимОрг":data.name,"ИННЮЛ":data.inn,"ИныеСвед":data.otherDetails,"АдрМН":formatAddress(data.address),"Контакт":formatContacts(data.contacts)}}
export type TCharterer = {kind:'individual';individual:TIndividual}|{kind:'legalEntity';legalEntity:TLegalEntity}
export function formatCharterer(data:TCharterer) {return data.kind==='individual'?{"СвФЛ":formatIndividual(data.individual)}:{"СвЮЛ":formatLegalEntity(data.legalEntity)}}
export type TFreighter = {kind:'soleProprietor';soleProprietor:TSoleProprietor}|{kind:'legalEntity';legalEntity:TLegalEntity}
export function formatFreighter(data:TFreighter) {return data.kind==='soleProprietor'?{"СвИП":formatSoleProprietor(data.soleProprietor)}:{"СвЮЛ":formatLegalEntity(data.legalEntity)}}
