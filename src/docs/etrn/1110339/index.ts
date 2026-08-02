/**
 * Публичное API документа ЭТрН 1110339.
 * Реэкспортирует только типы, енумы и конструктор документа.
 * Функции форматирования — внутренние, не реэкспортируются.
 */

// Документ
export { Document111339 } from './doc'
export type { TDocument111339 } from './doc'

// Енумы
export {
    IssuerType,
    VehicleOwnershipType,
    ReaddressingAuthority,
    ShipperNoteReason,
    MassDeterminationMethod,
    ShipperSignerStatus,
    InfraOwnerMatchesShipper,
} from './consts'

// Общие типы
export type {
    TRange,
    TPersonFullName,
    TForeignCurrencyInfo,
    TRussianAddressInfo,
    TGenericAddressInfo,
    TFiasId,
    TAddress,
} from './types'

// Типы таблиц
export type { TShipperWaybill } from './data/5.3-ShipperWaybill'
export type { TOrderFile, TOrderFileId } from './data/5.4-OrderFile'
export type { TShipperInfo } from './data/5.5-ShipperInfo'
export type { TConsigneeInfo } from './data/5.7-ConsigneeInfo'
export type { TCargoInfo } from './data/5.8-CargoInfo'
export type { TCargoDescription } from './data/5.9-CargoDescription'
export type { TGovSystemInfo } from './data/5.10-GovSystemInfo'
export type { TAccompaningDocs } from './data/5.11-AccompaningDocs'
export type { TShipperInstructions } from './data/5.12-ShipperInstructions'
export type { TReaddressingInfo } from './data/5.13-ReaddressingInfo'
export type { TClimateMode } from './data/5.14-ClimateMode'
export type { TDriverInfo } from './data/5.15-DriverInfo'
export type { TVehicleInfo } from './data/5.16-VehicleInfo'
export type { TLoadingInfo } from './data/5.17-LoadingInfo'
export type { TLoadingPersonInfo } from './data/5.18-LoadingPersonInfo'
export type { TLoadingPersonWorker } from './data/5.19-LoadingPersonWorker'
export type { TInfrastructureOwnerInfo } from './data/5.20-InfrastructureOwnerInfo'
export type { TShipperNote } from './data/5.21-ShipperNote'
export type { TSignerInfo } from './data/5.23-SignerInfo'
export type { TPowerOfAttorney } from './data/5.24-PowerOfAttorney'
export type { TWaybillCorrection } from './data/5.43-WaybillCorrection'
export type { TForeignPersonIdDocument } from './data/5.46-ForeignPersonIdDocument'
export type { TPenaltyInfo } from './data/5.22-PenaltyInfo'
export type { TPartyDetails } from './data/5.29-PartyDetails'
export type { TParticipantInfo } from './data/5.30-ParticipantInfo'
export type { TSpecialDrivingCondition } from './data/5.31-SpecialDrivingCondition'
export type { TRouteInfo } from './data/5.32-RouteInfo'
export type { TDangerousGoodsInfo } from './data/5.33-DangerousGoodsInfo'
export type { TContainerInfo } from './data/5.34-ContainerInfo'
export type { TLegalEntityInfo } from './data/5.25-LegalEntityInfo'
export type { TSoleProprietorInfo } from './data/5.26-SoleProprietorInfo'
export type { TForeignEntityInfo } from './data/5.27-ForeignEntityInfo'
export type { TIndividualInfo } from './data/5.28-IndividualInfo'
export type { TIdentificationDetails } from './data/5.35-IdentificationDetails'
export type { TIssuerIdentity, TForeignIssuerIdentity } from './data/5.36-IssuerIdentity'
export type { TVehicleParams } from './data/5.37-VehicleParams'
export type { TVehicleSpecs } from './data/5.38-VehicleSpecs'
export type { TDimensionsInfo } from './data/5.39-DimensionsInfo'
export type { TDeclaredValueInfo } from './data/5.40-DeclaredValueInfo'
export type { TWeightInfo } from './data/5.41-WeightInfo'
export type { TCoordinates } from './data/5.42-Coordinates'
export type { TInfoField } from './data/5.44-InfoField'
export type { TSettlementDoc } from './data/5.45-SettlementDoc'
export type { TTextInfo } from './data/5.47-TextInfo'
export type { TContacts } from './data/5.48-Contacts'
export type { TConcreteAddress } from './data/5.49-ConcreteAddress'
export type { TTransportCustomerInfo } from './data/5.6-TransportCustomerInfo'
