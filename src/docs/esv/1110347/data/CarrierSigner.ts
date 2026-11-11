/** Подписант перевозчика ЭСВ. */
import { CarrierSignerStatus, formatCarrierSignerStatus } from '../../../etrn/1110340/consts'
import { formatPersonFullNameFields, type TPersonFullName } from '../../../common/PersonFullName'
import { formatPowerOfAttorney, type TPowerOfAttorney } from '../../common/PowerOfAttorney'
export type TCarrierSigner = {status:CarrierSignerStatus;storageSystemUrl?:string;position?:string;fullName:TPersonFullName;powerOfAttorney?:TPowerOfAttorney}
export function formatCarrierSigner(data:TCarrierSigner) {
    if (data.status===CarrierSignerStatus.CarrierElectronicPOA && !data.storageSystemUrl && !data.powerOfAttorney) throw new TypeError('Не указаны сведения о доверенности')
    return {"СтатПодп":formatCarrierSignerStatus(data.status),"ИдСистХран":data.storageSystemUrl,"Должн":data.position,"ФИО":formatPersonFullNameFields(data.fullName),"СвДовер":data.powerOfAttorney && formatPowerOfAttorney(data.powerOfAttorney)}
}
