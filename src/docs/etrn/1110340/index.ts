/**
 * Публичное API документа ЭТрН 1110340.
 * Реэкспортирует только типы, енумы и конструктор документа.
 * Функции форматирования — внутренние, не реэкспортируются.
 */

// Документ
export { Document1110340 } from './doc'
export type { TDocument1110340 } from './doc'

// Енумы
export { CarrierCargoConditionNote, CarrierNoteReason, CarrierSignerStatus } from './consts'
export { IssuerType } from '../common/IssuerType'

// Типы таблиц
export type { TShipperFileId } from './data/7.3-ShipperFileId'
export type { TCarrierWaybillInfo } from './data/7.4-CarrierWaybillInfo'
export type { TCarrierReservations } from './data/7.5-CarrierReservations'
export type { TCarrierNote } from './data/7.6-CarrierNote'
export type { TPenaltyInfo } from './data/7.7-PenaltyCalculation'
export type { TCarrierSigner } from './data/7.8-SignerInfo'
export type { TPowerOfAttorney } from './data/7.9-PowerOfAttorney'
export type { TForeignEntityNotRegistered } from './data/7.10-ForeignEntityNotRegistered'
export type { TIssuerRequisites } from './data/7.11-IssuerRequisites'
export type { TInfoField } from './data/7.12-InfoField'
export type { TCommercialAct } from './data/7.13-CommercialAct'
export type { TForeignPersonIdDocument } from './data/7.14-ForeignPersonIdDocument'
export type { TTextInfo } from './data/7.15-TextInfo'
