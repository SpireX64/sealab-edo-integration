/** Сведения о замене ТС (таб-11.7). */
import { mapArrayIfNotEmpty } from '../../../../helpers'
import { formatVehicleParams, type TVehicleParams } from './11.16-VehicleParams'
import { formatDocumentRequisites, type TDocumentRequisites } from './11.12-DocumentRequisites'
import { formatSpecialDrivingCondition, type TSpecialDrivingCondition } from './11.18-SpecialDrivingCondition'
export type TVehicleReplacement = {
    vehicle?: TVehicleParams
    trailers?: TVehicleParams[]
    cargoTransferDocument?: TDocumentRequisites
    specialDrivingConditions?: TSpecialDrivingCondition[]
}
export function formatVehicleReplacement(data: TVehicleReplacement) {
    if (!data.vehicle && !data.trailers?.length) throw new TypeError("Нужно указать новое ТС или прицеп")
    return {
        "ТС": data.vehicle && formatVehicleParams(data.vehicle),
        "Прицеп": mapArrayIfNotEmpty(data.trailers, formatVehicleParams),
        "ДокПерГр": data.cargoTransferDocument && formatDocumentRequisites(data.cargoTransferDocument),
        "СпецУслДвиж": mapArrayIfNotEmpty(data.specialDrivingConditions, formatSpecialDrivingCondition),
    }
}
