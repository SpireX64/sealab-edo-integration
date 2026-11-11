/** Новый пункт выгрузки (таб-9.5). */
import { formatDateTimeWithUtc } from '../../../../helpers'
import { formatConcreteAddress, type TConcreteAddress } from './9.23-ConcreteAddress'
export type TNewUnloadingPoint = {
    /** Новое согласованное время подачи ТС под выгрузку. */
    scheduledAt: Date
    address: TConcreteAddress
}
export function formatNewUnloadingPoint(data: TNewUnloadingPoint) {
    const dt = formatDateTimeWithUtc(data.scheduledAt)
    return { "ДатВрНовВыгрПА": dt.dateTime, "НалКоорТочВрВгрПА": dt.utc, "АдрВыгруз": formatConcreteAddress(data.address) }
}
