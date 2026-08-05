/**
 * Сведения о транспортном средстве
 * (СвТС, таб-7.8)
 */

import { mapArrayIfNotEmpty } from '../../../../helpers'
import { formatVehicleDetails, type TVehicleDetails } from './7.13-VehicleDetails';
import { formatSpecialDrivingConditions, type TSpecialDrivingConditions } from './7.32-SpecialDrivingConditions';
import { formatInfoField, type TInfoField } from './7.36-InfoField';

export type TVehicleInfo = {
    /**
     * Транспортное средство (в том числе тягач).
     * (таб-7.13)
     */
    vehicle: TVehicleDetails

    /**
     * Прицеп (полуприцеп).
     * (таб-7.13)
     */
    trailers?: TVehicleDetails[]

    /**
     * Сведения о специальных условиях движения.
     * (таб-7.32)
     */
    specialDrivingConditions?: TSpecialDrivingConditions[]

    /**
     * Информационное поле.
     * (таб-7.36)
     */
    infoFields?: TInfoField[]
}

export function formatVehicleInfo(data: TVehicleInfo) {
    return {
        "ТС": formatVehicleDetails(data.vehicle),
        "Прицеп": mapArrayIfNotEmpty(data.trailers, formatVehicleDetails),
        "СпецУслДвиж": mapArrayIfNotEmpty(data.specialDrivingConditions, formatSpecialDrivingConditions),
        "ИнфПол": mapArrayIfNotEmpty(data.infoFields, formatInfoField),
    }
}
