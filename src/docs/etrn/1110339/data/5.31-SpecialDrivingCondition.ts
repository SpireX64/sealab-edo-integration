/**
 * Сведения о специальных условиях движения
 * (СпецУслДвижТип, таб-5.31)
 */

import { formatDate } from '../../../../helpers'
import { formatRouteInfo } from './5.32-RouteInfo'
import type { TRouteInfo } from './5.32-RouteInfo'

export type TSpecialDrivingCondition = {
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
     * (1-100 символов)
     */
    permitExpiry?: string

    /**
     * Идентификатор файла специального разрешения
     * (в том числе регистрационный номер, если документ/сведения
     * о таком документе содержатся в государственных информационных системах).
     * Обязателен при отсутствии {permitNumber}, {permitDate} и {permitExpiry}.
     * (1-255 символов)
     */
    permitFileId?: string

    /**
     * Установленный маршрут движения тяжеловесного и (или) крупногабаритного
     * транспортного средства или транспортного средства, перевозящего опасный груз.
     */
    route?: TRouteInfo
}

export function formatSpecialDrivingCondition(data: TSpecialDrivingCondition) {
    if (!data.permitFileId && (!data.permitNumber || !data.permitDate || !data.permitExpiry)) {
        throw new TypeError(
            "Требуется указать идентификатор файла спецразрешения " +
            "или его номер, дату и срок действия"
        )
    }

    if (!data.permitNumber && !data.permitDate && !data.permitExpiry && !data.permitFileId) {
        throw new TypeError(
            "Требуется указать идентификатор файла спецразрешения " +
            "или его номер, дату и срок действия"
        )
    }

    return {
        "НомСР": data.permitNumber,
        "ДатаСР": data.permitDate && formatDate(data.permitDate),
        "СрокСР": data.permitExpiry,
        "ИдСР": data.permitFileId,
        "СведМрш": data.route && formatRouteInfo(data.route),
    }
}
