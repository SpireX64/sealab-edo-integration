/**
 * Сведения о лице, подписывающем информацию отправителя
 * в электронной форме
 * (ПодписантТип, таб-5.13)
 */

import { mapArrayIfNotEmpty } from '../../../../helpers'
import {
    SignatureType,
    formatSignatureType,
    AuthorityConfirmationMethod,
    formatAuthorityConfirmationMethod,
} from '../consts'
import { formatElectronicPOA, type TElectronicPOA } from './5.14-ElectronicPOA';
import { formatPaperPOA, type TPaperPOA } from './5.15-PaperPOA';
import { formatPersonFullNameFields, type TPersonFullName } from './5.42-PersonFullName';

export type TShipperSigner = {
    /**
     * Должность.
     * (1-255 символов)
     */
    position: string

    /**
     * Тип подписи.
     * 1 – усиленная квалифицированная электронная подпись;
     * 2 – простая электронная подпись;
     * 3 – усиленная неквалифицированная электронная подпись.
     */
    signatureType?: SignatureType

    /**
     * Способ подтверждения полномочий на подписание документа.
     * 1 – данные в электронной подписи;
     * 2 – эл. доверенность в машиночитаемой форме (включена в пакет);
     * 3 – эл. доверенность в машиночитаемой форме (хранение в ИС, сведения в документе);
     * 4 – эл. доверенность в машиночитаемой форме (хранение в ИС, сведения иным способом);
     * 5 – доверенность на бумажном носителе;
     * 6 – любое иное.
     */
    authorityConfirmationMethod: AuthorityConfirmationMethod

    /**
     * Дополнительные сведения о подписанте.
     * (1-255 символов)
     */
    additionalInfo?: string

    /**
     * Фамилия, имя, отчество (при наличии).
     * Должна соответствовать ФИО владельца сертификата ключа
     * проверки электронной подписи.
     * (таб-5.42)
     */
    fullName?: TPersonFullName

    /**
     * Сведения о доверенности в машиночитаемом виде.
     * Обязателен и формируется только при
     * {authorityConfirmationMethod} = ElectronicPOAInSystemByDoc (3).
     * (таб-5.14)
     */
    electronicPOAs?: TElectronicPOA[]

    /**
     * Сведения о доверенности в бумажном виде.
     * Обязателен и формируется только при
     * {authorityConfirmationMethod} = PaperPOA (5).
     * (таб-5.15)
     */
    paperPOAs?: TPaperPOA[]
}

export function formatShipperSigner(data: TShipperSigner) {
    if (data.authorityConfirmationMethod === AuthorityConfirmationMethod.ElectronicPOAInSystemByDoc
        && (!data.electronicPOAs || data.electronicPOAs.length === 0)) {
        throw new TypeError(
            "Требуется указать electronicPOAs при authorityConfirmationMethod = ElectronicPOAInSystemByDoc (3)"
        )
    }

    if (data.authorityConfirmationMethod === AuthorityConfirmationMethod.PaperPOA
        && (!data.paperPOAs || data.paperPOAs.length === 0)) {
        throw new TypeError(
            "Требуется указать paperPOAs при authorityConfirmationMethod = PaperPOA (5)"
        )
    }

    return {
        "Должн": data.position,
        "ТипПодпис": data.signatureType && formatSignatureType(data.signatureType),
        "СпосПодтПолном": formatAuthorityConfirmationMethod(data.authorityConfirmationMethod),
        "ДопСведПодп": data.additionalInfo,
        "ФИО": data.fullName && formatPersonFullNameFields(data.fullName),
        "СвДоверЭл": mapArrayIfNotEmpty(data.electronicPOAs, formatElectronicPOA),
        "СвДоверБум": mapArrayIfNotEmpty(data.paperPOAs, formatPaperPOA),
    }
}
