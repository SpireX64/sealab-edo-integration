/**
 * Сведения о лице, подписывающем файл обмена информации грузоотправителя
 * о приеме груза к перевозке
 * (Подписант, таб-19.5)
 */

import { ShipperSignerStatus, formatShipperSignerStatus } from '../consts'
import { formatPersonFullNameFields, type TPersonFullName } from '../../../common/PersonFullName';
import { formatPowerOfAttorney, type TPowerOfAttorney } from '../../common/PowerOfAttorney';

export type TShipperSigner = {
    /**
     * Статус подписанта.
     * Может принимать значение 3, если иное не предусмотрено
     * законодательством РФ в области электронной подписи.
     */
    status: ShipperSignerStatus

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
     * (таб-7.16)
     */
    fullName: TPersonFullName

    /**
     * Сведения о доверенности, используемой для подтверждения полномочий
     * в электронной форме.
     * Обязателен при СтатПодп = 2 и отсутствии storageSystemUrl.
     * (таб-7.9)
     */
    powerOfAttorney?: TPowerOfAttorney
}

export function formatShipperSigner(data: TShipperSigner) {
    const needsPOA =
        data.status === ShipperSignerStatus.ShipperElectronicPOA &&
        !data.storageSystemUrl

    if (needsPOA && !data.powerOfAttorney) {
        throw new TypeError(
            "Требуется указать сведения о доверенности (powerOfAttorney) " +
            "при СтатПодп = 2 и отсутствии storageSystemUrl"
        )
    }

    return {
        "СтатПодп": formatShipperSignerStatus(data.status),
        "ИдСистХран": data.storageSystemUrl,
        "Должн": data.position,
        "ФИО": formatPersonFullNameFields(data.fullName),
        "СвДовер": data.powerOfAttorney && formatPowerOfAttorney(data.powerOfAttorney),
    }
}
