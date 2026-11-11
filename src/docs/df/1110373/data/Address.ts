/** Адрес договора: структура ЭПЛ с индексом РФ из шести цифр и максимум тремя зданиями ФИАС. */
import { formatAddress as formatEplAddress,type TAddress } from '../../../epl/1110380/data/5.29-Address'
import { AddressType } from '../consts'
import { formatCoordinates,type TCoordinates } from '../../../common/Coordinates'
export function formatAddress(data:TAddress) {
    if (data.addressType===AddressType.RussianAddress && !/^\d{6}$/.test(data.russianAddress.postalCode)) throw new TypeError('Индекс РФ должен содержать шесть цифр')
    if (data.addressType===AddressType.FiasAddress && (data.fiasAddress.buildings?.length??0)>3) throw new TypeError('В адресе ФИАС допускается не более трёх зданий')
    return formatEplAddress(data)
}
export type TConcreteAddress = {gln?:string;comment?:string;coordinates?:TCoordinates;address:TAddress}
export function formatConcreteAddress(data:TConcreteAddress) {
    return {"АдрКоммент":data.comment,"ГЛН":data.gln?[data.gln]:undefined,"Коорд":data.coordinates && formatCoordinates(data.coordinates),"Адрес":formatAddress(data.address)}
}
export type {TAddress,TCoordinates}
