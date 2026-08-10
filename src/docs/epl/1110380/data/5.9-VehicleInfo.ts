/**
 * Сведения о транспортном средстве
 * (СвТС, таб-5.9)
 */

import { mapArrayIfNotEmpty } from '../../../../helpers'
import { formatVehicle, type TVehicle } from './5.10-Vehicle';
import { formatTrailer, type TTrailer } from './5.11-Trailer';

export type TVehicleInfo = {
    /**
     * Транспортное средство.
     * (таб-5.10)
     */
    vehicle: TVehicle

    /**
     * Прицеп (полуприцеп).
     * (таб-5.11)
     */
    trailers?: TTrailer[]
}

export function formatVehicleInfo(data: TVehicleInfo) {
    return {
        "ТС": formatVehicle(data.vehicle),
        "Прицеп": mapArrayIfNotEmpty(data.trailers, formatTrailer),
    }
}