/**
 * Публичное API документа ЭТрН 1110341.
 * Реэкспортирует только типы, енумы и конструктор документа.
 * Функции форматирования — внутренние, не реэкспортируются.
 */

// Документ
export { Document1110341 } from './doc'
export type { TDocument1110341 } from './doc'

// Енумы
export { MassDeterminationMethod } from '../common/MassDeterminationMethod'
export { ConsigneeSignerStatus } from './consts'

// Типы таблиц
export type { TCarrierAcceptanceFileId } from './data/13.3-CarrierAcceptanceFileId'
export type { TConsigneeReceiptInfo } from './data/13.4-ConsigneeReceiptInfo'
export type { TConsigneeAcceptance } from './data/13.5-ConsigneeAcceptance'
export type { TAcceptedCargoByName } from './data/13.6-AcceptedCargoByName'
export type { TConsigneeNote } from './data/13.7-ConsigneeNote'
export type { TPenaltyInfo } from './data/13.8-ConsigneePenaltyCalc'
export type { TConsigneeSigner } from './data/13.9-ConsigneeSigner'
export type { TConsigneePowerOfAttorney } from './data/13.10-ConsigneePowerOfAttorney'
export type { TForeignEntityNotRegistered } from './data/13.11-ForeignEntityNotRegistered'
export type { TIssuerRequisites } from './data/13.12-IssuerRequisites'
export type { TCoordinates } from './data/13.13-Coordinates'
export type { TCargoWeight } from './data/13.14-CargoWeight'
export type { TWaybillCorrection } from './data/13.15-WaybillCorrection'
export type { TInfoField } from './data/13.16-InfoField'
export type { TDocumentRequisites } from './data/13.17-DocumentRequisites'
export type { TForeignPersonIdDocument } from './data/13.18-ForeignPersonIdDocument'
export type { TTextInfo } from './data/13.19-TextInfo'
export type { TAddress } from './data/13.20-Address'
export type { TRussianAddress } from './data/13.21-RussianAddress'
export type { TForeignAddressInfo } from './data/13.22-ForeignAddressInfo'
export type { TPersonFullName } from './data/13.23-PersonFullName'
