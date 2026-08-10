/**
 * Содержание путевого листа, информация об обстоятельствах
 * и особенностях рейса
 * (СодИнфСоб, таб-5.3)
 */

import { formatFlag, mapArrayIfNotEmpty } from '../../../../helpers'
import {
    TransportKind,
    CommercialTransportKind,
    MessageKind,
    formatTransportKind,
    formatCommercialTransportKind,
    formatMessageKind,
} from '../consts'
import { formatWaybillValidity, type TWaybillValidity } from './5.4-WaybillValidity';
import { formatWaybillIssuer, type TWaybillIssuer } from './5.5-WaybillIssuer';
import { formatVehicleInfo, type TVehicleInfo } from './5.9-VehicleInfo';
import { formatDriverInfo, type TDriverInfo } from './5.12-DriverInfo';
import { formatShipperInfo, type TShipperInfo } from './5.14-ShipperInfo';
import { formatInfoField, type TInfoField } from './5.25-InfoField';
import { formatDeparturePoint, type TDeparturePoint } from './5.27-DeparturePoint';

export type TWaybillContent = {
    /**
     * Уникальный идентификатор документа путевого листа.
     * Выдается ГИС ЭПД.
     * (1-36 символов)
     */
    waybillId?: string

    /**
     * Признак обязательности проведения послесменного,
     * послерейсового медицинского осмотра.
     * true — осмотр требуется (да, 1),
     * false — осмотр не требуется (нет, 2).
     */
    isPostTripMedicalExamRequired: boolean

    /**
     * Сведения о виде перевозки.
     * КП – коммерческие перевозки;
     * СН – перевозки для собственных нужд;
     * СТ – передвижение и работа специальных транспортных средств.
     */
    transportKind: TransportKind

    /**
     * Вид коммерческой перевозки.
     * Обязателен при {transportKind} = Commercial (КП),
     * в иных случаях не формируется.
     */
    commercialTransportKind?: CommercialTransportKind

    /**
     * Сведения о виде сообщения.
     * Г – городское; П – пригородное; М – междугородное.
     */
    messageKind: MessageKind

    /**
     * Место отправления.
     * Формируется при {commercialTransportKind} = Cargo (ПГ).
     * (таб-5.27)
     */
    departurePoints?: TDeparturePoint[]

    /**
     * Сведения о сроке действия путевого листа.
     * (таб-5.4)
     */
    validity: TWaybillValidity

    /**
     * Сведения о лице, оформившем путевой лист.
     * (таб-5.5)
     */
    issuer: TWaybillIssuer

    /**
     * Сведения о грузоотправителе (грузоотправителях).
     * (таб-5.14)
     */
    shippers?: TShipperInfo[]

    /**
     * Сведения о транспортном средстве.
     * (таб-5.9)
     */
    vehicle: TVehicleInfo

    /**
     * Сведения о водителе (водителях) транспортного средства.
     * (таб-5.12)
     */
    drivers: TDriverInfo[]

    /**
     * Информационное поле.
     * (таб-5.25)
     */
    infoFields?: TInfoField[]
}

export function formatWaybillContent(data: TWaybillContent) {
    if (data.transportKind === TransportKind.Commercial && !data.commercialTransportKind) {
        throw new TypeError(
            "Требуется указать commercialTransportKind при transportKind = Commercial (КП)"
        )
    }

    if (data.drivers.length === 0) {
        throw new TypeError("Требуется указать хотя бы одного водителя")
    }

    return {
        "УИД_ПЛ": data.waybillId,
        "ОбМедОсмПосле": formatFlag(!data.isPostTripMedicalExamRequired, 1),
        "ВидПрв": formatTransportKind(data.transportKind),
        "ВидКП": data.commercialTransportKind && formatCommercialTransportKind(data.commercialTransportKind),
        "ВидСообщ": formatMessageKind(data.messageKind),
        "МестОтпр": mapArrayIfNotEmpty(data.departurePoints, formatDeparturePoint),
        "СрокПЛ": formatWaybillValidity(data.validity),
        "СвЛицПЛ": formatWaybillIssuer(data.issuer),
        "СвГО": mapArrayIfNotEmpty(data.shippers, formatShipperInfo),
        "СвТС": formatVehicleInfo(data.vehicle),
        "СвВодит": data.drivers.map(formatDriverInfo),
        "ИнфПол": mapArrayIfNotEmpty(data.infoFields, formatInfoField),
    }
}
