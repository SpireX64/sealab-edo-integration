/**
 * Сведения о транспортном средстве
 * (СвТС, таб-5.16)
 */

import { mapArrayIfNotEmpty } from '../../../../helpers'
import { formatVehicleParams } from './5.37-VehicleParams'
import type { TVehicleParams } from './5.37-VehicleParams'
import { formatSpecialDrivingCondition } from './5.31-SpecialDrivingCondition'
import type { TSpecialDrivingCondition } from './5.31-SpecialDrivingCondition'
import { formatInfoField } from './5.44-InfoField'
import type { TInfoField } from './5.44-InfoField'

export type TVehicleInfo = {
    /** Транспортное средство (в том числе тягач) */
    vehicle: TVehicleParams

    /** Прицеп (полуприцеп) */
    trailers?: TVehicleParams[]

    /** Сведения о специальных условиях движения */
    specialDrivingConditions?: TSpecialDrivingCondition[]

    /** Информационное поле */
    infoField?: TInfoField[]
}

export function formatVehicleInfo(data: TVehicleInfo) {
    return {
        "ТС": formatVehicleParams(data.vehicle),
        "Прицеп": mapArrayIfNotEmpty(data.trailers, formatVehicleParams),
        "СпецУслДвиж": mapArrayIfNotEmpty(data.specialDrivingConditions, formatSpecialDrivingCondition),
        "ИнфПол": data.infoField?.map(formatInfoField),
    }
}
