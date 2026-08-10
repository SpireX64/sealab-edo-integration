/**
 * Публичное API документа ЭПЛ 1110382.
 * Реэкспортирует только типы, енумы и конструктор документа.
 * Функции форматирования — внутренние, не реэкспортируются.
 */

// Документ
export { Document1110382 } from './doc'
export type { TDocument1110382 } from './doc'

// Енумы
export {
    SignatureType,
    AuthorityConfirmationMethod,
} from './consts'

// Типы таблиц
export type { TFileIdentification } from './data/9.3-FileIdentification'
export type { TTechnicalCheckContent } from './data/9.4-TechnicalCheckContent'
export type { TResponsiblePerson } from './data/9.5-ResponsiblePerson'
export type { TVehicleInfo } from './data/9.6-VehicleInfo'
export type { TVehicle } from './data/9.7-Vehicle'
export type { TTrailer } from './data/9.8-Trailer'
export type { TTechnicalCheckSigner } from './data/9.9-TechnicalCheckSigner'
export type { TElectronicPOA } from './data/9.10-ElectronicPOA'
export type { TPaperPOA } from './data/9.11-PaperPOA'
export type { TPersonFullName } from './data/9.12-PersonFullName'