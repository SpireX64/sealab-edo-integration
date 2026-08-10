/**
 * Сведения о транспортном средстве
 * (СвТС, таб-9.6)
 */

import { mapArrayIfNotEmpty } from '../../../../helpers'
import { formatVehicle, type TVehicle } from './9.7-Vehicle'
import { formatTrailer, type TTrailer } from './9.8-Trailer'

export type TVehicleInfo = {
    /**
     * Транспортное средство.
     * (таб-9.7)
     */
    vehicle: TVehicle

    /**
     * Прицеп (полуприцеп).
     * (таб-9.8)
     */
    trailers?: TTrailer[]
}

export function formatVehicleInfo(data: TVehicleInfo) {
    return {
        "ТС": formatVehicle(data.vehicle),
        "Прицеп": mapArrayIfNotEmpty(data.trailers, formatTrailer),
    }
}