/**
 * Сведения о лице, подписывающем информацию отправителя
 * в электронной форме
 * (ПодписантТип, таб-7.11)
 */

import { mapArrayIfNotEmpty } from '../../../../helpers'
import {
    SignatureType,
    AuthorityConfirmationMethod,
    formatSignatureType,
    formatAuthorityConfirmationMethod,
} from '../consts'
import { formatPersonFullNameFields, type TPersonFullName } from './7.14-PersonFullName'
import { formatElectronicPOA, type TElectronicPOA } from './7.12-ElectronicPOA'
import { formatPaperPOA, type TPaperPOA } from './7.13-PaperPOA'

export type TMedicalExamSigner = {
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
     * (таб-7.14)
     */
    fullName: TPersonFullName

    /**
     * Сведения о доверенности в машиночитаемом виде.
     * Обязателен при СпосПодтПолном = 3.
     * (таб-7.12)
     */
    electronicPOAs?: TElectronicPOA[]

    /**
     * Сведения о доверенности в бумажном виде.
     * (таб-7.13)
     */
    paperPOAs?: TPaperPOA[]
}

export function formatMedicalExamSigner(data: TMedicalExamSigner) {
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