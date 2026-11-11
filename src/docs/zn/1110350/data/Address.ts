/** АдресПользТип заказа-наряда использует АдрРФ/АдрИнф (без «ес»). */
import { formatAddress, type TAddress } from '../../../etrn/1110343/data/9.22-Address'
import { formatCoordinates, type TCoordinates } from '../../../common/Coordinates'
export type TConcreteAddress = {gln?:string;comment?:string;coords?:TCoordinates;address:TAddress}
export function formatConcreteAddress(data:TConcreteAddress) {
    return {"АдрКоммент":data.comment,"ГЛН":data.gln ? [data.gln] : undefined,"Коорд":data.coords && formatCoordinates(data.coords),...formatAddress(data.address)}
}
export {formatAddress,type TAddress}
