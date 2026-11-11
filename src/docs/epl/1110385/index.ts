/**
 * Публичное API документа ЭПЛ 1110385.
 * Реэкспортирует только типы, енумы и конструктор документа.
 * Функции форматирования — внутренние, не реэкспортируются.
 */

// Документ
export { Document1110385 } from './doc'
export type { TDocument1110385 } from './doc'

// Енумы
export {
    MedicalExamKind,
    MedicalWorkerSourceKind,
    SignatureType,
    AuthorityConfirmationMethod,
} from './consts'

// Типы таблиц
export type { TArrivalFileId } from './data/15.3-ArrivalFileId'
export type { TMedicalExamContent } from './data/15.4-MedicalExamContent'
export type { TMedicalWorkerStaff } from './data/15.5-MedicalWorkerStaff'
export type { TMedicalWorkerOrg } from './data/15.6-MedicalWorkerOrg'
export type { TMedicalExamPassInfo } from './data/15.7-MedicalExamPassInfo'
export type { TDriverExamInfo } from './data/15.8-DriverExamInfo'
export type { TDriverLicense } from './data/15.9-DriverLicense'
export type { TMedicalLicense } from './data/15.10-MedicalLicense'
export type { TMedicalExamSigner } from './data/15.11-MedicalExamSigner'
export type { TElectronicPOA } from './data/15.12-ElectronicPOA'
export type { TPaperPOA } from './data/15.13-PaperPOA'
export type { TPersonFullName } from './data/15.14-PersonFullName'
