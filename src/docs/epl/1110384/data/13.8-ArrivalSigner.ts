/**
 * Сведения о лице, подписывающем информацию отправителя
 * в электронной форме
 * (ПодписантТип, таб-13.8)
 */

import { mapArrayIfNotEmpty } from '../../../../helpers'
import {
    SignatureType,
    AuthorityConfirmationMethod,
    formatSignatureType,
    formatAuthorityConfirmationMethod,
} from '../consts'
import { formatPersonFullNameFields, type TPersonFullName } from './13.11-PersonFullName'
import { formatElectronicPOA, type TElectronicPOA } from './13.9-ElectronicPOA'
import { formatPaperPOA, type TPaperPOA } from './13.10-PaperPOA'

export type TArrivalSigner = {
    /**
     * Должность.
     * (1-255 символов)
     */
    position?: string

    /**
     * Тип подписи.
     * 1 – УКЭП; 2 – ПЭП; 3 – УНЭП.
     */
    signatureType?: SignatureType

    /**
     * Способ подтверждения полномочий на подписание документа.
     * 1 – данные в ЭП; 2 – МЧД в пакете; 3 – МЧД в ИС (сведения в документе);
     * 4 – МЧД в ИС (сведения иным способом); 5 – бумажная доверенность; 6 – иное.
     */
    authorityConfirmationMethod: AuthorityConfirmationMethod

    /**
     * Дополнительные сведения о подписанте.
     * (1-255 символов)
     */
    additionalInfo?: string

    /**
     * Фамилия, имя, отчество (при наличии).
     * (таб-13.11)
     */
    fullName: TPersonFullName

    /**
     * Сведения о доверенности в машиночитаемом виде.
     * Обязателен при СпосПодтПолном = 3.
     * (таб-13.9)
     */
    electronicPOAs?: TElectronicPOA[]

    /**
     * Сведения о доверенности в бумажном виде.
     * Обязателен при СпосПодтПолном = 5.
     * (таб-13.10)
     */
    paperPOAs?: TPaperPOA[]
}

export function formatArrivalSigner(data: TArrivalSigner) {
    return {
        "Должн": data.position,
        "ТипПодпис": data.signatureType && formatSignatureType(data.signatureType),
        "СпосПодтПолном": formatAuthorityConfirmationMethod(data.authorityConfirmationMethod),
        "ДопСведПодп": data.additionalInfo,
        "ФИО": formatPersonFullNameFields(data.fullName),
        "СвДоверЭл": mapArrayIfNotEmpty(data.electronicPOAs, formatElectronicPOA),
        "СвДоверБум": mapArrayIfNotEmpty(data.paperPOAs, formatPaperPOA),
    }
}
