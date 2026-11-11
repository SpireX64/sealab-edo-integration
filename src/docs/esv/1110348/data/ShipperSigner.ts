/** Подписант грузоотправителя ЭСВ. */
import { ShipperSignerStatus, formatShipperSignerStatus } from '../consts'
import { formatPersonFullNameFields, type TPersonFullName } from '../../../common/PersonFullName'
import { formatPowerOfAttorney, type TPowerOfAttorney } from '../../common/PowerOfAttorney'
export type TShipperSigner = {status:ShipperSignerStatus;storageSystemUrl?:string;position?:string;fullName:TPersonFullName;powerOfAttorney?:TPowerOfAttorney}
export function formatShipperSigner(data:TShipperSigner) {
    if (data.status===ShipperSignerStatus.ShipperElectronicPOA && !data.storageSystemUrl && !data.powerOfAttorney) throw new TypeError('Не указаны сведения о доверенности')
    return {"СтатПодп":formatShipperSignerStatus(data.status),"ИдСистХран":data.storageSystemUrl,"Должн":data.position,"ФИО":formatPersonFullNameFields(data.fullName),"СвДовер":data.powerOfAttorney && formatPowerOfAttorney(data.powerOfAttorney)}
}
