/**
 * Сведения о специальных условиях движения
 * (СпецУслДвижТип, таб-7.32)
 */

import { formatDate } from '../../../../helpers'
import { formatRouteInfo, type TRouteInfo } from './7.33-RouteInfo';

export type TSpecialDrivingConditions = {
    /**
     * Номер специального разрешения.
     * Обязателен при отсутствии {permitFileId}.
     * (1-255 символов)
     */
    permitNumber?: string

    /**
     * Дата специального разрешения.
     * Обязательна при отсутствии {permitFileId}.
     */
    permitDate?: Date

    /**
     * Срок действия специального разрешения.
     * Обязателен при отсутствии {permitFileId}.
     * (1-255 символов)
     */
    permitExpiry?: string

    /**
     * Вид специального разрешения.
     * Обязателен при отсутствии {permitFileId}.
     * (1-255 символов)
     */
    permitKind?: string

    /**
     * Краткое наименование органа исполнительной власти
     * (специализированной уполномоченной организации),
     * выдавшего документ.
     * Обязателен при отсутствии {permitFileId}.
     * (1-255 символов)
     */
    authorityName?: string

    /**
     * Идентификатор файла специального разрешения
     * (в том числе регистрационный номер, если документ/сведения
     * о таком документе содержатся в государственных информационных системах).
     * Обязателен при отсутствии {permitNumber}, {permitDate},
     * {permitKind}, {authorityName} и {permitExpiry}.
     * (1-255 символов)
     */
    permitFileId?: string

    /**
     * Установленный маршрут движения тяжеловесного и (или) крупногабаритного
     * транспортного средства или транспортного средства, перевозящего опасный груз.
     * (таб-7.33)
     */
    route?: TRouteInfo
}

export function formatSpecialDrivingConditions(data: TSpecialDrivingConditions) {
    if (!data.permitFileId
        && (!data.permitNumber || !data.permitDate || !data.permitExpiry || !data.permitKind || !data.authorityName)) {
        throw new TypeError(
            "Требуется указать идентификатор файла спецразрешения " +
            "либо его номер, дату, срок действия, вид и наименование выдавшего органа"
        )
    }

    return {
        "НомСР": data.permitNumber,
        "ДатаСР": data.permitDate && formatDate(data.permitDate),
        "СрокСР": data.permitExpiry,
        "ВидСР": data.permitKind,
        "НаимОИВ": data.authorityName,
        "ИдСР": data.permitFileId,
        "СведМрш": data.route && formatRouteInfo(data.route),
    }
}
