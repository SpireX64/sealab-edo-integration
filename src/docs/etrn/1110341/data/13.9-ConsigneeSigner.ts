/**
 * Сведения о лице, подписывающем файл обмена информации грузополучателя
 * (Подписант, таб-13.9)
 */

import { ConsigneeSignerStatus, formatConsigneeSignerStatus } from '../consts'
import { formatConsigneePowerOfAttorney, type TConsigneePowerOfAttorney } from './13.10-ConsigneePowerOfAttorney';
import { formatPersonFullNameFields, type TPersonFullName } from './13.23-PersonFullName';

export type TConsigneeSigner = {
    /**
     * Статус подписанта.
     * Может принимать значение 3, если иное не предусмотрено
     * законодательством РФ в области электронной подписи.
     */
    status: ConsigneeSignerStatus

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
     * (таб-13.23)
     */
    fullName?: TPersonFullName

    /**
     * Сведения о доверенности, используемой для подтверждения полномочий
     * в электронной форме.
     * Обязателен при СтатПодп = 2 и отсутствии storageSystemUrl.
     * (таб-13.10)
     */
    powerOfAttorney?: TConsigneePowerOfAttorney
}

export function formatConsigneeSigner(data: TConsigneeSigner) {
    const needsPOA =
        data.status === ConsigneeSignerStatus.ConsigneeElectronicPOA &&
        !data.storageSystemUrl

    if (needsPOA && !data.powerOfAttorney) {
        throw new TypeError(
            "Требуется указать сведения о доверенности (powerOfAttorney) " +
            "при СтатПодп = 2 и отсутствии storageSystemUrl"
        )
    }

    return {
        "СтатПодп": formatConsigneeSignerStatus(data.status),
        "ИдСистХран": data.storageSystemUrl,
        "Должн": data.position,
        "ФИО": data.fullName && formatPersonFullNameFields(data.fullName),
        "СвДовер": data.powerOfAttorney && formatConsigneePowerOfAttorney(data.powerOfAttorney),
    }
}
