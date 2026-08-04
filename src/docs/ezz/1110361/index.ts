/**
 * Публичное API документа ЭЗЗ 1110361.
 * Реэкспортирует только типы, енумы и конструктор документа.
 * Функции форматирования — внутренние, не реэкспортируются.
 */

// Документ
export { Document1110361 } from './doc'
export type { TDocument1110361 } from './doc'

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
export type { TShipperContent } from './data/5.3-ShipperContent'
export type { TShipperAuthorizedPerson } from './data/5.4-ShipperAuthorizedPerson'
export type { TVehicleSubmissionPoint } from './data/5.5-VehicleSubmissionPoint'
export type { TLoadingUnloadingAddress } from './data/5.6-LoadingUnloadingAddress'
export type { TInfraOwner } from './data/5.7-InfraOwner'
export type { TCargoDescription } from './data/5.8-CargoDescription'
export type { TLoadingUnloadingPoint } from './data/5.9-LoadingUnloadingPoint'
export type { TVehicleRequirements } from './data/5.10-VehicleRequirements'
export type { TTemperatureRequirements } from './data/5.11-TemperatureRequirements'
export type { THumidityRequirements } from './data/5.12-HumidityRequirements'
export type { TShipperSigner } from './data/5.13-ShipperSigner'
export type { TElectronicPOA } from './data/5.14-ElectronicPOA'
export type { TPaperPOA } from './data/5.15-PaperPOA'
export type { TDocumentRequisites } from './data/5.16-DocumentRequisites'
export type { TIssuerRequisites } from './data/5.17-IssuerRequisites'
export type { TPartyInfo } from './data/5.18-PartyInfo'
export type { TParticipantInfo } from './data/5.19-ParticipantInfo'
export type { TIdentificationDetails } from './data/5.20-IdentificationDetails'
export type { TIndividualEntrepreneur } from './data/5.21-IndividualEntrepreneur'
export type { TLegalEntity } from './data/5.22-LegalEntity'
export type { TForeignEntityNotRegistered } from './data/5.23-ForeignEntityNotRegistered'
export type { TIndividual } from './data/5.24-Individual'
export type { TAddress } from './data/5.25-Address'
export type { TAddressInfo } from './data/5.26-AddressInfo'
export type { TCoordinates } from './data/5.27-Coordinates'
export type { TRussianAddress } from './data/5.28-RussianAddress'
export type { TFiasAddress } from './data/5.29-FiasAddress'
export type { TElementKindCodeName } from './data/5.30-ElementKindCodeName'
export type { TElementKindName } from './data/5.31-ElementKindName'
export type { TElementTypeName } from './data/5.32-ElementTypeName'
export type { TAddressElementNumber } from './data/5.33-AddressElementNumber'
export type { TForeignAddressInfo } from './data/5.34-ForeignAddressInfo'
export type { TForeignPersonIdDocument } from './data/5.35-ForeignPersonIdDocument'
export type { TCargoWeight } from './data/5.36-CargoWeight'
export type { TDimensions } from './data/5.37-Dimensions'
export type { TDangerousGoods } from './data/5.38-DangerousGoods'
export type { TContacts } from './data/5.39-Contacts'
export type { TInfoField } from './data/5.40-InfoField'
export type { TTextInfo } from './data/5.41-TextInfo'
export type { TPersonFullName } from './data/5.42-PersonFullName'
