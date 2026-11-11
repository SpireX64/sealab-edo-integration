/** Адреса 277@: наименования региона/страны обязательны, ГАР содержит GUID. */
import { type TRussianAddress as TBaseRussianAddress } from '../../../epl/1110380/data/5.30-RussianAddress'
import { formatFiasAddress,type TFiasAddress } from '../../../epl/1110380/data/5.31-FiasAddress'
import { formatCoordinates,type TCoordinates } from '../../../common/Coordinates'
export type TRussianAddress = Omit<TBaseRussianAddress,'postalCode'> & {postalCode?:string;regionName:string}
export function formatRussianAddressInfo(data:TRussianAddress) {
    if (data.postalCode!==undefined && !/^\d{6}$/.test(data.postalCode)) throw new TypeError('Индекс РФ должен содержать шесть цифр')
    if ((!data.city || !data.settlement || !data.street || !data.house) && !data.otherInfo) throw new TypeError('При неполном адресе РФ обязательны иные сведения об адресе')
    return {"Индекс":data.postalCode,"КодРегион":data.regionCode,"НаимРегион":data.regionName,"Район":data.district,"Город":data.city,"НаселПункт":data.settlement,"Улица":data.street,"Дом":data.house,"Корпус":data.building,"Кварт":data.apartment,"ИныеСвед":data.otherInfo}
}
export type TGarAddress = TFiasAddress & {id:string;regionName:string}
export function formatGarAddress(data:TGarAddress) {
    if (data.id?.length!==36) throw new TypeError('Нужен 36-символьный идентификатор ГАР')
    if ((data.buildings?.length??0)>3) throw new TypeError('В ГАР допускается не более трёх зданий')
    const {ИдНом,Индекс,Регион,...rest}=formatFiasAddress(data)
    return {ИдНом,Индекс,Регион,"НаимРегион":[data.regionName],...rest}
}
export type TForeignAddress = {countryCode:string;countryName:string;addressText:string}
export function formatForeignAddress(data:TForeignAddress) {return {"КодСтр":data.countryCode,"НаимСтр":data.countryName,"АдрТекст":data.addressText}}
export type TAddress = {gln?:string} & ({kind:'russian';russian:TRussianAddress}|{kind:'gar';gar:TGarAddress}|{kind:'foreign';foreign:TForeignAddress})
export function formatAddress(data:TAddress) {
    switch(data.kind) {
        case 'russian':return {"ГЛНМеста":data.gln,"АдрРФ":formatRussianAddressInfo(data.russian)}
        case 'gar':return {"ГЛНМеста":data.gln,"АдрГАР":formatGarAddress(data.gar)}
        case 'foreign':return {"ГЛНМеста":data.gln,"АдрИнф":formatForeignAddress(data.foreign)}
        default:throw new TypeError('Не указан вид адреса')
    }
}
export type TConcreteAddress = {comment?:string;coordinates?:TCoordinates;address:TAddress}
export function formatConcreteAddress(data:TConcreteAddress) {return {"АдрКоммент":data.comment,"Коорд":data.coordinates && formatCoordinates(data.coordinates),"Адрес":formatAddress(data.address)}}
