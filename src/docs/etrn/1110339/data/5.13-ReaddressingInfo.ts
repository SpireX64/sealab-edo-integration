/**
 * Сведения о процедуре переадресовки
 * (СвПА, таб-5.13)
 */

import { ReaddressingAuthority, formatReaddressingAuthority } from '../consts'
import { formatContacts, type TContacts } from './5.48-Contacts';
import { formatSettlementDoc, type TSettlementDoc } from './5.45-SettlementDoc';

export type TReaddressingInfo = {
    /** Лицо, по указанию которого может осуществляться переадресовка */
    authority: ReaddressingAuthority

    /**
     * Способ передачи указания на переадресовку.
     * Принимает значение: "Электронное уведомление перевозчика о переадресовке"
     */
    instructionDeliveryMethod: "Электронное уведомление перевозчика о переадресовке"

    /** Контакты лица, по указанию которого может осуществляться перевозка */
    contacts: TContacts

    /**
     * Реквизиты документа, подтверждающего передачу
     * полномочий по переадресовке грузополучателю.
     * Обязателен, если authority = Consignee.
     */
    authorityDoc?: TSettlementDoc
}

export function formatReaddressingInfo(data: TReaddressingInfo) {
    if (data.authority === ReaddressingAuthority.Consignee && !data.authorityDoc) {
        throw new TypeError(
            "Требуется указать документ, подтверждающий передачу " +
            "полномочий по переадресовке грузополучателю"
        )
    }

    return {
        "ЛицоПА": formatReaddressingAuthority(data.authority),
        "СпосПерУкПА": data.instructionDeliveryMethod,
        "КонтПА": formatContacts(data.contacts),
        "ДокПерПолнПА": data.authorityDoc && formatSettlementDoc(data.authorityDoc),
    }
}
