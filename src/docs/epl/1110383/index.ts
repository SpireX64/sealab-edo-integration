/**
 * Публичное API документа ЭПЛ 1110383.
 * Реэкспортирует только типы, енумы и конструктор документа.
 * Функции форматирования — внутренние, не реэкспортируются.
 */

// Документ
export { Document1110383 } from './doc'
export type { TDocument1110383 } from './doc'

// Енумы
export {
    TripStartSign,
    SignatureType,
    AuthorityConfirmationMethod,
} from './consts'

// Типы таблиц
export type { TTechnicalCheckFileId } from './data/11.3-TechnicalCheckFileId'
export type { TShipperFileId } from './data/11.4-ShipperFileId'
export type { TDepartureContent } from './data/11.5-DepartureContent'
export type { TOdometerDeparture } from './data/11.6-OdometerDeparture'
export type { TOdometerHandover } from './data/11.7-OdometerHandover'
export type { TAuthorizedPerson } from './data/11.8-AuthorizedPerson'
export type { TDepartureSigner } from './data/11.9-DepartureSigner'
export type { TElectronicPOA } from './data/11.10-ElectronicPOA'
export type { TPaperPOA } from './data/11.11-PaperPOA'
export type { TPersonFullName } from './data/11.12-PersonFullName'