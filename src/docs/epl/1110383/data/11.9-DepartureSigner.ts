/**
 * Сведения о лице, подписывающем информацию отправителя
 * в электронной форме
 * (ПодписантТип, таб-11.9)
 */

import { mapArrayIfNotEmpty } from '../../../../helpers'
import {
    SignatureType,
    AuthorityConfirmationMethod,
    formatSignatureType,
    formatAuthorityConfirmationMethod,
} from '../consts'
import { formatPersonFullNameFields, type TPersonFullName } from './11.12-PersonFullName'
import { formatElectronicPOA, type TElectronicPOA } from './11.10-ElectronicPOA'
import { formatPaperPOA, type TPaperPOA } from './11.11-PaperPOA'

export type TDepartureSigner = {
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
     * (таб-11.12)
     */
    fullName: TPersonFullName

    /**
     * Сведения о доверенности в машиночитаемом виде.
     * Обязателен при СпосПодтПолном = 3.
     * (таб-11.10)
     */
    electronicPOAs?: TElectronicPOA[]

    /**
     * Сведения о доверенности в бумажном виде.
     * Обязателен при СпосПодтПолном = 5.
     * (таб-11.11)
     */
    paperPOAs?: TPaperPOA[]
}

export function formatDepartureSigner(data: TDepartureSigner) {
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