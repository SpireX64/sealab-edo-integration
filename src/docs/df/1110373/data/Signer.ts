/** Подписант договора; полномочия и вид подписи по XSD 109@. */
import { mapArrayIfNotEmpty } from '../../../../helpers'
import { SignatureType,AuthorityConfirmationMethod,formatSignatureType,formatAuthorityConfirmationMethod } from '../consts'
import { formatPersonFullNameFields,type TPersonFullName } from '../../../common/PersonFullName'
import { formatElectronicPOA,type TElectronicPOA } from '../../../common/ElectronicPOA'
import { formatPaperPOA,type TPaperPOA } from '../../../common/PaperPOA'
export type TSigner = {position:string;signatureType?:SignatureType;authorityConfirmationMethod:AuthorityConfirmationMethod;additionalInfo?:string;fullName:TPersonFullName;electronicPOAs?:TElectronicPOA[];paperPOAs?:TPaperPOA[]}
export function formatSigner(data:TSigner) {
    if (!data.position?.trim()) throw new TypeError('Не указана должность подписанта')
    if ((data.authorityConfirmationMethod===AuthorityConfirmationMethod.ElectronicPOAInSystemByDoc)!==Boolean(data.electronicPOAs?.length)) throw new TypeError('СвДоверЭл обязателен только при СпосПодтПолном=3')
    if ((data.authorityConfirmationMethod===AuthorityConfirmationMethod.PaperPOA)!==Boolean(data.paperPOAs?.length)) throw new TypeError('СвДоверБум обязателен только при СпосПодтПолном=5')
    return {"Должн":data.position,"ТипПодпис":data.signatureType && formatSignatureType(data.signatureType),"СпосПодтПолном":formatAuthorityConfirmationMethod(data.authorityConfirmationMethod),"ДопСведПодп":data.additionalInfo,"ФИО":formatPersonFullNameFields(data.fullName),"СвДоверЭл":mapArrayIfNotEmpty(data.electronicPOAs,formatElectronicPOA),"СвДоверБум":mapArrayIfNotEmpty(data.paperPOAs,formatPaperPOA)}
}
export type {TElectronicPOA,TPaperPOA,TPersonFullName}
