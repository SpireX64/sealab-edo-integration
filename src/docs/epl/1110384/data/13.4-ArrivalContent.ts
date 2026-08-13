/**
 * Содержание путевого листа, информация о показаниях
 * одометра при заезде транспортного средства на парковку
 * (парковочное место)/при сдаче транспортного средства
 * другому водителю
 * (СодИнфЗаезд, таб-13.4)
 */

import { TripEndSign, formatTripEndSign } from '../consts'
import { formatOdometerArrival, type TOdometerArrival } from './13.5-OdometerArrival';
import { formatOdometerHandover, type TOdometerHandover } from './13.6-OdometerHandover';
import { formatAuthorizedPerson, type TAuthorizedPerson } from './13.7-AuthorizedPerson';

export type TArrivalContent = {
    /**
     * Уникальный идентификатор документа путевого листа.
     * Выдается ГИС ЭПД.
     * (36 символов)
     */
    waybillId: string

    /**
     * Признак окончания рейса.
     * 1 – заезд на парковку (парковочное место);
     * 2 – сдача транспортного средства.
     */
    tripEndSign: TripEndSign

    /**
     * Сведения о показаниях одометра при заезде
     * транспортного средства на парковку (парковочное место).
     * Обязателен при tripEndSign = ParkingArrival (1).
     * (таб-13.5)
     */
    odometerArrival?: TOdometerArrival

    /**
     * Сведения о показаниях одометра при сдаче
     * транспортного средства последующему водителю.
     * Обязателен при tripEndSign = VehicleHandover (2).
     * (таб-13.6)
     */
    odometerHandover?: TOdometerHandover

    /**
     * Сведения о лице, уполномоченном на проставление
     * данных при заезде транспортного средства на парковку
     * (парковочное место)/при сдаче транспортного средства.
     * (таб-13.7)
     */
    authorizedPerson: TAuthorizedPerson
}

export function formatArrivalContent(data: TArrivalContent) {
    switch (data.tripEndSign) {
        case TripEndSign.ParkingArrival: {
            if (!data.odometerArrival) {
                throw new TypeError(
                    "Требуется указать odometerArrival при tripEndSign = ParkingArrival"
                )
            }
            return {
                "УИД_ПЛ": data.waybillId,
                "ПризнКонцРейс": formatTripEndSign(data.tripEndSign),
                "СвОдомЗаезд": formatOdometerArrival(data.odometerArrival),
                "СвУплЛиц": formatAuthorizedPerson(data.authorizedPerson),
            }
        }
        case TripEndSign.VehicleHandover: {
            if (!data.odometerHandover) {
                throw new TypeError(
                    "Требуется указать odometerHandover при tripEndSign = VehicleHandover"
                )
            }
            return {
                "УИД_ПЛ": data.waybillId,
                "ПризнКонцРейс": formatTripEndSign(data.tripEndSign),
                "СвОдомСдачТС": formatOdometerHandover(data.odometerHandover),
                "СвУплЛиц": formatAuthorizedPerson(data.authorizedPerson),
            }
        }
    }
}
