/**
 * Публичное API документа ЭТрН 1110342.
 * Реэкспортирует только типы, енумы и конструктор документа.
 * Функции форматирования — внутренние, не реэкспортируются.
 */

// Документ
export { Document1110342 } from './doc'
export type { TDocument1110342 } from './doc'

// Енумы
export { CarrierSignerStatus } from './consts'
export { IssuerType } from '../common/IssuerType'

// Типы таблиц
export type { TConsigneeFileId } from './data/15.3-ConsigneeFileId'
export type { TCarrierWaybillInfo } from './data/15.4-CarrierWaybillInfo'
export type { TCarrierReservations } from './data/15.5-CarrierReservations'
export type { TCarrierNote } from './data/15.6-CarrierNote'
export type { TPenaltyInfo } from './data/15.7-PenaltyCalculation'
export type { TCarrierSigner } from './data/15.8-CarrierSigner'
export type { TPowerOfAttorney } from './data/15.9-PowerOfAttorney'
export type { TForeignEntityNotRegistered } from './data/15.10-ForeignEntityNotRegistered'
export type { TIssuerRequisites } from './data/15.11-IssuerRequisites'
export type { TInfoField } from './data/15.12-InfoField'
export type { TCommercialAct } from './data/15.13-CommercialAct'
export type { TForeignPersonIdDocument } from './data/15.14-ForeignPersonIdDocument'
export type { TTextInfo } from './data/15.15-TextInfo'
