/** Подписант фрахтователя заказа-наряда. */
import { ChartererSignerStatus, formatChartererSignerStatus } from '../consts'
import { formatPersonFullNameFields, type TPersonFullName } from '../../../common/PersonFullName'
import { formatPowerOfAttorney, type TPowerOfAttorney } from '../../../esv/common/PowerOfAttorney'
export type TChartererSigner = {status:ChartererSignerStatus;storageSystemUrl?:string;position?:string;fullName:TPersonFullName;powerOfAttorney?:TPowerOfAttorney}
export function formatChartererSigner(data:TChartererSigner) {
    if (data.status===ChartererSignerStatus.ChartererElectronicPOA && !data.storageSystemUrl && !data.powerOfAttorney) throw new TypeError('Не указаны сведения о доверенности')
    return {"СтатПодп":formatChartererSignerStatus(data.status),"ИдСистХран":data.storageSystemUrl,"Должн":data.position,"ФИО":formatPersonFullNameFields(data.fullName),"СвДовер":data.powerOfAttorney && formatPowerOfAttorney(data.powerOfAttorney)}
}
