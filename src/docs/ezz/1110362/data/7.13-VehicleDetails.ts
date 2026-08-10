/**
 * Транспортное средство
 * (ПараметрыТСТип, таб-7.13)
 */

import { mapArrayIfNotEmpty } from '../../../../helpers'
import { OwnershipType, formatOwnershipType } from '../consts'
import { formatVehicleParams, type TVehicleParams } from './7.14-VehicleParams';
import { formatDocumentRequisites, type TDocumentRequisites } from './7.15-DocumentRequisites';

export type TVehicleDetails = {
    /**
     * Номер СТС.
     * Указывается серия и номер СТС без учета пробелов и знака номера.
     * (1-10 символов)
     */
    stsNumber?: string

    /**
     * VIN номер.
     * (1-17 символов)
     */
    vin?: string

    /**
     * Регистрационный номер.
     * (1-9 символов)
     */
    registrationNumber: string

    /**
     * Тип владения.
     * 1 – собственность;
     * 2 – совместная собственность супругов;
     * 3 – аренда;
     * 4 – лизинг;
     * 5 – безвозмездное пользование.
     */
    ownershipType: OwnershipType

    /**
     * Параметры транспортного средства.
     * (таб-7.14)
     */
    vehicleParams: TVehicleParams

    /**
     * Реквизиты документа (документов), подтверждающего основание
     * владения грузовым автомобилем (тягачом), а также прицепом
     * (полуприцепом).
     * Обязателен при {ownershipType} = Lease (3), Leasing (4) или
     * FreeUse (5).
     * (таб-7.15)
     */
    ownershipDocs?: TDocumentRequisites[]
}

export function formatVehicleDetails(data: TVehicleDetails) {
    if (
        (data.ownershipType === OwnershipType.Lease
            || data.ownershipType === OwnershipType.Leasing
            || data.ownershipType === OwnershipType.FreeUse)
        && (!data.ownershipDocs || data.ownershipDocs.length === 0)
    ) {
        throw new TypeError(
            "Требуется указать ownershipDocs при ownershipType = Lease (3), Leasing (4) или FreeUse (5)"
        )
    }

    return {
        "НомСТС": data.stsNumber,
        "НомерВИН": data.vin,
        "РегНомер": data.registrationNumber,
        "ТипВлад": formatOwnershipType(data.ownershipType),
        "ПарТС": formatVehicleParams(data.vehicleParams),
        "ОснАрЛиз": mapArrayIfNotEmpty(data.ownershipDocs, formatDocumentRequisites),
    }
}
