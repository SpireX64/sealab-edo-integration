/** В 1110487 количество зданий ГАР не ограничено, в отличие от 1110486. */
import {formatParticipant as formatBaseParticipant,type TParticipant} from '../../1110486/data/Party'
import {formatAddress,type TAddress} from '../../1110486/data/Address'
import {formatFiasAddress} from '../../../epl/1110380/data/5.31-FiasAddress'
export function formatParticipant(data:TParticipant) {
    let address:ReturnType<typeof formatAddress>|undefined
    if (data.address?.kind==='gar') {
        const gar=data.address.gar
        if (gar.id?.length!==36) throw new TypeError('Нужен 36-символьный идентификатор ГАР')
        const {ИдНом,Индекс,Регион,...rest}=formatFiasAddress(gar)
        address={ГЛНМеста:data.address.gln,АдрГАР:{ИдНом,Индекс,Регион,НаимРегион:[gar.regionName],...rest}}
    } else address=data.address && formatAddress(data.address)
    const {address:sourceAddress,...participant}=data
    return {...formatBaseParticipant(participant),Адрес:address}
}
export type {TParticipant,TAddress}
