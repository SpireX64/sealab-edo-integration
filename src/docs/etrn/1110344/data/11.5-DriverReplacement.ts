/** Сведения о замене водителя (таб-11.5). */
import { formatDocumentRequisites, type TDocumentRequisites } from './11.12-DocumentRequisites'
import { formatNewDriver, type TNewDriver } from './11.6-NewDriver'
export type TDriverReplacement = { cargoTransferDocument?: TDocumentRequisites; newDriver?: TNewDriver }
export function formatDriverReplacement(data: TDriverReplacement) {
    return {
        "ДокПерГрВод": data.cargoTransferDocument && formatDocumentRequisites(data.cargoTransferDocument),
        "НовВодит": data.newDriver && formatNewDriver(data.newDriver),
    }
}
