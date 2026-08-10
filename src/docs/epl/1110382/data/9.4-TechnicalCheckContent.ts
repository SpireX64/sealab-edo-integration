/**
 * Содержание путевого листа, информация о результате
 * предрейсового или предсменного контроля технического
 * состояния транспортного средства и выпуске
 * транспортного средства на линию
 * (СодИнфТехСост, таб-9.4)
 */

import { formatFlag, formatDateTimeWithUtc } from '../../../../helpers'
import { formatResponsiblePerson, type TResponsiblePerson } from './9.5-ResponsiblePerson';
import { formatVehicleInfo, type TVehicleInfo } from './9.6-VehicleInfo';

export type TTechnicalCheckContent = {
    /**
     * Уникальный идентификатор документа путевого листа.
     * Выдается ГИС ЭПД.
     * (1-36 символов)
     */
    waybillId: string

    /**
     * Дата и время проведения предрейсового или предсменного
     * контроля технического состояния транспортного средства.
     */
    checkDateTime: Date

    /**
     * Отметка по результату проведения контроля.
     * true – выпуск на линию разрешен;
     * false – выпуск на линию не разрешен.
     *
     * В XML: 1 – разрешен; 2 – не разрешен.
     */
    isReleaseAllowed: boolean

    /**
     * Дата и время выпуска транспортного средства на линию.
     * Обязателен, если выпуск разрешен.
     */
    releaseDateTime?: Date

    /**
     * Сведения о должностном лице, ответственном
     * за техническое состояние и безопасную
     * эксплуатацию транспортного средства.
     * (таб-9.5)
     */
    responsiblePerson: TResponsiblePerson

    /**
     * Сведения о транспортном средстве.
     * (таб-9.6)
     */
    vehicle: TVehicleInfo
}

export function formatTechnicalCheckContent(data: TTechnicalCheckContent) {
    if (data.isReleaseAllowed && !data.releaseDateTime) {
        throw new TypeError(
            "Требуется указать releaseDateTime при isReleaseAllowed = true"
        )
    }

    const checkDt = formatDateTimeWithUtc(data.checkDateTime)
    const releaseDt = data.releaseDateTime && formatDateTimeWithUtc(data.releaseDateTime)

    return {
        "УИД_ПЛ": data.waybillId,
        "ДатВрКонтТехСост": checkDt.dateTime,
        "НалКоорТочВрКонтТехСост": checkDt.utc,
        "ОтметКонтТехСост": formatFlag(!data.isReleaseAllowed, 1),
        "ДатВрВыпНаЛин": releaseDt?.dateTime,
        "НалКоорТочВрВыпНаЛин": releaseDt?.utc,
        "СвОтвЛиц": formatResponsiblePerson(data.responsiblePerson),
        "СвТС": formatVehicleInfo(data.vehicle),
    }
}