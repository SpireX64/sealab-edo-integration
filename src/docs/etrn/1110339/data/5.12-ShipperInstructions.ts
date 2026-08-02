/**
 * Сведения об указаниях грузоотправителя по особым условиям перевозки
 * (УказГО, таб-5.12)
 */

import { formatFlag, formatDateTimeWithUtc } from '../../../../helpers'
import { formatRouteInfo, type TRouteInfo } from './5.32-RouteInfo';
import { formatReaddressingInfo, type TReaddressingInfo } from './5.13-ReaddressingInfo';
import { formatClimateMode, type TClimateMode } from './5.14-ClimateMode';
import { formatInfoField, type TInfoField } from './5.44-InfoField';

export type TShipperInstructions = {
    /**
     * Запрещение перегрузки груза.
     * 0 – нет запрещения
     * 1 – перегрузка груза запрещена
     */
    isReloadingProhibited?: boolean

    /**
     * Дата и время доставки груза.
     * UTC-флаг вычисляется автоматически по таймзоне Date.
     */
    deliveryDateTime?: Date

    /**
     * Срок доставки груза
     * (1-100 символов)
     */
    deliveryDeadline?: string

    /**
     * Сведения о запорно-пломбировочных устройствах
     * (указываются в случае их предоставления грузоотправителем)
     * (1-2000 символов)
     */
    sealInfo?: string

    /**
     * Указания в отношении выполнения норм перевозки
     * (для выполнения фитосанитарных, санитарных, карантинных,
     * таможенных и прочих требований, установленных законодательством РФ).
     * При отсутствии указывается "Отсутствуют".
     * (1-2000 символов)
     */
    regulatoryComplianceNotes?: string

    /**
     * Указания об ограничениях скорости движения при перевозке груза.
     * (1-2000 символов)
     */
    speedLimitNotes?: string

    /** Сведения о маршруте перевозки */
    routeInfo?: TRouteInfo

    /** Сведения о процедуре переадресовки */
    readdressingInfo: TReaddressingInfo

    /** Климатический режим перевозки */
    climateMode?: TClimateMode

    /** Информационное поле */
    infoField?: TInfoField[]
}

export function formatShipperInstructions(data: TShipperInstructions) {
    const deliveryDt = data.deliveryDateTime && formatDateTimeWithUtc(data.deliveryDateTime)

    return {
        "ЗапрПерегруз": formatFlag(data.isReloadingProhibited),
        "ДатВрДостГр": deliveryDt?.dateTime,
        "НалКоорТочВрДост": deliveryDt?.utc,
        "СрокДостГр": data.deliveryDeadline,
        "СвПломба": data.sealInfo,
        "УкНормПрвз": data.regulatoryComplianceNotes ?? "Отсутствуют",
        "ОгрСкор": data.speedLimitNotes,
        "МршПрвз": data.routeInfo && formatRouteInfo(data.routeInfo),
        "СвПА": formatReaddressingInfo(data.readdressingInfo),
        "КлимРеж": data.climateMode && formatClimateMode(data.climateMode),
        "ИнфПол": data.infoField?.map(formatInfoField),
    }
}
