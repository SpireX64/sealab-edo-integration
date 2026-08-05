/**
 * Публичное API документа ЭЗЗ 1110362.
 * Реэкспортирует только типы, енумы и конструктор документа.
 * Функции форматирования — внутренние, не реэкспортируются.
 */

// Документ
export { Document1110362 } from './doc'
export type { TDocument1110362 } from './doc'

// Енумы
export {
    Authority,
    OperationType,
    MassDeterminationMethod,
    SignatureType,
    AuthorityConfirmationMethod,
    IssuerType,
} from './consts'

// Типы таблиц
// TODO
