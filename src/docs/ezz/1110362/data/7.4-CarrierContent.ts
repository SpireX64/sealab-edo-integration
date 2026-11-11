/**
 * Содержание заказа и заявки, информация перевозчика
 * (СодИнфПрв, таб-7.4)
 */

import { mapArrayIfNotEmpty } from '../../../../helpers'
import { formatCarrierOrgPerson, type TCarrierOrgPerson } from './7.5-CarrierOrgPerson';
import { formatDriverInfo, type TDriverInfo } from './7.6-DriverInfo';
import { formatCarrierAuthorizedPerson, type TCarrierAuthorizedPerson } from './7.7-CarrierAuthorizedPerson';
import { formatVehicleInfo, type TVehicleInfo } from './7.8-VehicleInfo';
import { formatPaymentInfo, type TPaymentInfo } from './7.9-PaymentInfo';
import { formatInfoField, type TInfoField } from './7.36-InfoField';

export type TCarrierContent = {
    /**
     * Уникальный идентификатор документа заказа и заявки.
     * Выдается ГИС ЭПД.
     * (36 символов)
     */
    uniqueId: string

    /**
     * Принят перевозчиком.
     * true — принят (СодОпер = 1),
     * false — отказано в приеме (СодОпер = 2).
     */
    isAccepted: boolean

    /**
     * Причина отказа в приеме заказа и заявки.
     * Обязателен при {isAccepted} = false.
     * (1-2000 символов)
     */
    rejectionReason?: string

    /**
     * Сведение о лице, ответственном за организацию
     * перевозки со стороны перевозчика.
     * Обязателен при {isAccepted} = true.
     * (таб-7.5)
     */
    orgPerson?: TCarrierOrgPerson

    /**
     * Сведения о водителе.
     * Обязателен при {isAccepted} = true.
     * (таб-7.6)
     */
    drivers?: TDriverInfo[]

    /**
     * Сведения о лице, уполномоченном перевозчиком
     * на заполнение и подписание заказа и заявки.
     * (таб-7.7)
     */
    authorizedPerson?: TCarrierAuthorizedPerson

    /**
     * Сведения о транспортном средстве.
     * Обязателен при {isAccepted} = true.
     * (таб-7.8)
     */
    vehicleInfo?: TVehicleInfo

    /**
     * Размер платы за перевозку и (или) порядок расчетов.
     * Обязателен при {isAccepted} = true.
     * (таб-7.9)
     */
    paymentInfo?: TPaymentInfo

    /**
     * Информационное поле.
     * (таб-7.36)
     */
    infoFields?: TInfoField[]
}

export function formatCarrierContent(data: TCarrierContent) {
    if (!data.isAccepted && !data.rejectionReason) {
        throw new TypeError(
            "Требуется указать причину отказа (rejectionReason) при isAccepted = false"
        )
    }

    if (data.isAccepted) {
        if (!data.orgPerson) {
            throw new TypeError("Требуется указать orgPerson при isAccepted = true")
        }
        if (!data.drivers || data.drivers.length === 0) {
            throw new TypeError("Требуется указать хотя бы одного водителя при isAccepted = true")
        }
        if (!data.vehicleInfo) {
            throw new TypeError("Требуется указать vehicleInfo при isAccepted = true")
        }
        if (!data.paymentInfo) {
            throw new TypeError("Требуется указать paymentInfo при isAccepted = true")
        }
    }

    return {
        "УИД_Зак": data.uniqueId,
        "СодОпер": data.isAccepted ? "1" : "2",
        "ПричОтк": data.rejectionReason,
        "СвЛицОргПрвз": data.orgPerson && formatCarrierOrgPerson(data.orgPerson),
        "СвВодит": mapArrayIfNotEmpty(data.drivers, formatDriverInfo),
        "СвЛицПрв": data.authorizedPerson && formatCarrierAuthorizedPerson(data.authorizedPerson),
        "СвТС": data.vehicleInfo && formatVehicleInfo(data.vehicleInfo),
        "РазмПлатРасчет": data.paymentInfo && formatPaymentInfo(data.paymentInfo),
        "ИнфПол": mapArrayIfNotEmpty(data.infoFields, formatInfoField),
    }
}
