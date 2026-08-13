/**
 * Содержание путевого листа, информация о показаниях
 * одометра при выезде транспортного средства с парковки
 * (парковочного места)/при приеме транспортного средства
 * от другого водителя
 * (СодИнфВыезд, таб-11.5)
 */

import { TripStartSign, formatTripStartSign } from '../consts'
import { formatOdometerDeparture, type TOdometerDeparture } from './11.6-OdometerDeparture';
import { formatOdometerHandover, type TOdometerHandover } from './11.7-OdometerHandover';
import { formatAuthorizedPerson, type TAuthorizedPerson } from './11.8-AuthorizedPerson';

export type TDepartureContent = {
    /**
     * Уникальный идентификатор документа путевого листа.
     * Выдается ГИС ЭПД.
     * (1-36 символов)
     */
    waybillId: string

    /**
     * Признак начала рейса.
     * 1 – выезд с парковки (парковочного места);
     * 2 – прием транспортного средства.
     */
    tripStartSign: TripStartSign

    /**
     * Сведения о показаниях одометра при выезде
     * транспортного средства с парковки (парковочного места).
     * Обязателен при tripStartSign = ParkingDeparture (1).
     * (таб-11.6)
     */
    odometerDeparture?: TOdometerDeparture

    /**
     * Сведения о показаниях одометра при приеме
     * транспортного средства последующим водителем.
     * Обязателен при tripStartSign = VehicleHandover (2).
     * (таб-11.7)
     */
    odometerHandover?: TOdometerHandover

    /**
     * Сведения о лице, уполномоченном на проставление
     * данных при выезде транспортного средства с парковки
     * (парковочного места)/при приеме транспортного средства.
     * (таб-11.8)
     */
    authorizedPerson: TAuthorizedPerson
}

export function formatDepartureContent(data: TDepartureContent) {
    switch (data.tripStartSign) {
        case TripStartSign.ParkingDeparture: {
            if (!data.odometerDeparture) {
                throw new TypeError(
                    "Требуется указать odometerDeparture при tripStartSign = ParkingDeparture"
                )
            }
            return {
                "УИД_ПЛ": data.waybillId,
                "ПризнНачРейс": formatTripStartSign(data.tripStartSign),
                "СвОдомВыезд": formatOdometerDeparture(data.odometerDeparture),
                "СвУплЛиц": formatAuthorizedPerson(data.authorizedPerson),
            }
        }
        case TripStartSign.VehicleHandover: {
            if (!data.odometerHandover) {
                throw new TypeError(
                    "Требуется указать odometerHandover при tripStartSign = VehicleHandover"
                )
            }
            return {
                "УИД_ПЛ": data.waybillId,
                "ПризнНачРейс": formatTripStartSign(data.tripStartSign),
                "СвОдомПриемТС": formatOdometerHandover(data.odometerHandover),
                "СвУплЛиц": formatAuthorizedPerson(data.authorizedPerson),
            }
        }
    }
}