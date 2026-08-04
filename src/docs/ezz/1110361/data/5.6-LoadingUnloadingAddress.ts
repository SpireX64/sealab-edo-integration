/**
 * Адреса пунктов погрузки и выгрузки
 * (АдрПункт, таб-5.6)
 */

import { formatDateTimeWithUtc } from '../../../../helpers'
import { OperationType, formatOperationType } from '../consts'
import { formatAddress, type TAddress } from './5.25-Address';
import { formatInfraOwner, type TInfraOwner } from './5.7-InfraOwner';

export type TLoadingUnloadingAddress = {
    /**
     * Операция.
     * Погрузка / Выгрузка.
     */
    operation: OperationType

    /**
     * Порядковый номер пункта.
     * Указывается порядковый номер пункта в пути следования
     * транспортного средства.
     */
    sequenceNumber?: number

    /**
     * Дата и время погрузки/выгрузки.
     * Обязателен при наличии {deadlineAt}.
     */
    operatedAt?: Date

    /**
     * Предельно допустимое время погрузки/выгрузки.
     */
    deadlineAt?: Date

    /**
     * Адрес пункта погрузки/выгрузки.
     * (таб-5.25)
     */
    address: TAddress

    /**
     * Сведения об организации-владельце объекта инфраструктуры
     * пункта погрузки.
     * Обязателен при {operation} = Погрузка.
     * Не формируется при {operation} = Выгрузка.
     * (таб-5.7)
     */
    infraOwner?: TInfraOwner
}

export function formatLoadingUnloadingAddress(data: TLoadingUnloadingAddress) {
    if (data.operation === OperationType.Loading && !data.infraOwner) {
        throw new TypeError("Требуется указать infraOwner при operation = Погрузка")
    }

    const operationDt = data.operatedAt && formatDateTimeWithUtc(data.operatedAt)
    const deadlineDt = data.deadlineAt && formatDateTimeWithUtc(data.deadlineAt)

    return {
        "Опер": formatOperationType(data.operation),
        "ПорНомПункт": data.sequenceNumber != null ? String(data.sequenceNumber) : undefined,
        "ДатВрОпер": operationDt?.dateTime,
        "НалКоорТочВрОпер": operationDt?.utc,
        "ПредВрОпер": deadlineDt?.dateTime,
        "НалКоорТочПредВрОпер": deadlineDt?.utc,
        "АдресПункт": formatAddress(data.address),
        "ОргВладИнфр": data.infraOwner && formatInfraOwner(data.infraOwner),
    }
}
