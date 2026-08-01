/**
 * Сведения о лице, подписывающем файл обмена информации грузоотправителя
 * (Подписант, таб-5.23)
 */

import { SignerStatus, formatSignerStatus } from '../consts'
import { formatPersonFullName } from '../types'
import type { TPersonFullName } from '../types'
import { formatPowerOfAttorney } from './5.24-PowerOfAttorney'
import type { TPowerOfAttorney } from './5.24-PowerOfAttorney'

export type TSignerInfo = {
    /**
     * Статус подписанта.
     * Может принимать значение 3 или 6, если иное не предусмотрено
     * законодательством РФ в области электронной подписи.
     */
    status: SignerStatus

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
     */
    fullName: TPersonFullName

    /**
     * Сведения о доверенности, используемой для подтверждения полномочий
     * в электронной форме.
     * Обязателен при СтатПодп = 2 или 5 и отсутствии storageSystemUrl.
     * (таб-5.24)
     */
    powerOfAttorney?: TPowerOfAttorney
}

export function formatSignerInfo(data: TSignerInfo) {
    const needsPOA =
        (data.status === SignerStatus.ShipperElectronicPOA ||
         data.status === SignerStatus.LoaderElectronicPOA) &&
        !data.storageSystemUrl

    if (needsPOA && !data.powerOfAttorney) {
        throw new TypeError(
            "Требуется указать сведения о доверенности (powerOfAttorney) " +
            "при СтатПодп = 2 или 5 и отсутствии storageSystemUrl"
        )
    }

    return {
        "СтатПодп": formatSignerStatus(data.status),
        "ИдСистХран": data.storageSystemUrl,
        "Должн": data.position,
        "ФИО": formatPersonFullName(data.fullName),
        "СвДовер": data.powerOfAttorney && formatPowerOfAttorney(data.powerOfAttorney),
    }
}
