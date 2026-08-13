/**
 * Публичное API документа ЭПЛ 1110384.
 * Реэкспортирует только типы, енумы и конструктор документа.
 * Функции форматирования — внутренние, не реэкспортируются.
 */

// Документ
export { Document1110384 } from './doc'
export type { TDocument1110384 } from './doc'

// Енумы
export {
    TripEndSign,
    SignatureType,
    AuthorityConfirmationMethod,
} from './consts'

// Типы таблиц
export type { TDepartureFileId } from './data/13.3-DepartureFileId'
export type { TArrivalContent } from './data/13.4-ArrivalContent'
export type { TOdometerArrival } from './data/13.5-OdometerArrival'
export type { TOdometerHandover } from './data/13.6-OdometerHandover'
export type { TAuthorizedPerson } from './data/13.7-AuthorizedPerson'
export type { TArrivalSigner } from './data/13.8-ArrivalSigner'
export type { TElectronicPOA } from './data/13.9-ElectronicPOA'
export type { TPaperPOA } from './data/13.10-PaperPOA'
export type { TPersonFullName } from './data/13.11-PersonFullName'
