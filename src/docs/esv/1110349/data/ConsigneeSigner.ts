/** Подписант грузополучателя ЭСВ. */
import { ConsigneeSignerStatus, formatConsigneeSignerStatus } from '../consts'
import { formatPersonFullNameFields, type TPersonFullName } from '../../../common/PersonFullName'
import { formatPowerOfAttorney, type TPowerOfAttorney } from '../../common/PowerOfAttorney'
export type TConsigneeSigner = {status:ConsigneeSignerStatus;storageSystemUrl?:string;position?:string;fullName:TPersonFullName;powerOfAttorney?:TPowerOfAttorney}
export function formatConsigneeSigner(data:TConsigneeSigner) {
    if (data.status===ConsigneeSignerStatus.ConsigneeElectronicPOA && !data.storageSystemUrl && !data.powerOfAttorney) throw new TypeError('Не указаны сведения о доверенности')
    return {"СтатПодп":formatConsigneeSignerStatus(data.status),"ИдСистХран":data.storageSystemUrl,"Должн":data.position,"ФИО":formatPersonFullNameFields(data.fullName),"СвДовер":data.powerOfAttorney && formatPowerOfAttorney(data.powerOfAttorney)}
}
