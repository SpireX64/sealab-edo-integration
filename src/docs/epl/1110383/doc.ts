/**
 * Путевой лист, информация о показаниях одометра
 * при выезде транспортного средства с парковки
 * (парковочного места)/при приеме транспортного
 * средства от другого водителя
 * (ЭПЛ, 1110383) (таб-11.2)
 */

import { Document, DocumentType } from '../../shared'
import { TripStartSign } from './consts'
import { formatTechnicalCheckFileId, type TTechnicalCheckFileId } from './data/11.3-TechnicalCheckFileId';
import { formatShipperFileId, type TShipperFileId } from './data/11.4-ShipperFileId';
import { formatDepartureContent, type TDepartureContent } from './data/11.5-DepartureContent';
import { formatDepartureSigner, type TDepartureSigner } from './data/11.9-DepartureSigner';

export type TDocument1110383 = {
    /**
     * Идентификация файла обмена информации о результате
     * предрейсового или предсменного контроля технического
     * состояния транспортного средства и выпуске
     * транспортного средства на линию.
     * Заполняется при выезде транспортного средства
     * с парковки (парковочного места).
     * (таб-11.3)
     */
    technicalCheckFileId?: TTechnicalCheckFileId

    /**
     * Идентификация файла обмена информации об обстоятельствах
     * и особенностях рейса.
     * Заполняется при приеме транспортного средства.
     * (таб-11.4)
     */
    shipperFileId?: TShipperFileId

    /**
     * Содержание путевого листа, информация о показаниях
     * одометра при выезде транспортного средства с парковки
     * (парковочного места)/при приеме транспортного средства
     * от другого водителя.
     * (таб-11.5)
     */
    content: TDepartureContent

    /**
     * Сведения о лице, подписывающем файл обмена информации
     * о показаниях одометра при выезде транспортного средства
     * с парковки (парковочного места)/при приеме транспортного
     * средства от другого водителя в электронной форме.
     * (таб-11.9)
     */
    signer: TDepartureSigner
}

export const Document1110383 = (data: TDocument1110383) => {
    const isParking = data.content.tripStartSign === TripStartSign.ParkingDeparture

    if (isParking && !data.technicalCheckFileId) {
        throw new TypeError(
            "Требуется указать technicalCheckFileId при tripStartSign = ParkingDeparture"
        )
    }
    if (!isParking && !data.shipperFileId) {
        throw new TypeError(
            "Требуется указать shipperFileId при tripStartSign = VehicleHandover"
        )
    }

    const identification = isParking
        ? { "ИдИнфТехСост": formatTechnicalCheckFileId(data.technicalCheckFileId!) }
        : { "ИдИнфСоб": formatShipperFileId(data.shipperFileId!) }

    return Document({
        type: DocumentType.EPL,
        subtype: "1110383",
    }, {
        "Документ": {
            ...identification,
            "СодИнфВыезд": formatDepartureContent(data.content),
            "ПодпИнфВыезд": formatDepartureSigner(data.signer),
        }
    })
}