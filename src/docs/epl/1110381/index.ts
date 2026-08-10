/**
 * Публичное API документа ЭПЛ 1110381.
 * Реэкспортирует только типы, енумы и конструктор документа.
 * Функции форматирования — внутренние, не реэкспортируются.
 */

// Документ
export { Document1110381 } from './doc'
export type { TDocument1110381 } from './doc'

// Енумы
export {
    MedicalExamKind,
    MedicalWorkerSourceKind,
    SignatureType,
    AuthorityConfirmationMethod,
} from './consts'

// Типы таблиц
export type { TShipperFileId } from './data/7.3-ShipperFileId'
export type { TMedicalExamContent } from './data/7.4-MedicalExamContent'
export type { TMedicalWorkerStaff } from './data/7.5-MedicalWorkerStaff'
export type { TMedicalWorkerOrg } from './data/7.6-MedicalWorkerOrg'
export type { TMedicalExamPassInfo } from './data/7.7-MedicalExamPassInfo'
export type { TDriverExamInfo } from './data/7.8-DriverExamInfo'
export type { TDriverLicense } from './data/7.9-DriverLicense'
export type { TMedicalLicense } from './data/7.10-MedicalLicense'
export type { TMedicalExamSigner } from './data/7.11-MedicalExamSigner'
export type { TElectronicPOA } from './data/7.12-ElectronicPOA'
export type { TPaperPOA } from './data/7.13-PaperPOA'
export type { TPersonFullName } from './data/7.14-PersonFullName'
