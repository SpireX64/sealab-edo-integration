/** Подписант фрахтовщика заказа-наряда. */
import { FreighterSignerStatus, formatFreighterSignerStatus } from '../consts'
import { formatPersonFullNameFields, type TPersonFullName } from '../../../common/PersonFullName'
import { formatPowerOfAttorney, type TPowerOfAttorney } from '../../../esv/common/PowerOfAttorney'
export type TFreighterSigner = {status:FreighterSignerStatus;storageSystemUrl?:string;position?:string;fullName:TPersonFullName;powerOfAttorney?:TPowerOfAttorney}
export function formatFreighterSigner(data:TFreighterSigner) {
    if (data.status===FreighterSignerStatus.FreighterElectronicPOA && !data.storageSystemUrl && !data.powerOfAttorney) throw new TypeError('Не указаны сведения о доверенности')
    return {"СтатПодп":formatFreighterSignerStatus(data.status),"ИдСистХран":data.storageSystemUrl,"Должн":data.position,"ФИО":formatPersonFullNameFields(data.fullName),"СвДовер":data.powerOfAttorney && formatPowerOfAttorney(data.powerOfAttorney)}
}
