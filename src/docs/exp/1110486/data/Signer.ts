/** Подписант 277@: УКЭП или УНЭП, доверенность со своим набором обязательных реквизитов. */
import { formatDate,mapArrayIfNotEmpty } from '../../../../helpers'
import { AuthorityConfirmationMethod,SignatureType,formatAuthorityConfirmationMethod } from '../consts'
import { formatPersonFullNameFields,type TPersonFullName } from '../../../common/PersonFullName'
export type TElectronicPOA = {number:string;issuedAt:Date;internalNumber:string;registeredAt?:Date;storageSystem:string;storageUrl?:string}
export function formatElectronicPOA(data:TElectronicPOA) {
    if (data.number?.length!==36 || !data.internalNumber?.trim() || !data.storageSystem?.trim()) throw new TypeError('МЧД требует GUID, внутренний номер и систему хранения')
    return {"НомДовер":data.number,"ДатаВыдДовер":formatDate(data.issuedAt),"ВнНомДовер":data.internalNumber,"ДатаВнРегДовер":data.registeredAt && formatDate(data.registeredAt),"ИдСистХран":data.storageSystem,"УРЛСист":data.storageUrl}
}
export type TPaperPOA = {issuedAt:Date;internalNumber:string;issuerInfo?:string;signerFullName?:TPersonFullName}
export function formatPaperPOA(data:TPaperPOA) {return {"ДатаВыдДовер":formatDate(data.issuedAt),"ВнНомДовер":data.internalNumber,"СвИдДовер":data.issuerInfo,"ФИО":data.signerFullName && formatPersonFullNameFields(data.signerFullName)}}
export type TSigner = {position?:string;signatureType?:SignatureType;signedAt?:Date;authorityConfirmationMethod:AuthorityConfirmationMethod;additionalInfo?:string;fullName:TPersonFullName;electronicPOAs?:TElectronicPOA[];paperPOAs?:TPaperPOA[]}
export function formatSigner(data:TSigner) {
    if (data.signatureType!==undefined && ![SignatureType.Qualified,SignatureType.Unqualified].includes(data.signatureType)) throw new TypeError('Допускаются только УКЭП или УНЭП')
    if ((data.authorityConfirmationMethod===AuthorityConfirmationMethod.ElectronicPOAInSystemByDoc)!==Boolean(data.electronicPOAs?.length)) throw new TypeError('СвДоверЭл обязателен только при СпосПодтПолном=3')
    if ((data.authorityConfirmationMethod===AuthorityConfirmationMethod.PaperPOA)!==Boolean(data.paperPOAs?.length)) throw new TypeError('СвДоверБум обязателен только при СпосПодтПолном=5')
    return {"Должн":data.position,"ТипПодпис":data.signatureType===undefined?undefined:String(data.signatureType),"ДатаПодДок":data.signedAt && formatDate(data.signedAt),"СпосПодтПолном":formatAuthorityConfirmationMethod(data.authorityConfirmationMethod),"ДопСведПодп":data.additionalInfo,"ФИО":formatPersonFullNameFields(data.fullName),"СвДоверЭл":mapArrayIfNotEmpty(data.electronicPOAs,formatElectronicPOA),"СвДоверБум":mapArrayIfNotEmpty(data.paperPOAs,formatPaperPOA)}
}
