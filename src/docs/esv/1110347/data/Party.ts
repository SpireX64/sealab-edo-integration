/** Участники ЭСВ и ответственные лица: структуры УчастникСВ*/
import { formatPersonFullNameFields, type TPersonFullName } from '../../../common/PersonFullName'
import { formatContacts, type TContacts } from '../../../common/Contacts'
import { formatAddress, type TAddress } from '../../../etrn/1110343/data/9.22-Address'

export type TIndividual = { inn: string; fullName: TPersonFullName; contacts: TContacts }
export type TSoleProprietor = { inn?: string; ogrnip?: string; fullName: TPersonFullName; contacts: TContacts }
export type TLegalEntity = { name: string; inn?: string; otherDetails?: string; address: TAddress; contacts: TContacts }
export type TParticipant = { kind:'individual'; individual:TIndividual } | { kind:'soleProprietor'; soleProprietor:TSoleProprietor } | { kind:'legalEntity'; legalEntity:TLegalEntity }
export type TResponsiblePerson = { fullName:TPersonFullName; residenceAddress?:TAddress; contacts:TContacts }
export type TResponsibleParty = {kind:'individual'; individual:TResponsiblePerson} | {kind:'legalEntity';legalEntity:TLegalEntity}
export type TShipper = { participant:TParticipant; loadingResponsible:TResponsibleParty }
export type TConsignee = { participant:TParticipant; receiptResponsible:TResponsibleParty }

export function formatIndividual(data:TIndividual) {
    return {"ИННФЛ":data.inn,"ФИО":formatPersonFullNameFields(data.fullName),"Конт":formatContacts(data.contacts)}
}
export function formatSoleProprietor(data:TSoleProprietor) {
    return {"ИННФЛ":data.inn,"ОГРНИП":data.ogrnip,"ФИО":formatPersonFullNameFields(data.fullName),"Конт":formatContacts(data.contacts)}
}
export function formatLegalEntity(data:TLegalEntity) {
    return {"НаимОрг":data.name,"ИННЮЛ":data.inn,"ИныеСвед":data.otherDetails,"АдрМН":formatAddress(data.address),"Контакт":formatContacts(data.contacts)}
}
export function formatResponsiblePerson(data:TResponsiblePerson, addressRequired:boolean) {
    if (addressRequired && !data.residenceAddress) throw new TypeError("Ответственному за погрузку физлицу нужен адрес места жительства")
    if (!addressRequired && data.residenceAddress) throw new TypeError("Адрес места жительства запрещён для ответственного за приём/перевозку")
    return {"ФИО":formatPersonFullNameFields(data.fullName),"АдрМЖ":data.residenceAddress && formatAddress(data.residenceAddress),"СредСвяз":formatContacts(data.contacts)}
}
function participantNode(data:TParticipant,prefix:'ГО'|'ГП') {
    switch(data.kind) {
        case 'individual':return {[`${prefix}_ФЛ`]:formatIndividual(data.individual)}
        case 'soleProprietor':return {[`${prefix}_ИП`]:formatSoleProprietor(data.soleProprietor)}
        case 'legalEntity':return {[`${prefix}_ЮЛ`]:formatLegalEntity(data.legalEntity)}
        default:throw new TypeError("Не указан вид участника ЭСВ")
    }
}
export function formatShipper(data:TShipper) {
    const responsible=data.loadingResponsible
    return {...participantNode(data.participant,'ГО'),...(responsible.kind==='individual'?{"ОтвПогрузФЛ":formatResponsiblePerson(responsible.individual,true)}:{"ОтвПогрузЮЛ":formatLegalEntity(responsible.legalEntity)})}
}
export function formatConsignee(data:TConsignee) {
    const responsible=data.receiptResponsible
    return {...participantNode(data.participant,'ГП'),...(responsible.kind==='individual'?{"ОтвПриемФЛ":formatResponsiblePerson(responsible.individual,false)}:{"ОтвПриемЮЛ":formatLegalEntity(responsible.legalEntity)})}
}
export type { TAddress, TContacts, TPersonFullName }
