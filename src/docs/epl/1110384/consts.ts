/**
 * Константы и перечисления документа ЭПЛ 1110384.
 */

/**
 * Признак окончания рейса.
 */
export enum TripEndSign {
    /** Заезд на парковку (парковочное место) */
    ParkingArrival = "ParkingArrival",
    /** Сдача транспортного средства последующему водителю */
    VehicleHandover = "VehicleHandover",
}

export function formatTripEndSign(value: TripEndSign): string {
    switch (value) {
        case TripEndSign.ParkingArrival:
            return "1"
        case TripEndSign.VehicleHandover:
            return "2"
    }
}

// Реэкспорт из ЭПЛ 1110380 — значения совпадают:
// ТипПодпис: 1=УКЭП, 2=ПЭП, 3=УНЭП
// СпосПодтПолном: 1-6
export {
    SignatureType,
    AuthorityConfirmationMethod,
    formatSignatureType,
    formatAuthorityConfirmationMethod,
} from '../1110380/consts'
