/**
 * Сведения о лице, подписывающем файл обмена информации перевозчика
 * о выдаче груза к перевозке
 * (Подписант, таб-15.8)
 */

import { CarrierSignerStatus, formatCarrierSignerStatus } from '../consts'
import { formatPersonFullNameFields, type TPersonFullName } from './15.16-FullName';
import { formatPowerOfAttorney, type TPowerOfAttorney } from './15.9-PowerOfAttorney';

export type TCarrierSigner = {
    /**
     * Статус подписанта.
     * Может принимать значение 3, если иное не предусмотрено
     * законодательством РФ в области электронной подписи.
     */
    status: CarrierSignerStatus

    /**
     * Идентифицирующие сведения об информационной системе,
     * в которой хранится доверенность. Унифицированный указатель (URL).
     * Обязателен, если представление доверенности осуществляется способом,
     * отличным от включения в каждый пакет электронных документов.
     * (1-500 символов)
     */
    storageSystemUrl?: string

    /**
     * Должность.
     * (1-128 символов)
     */
    position?: string

    /**
     * Фамилия, имя, отчество (при наличии).
     * (таб-15.16)
     */
    fullName: TPersonFullName

    /**
     * Сведения о доверенности, используемой для подтверждения полномочий
     * в электронной форме.
     * Обязателен при СтатПодп = 2 и отсутствии storageSystemUrl.
     * (таб-15.9)
     */
    powerOfAttorney?: TPowerOfAttorney
}

export function formatCarrierSigner(data: TCarrierSigner) {
    const needsPOA =
        data.status === CarrierSignerStatus.CarrierElectronicPOA &&
        !data.storageSystemUrl

    if (needsPOA && !data.powerOfAttorney) {
        throw new TypeError(
            "Требуется указать сведения о доверенности (powerOfAttorney) " +
            "при СтатПодп = 2 и отсутствии storageSystemUrl"
        )
    }

    return {
        "СтатПодп": formatCarrierSignerStatus(data.status),
        "ИдСистХран": data.storageSystemUrl,
        "Должн": data.position,
        "ФИО": formatPersonFullNameFields(data.fullName),
        "СвДовер": data.powerOfAttorney && formatPowerOfAttorney(data.powerOfAttorney),
    }
}
