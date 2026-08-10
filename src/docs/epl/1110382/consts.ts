/**
 * Константы и перечисления документа ЭПЛ 1110382.
 */

// Реэкспорт из ЭПЛ 1110380 — значения совпадают:
// ТипПодпис: 1=УКЭП, 2=ПЭП, 3=УНЭП
// СпосПодтПолном: 1-6
export {
    SignatureType,
    AuthorityConfirmationMethod,
    formatSignatureType,
    formatAuthorityConfirmationMethod,
} from '../1110380/consts'
