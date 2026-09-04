/**
 * Публичное API документа ЭПЛ 1110380.
 * Реэкспортирует только типы, енумы и конструктор документа.
 * Функции форматирования — внутренние, не реэкспортируются.
 */

// Документ
export { Document1110380 } from './doc'
export type { TDocument1110380, TFileMeta1110380 } from './doc'

// Семантическая подстановка (для ЗаписатьДокумент / СгенерироватьВложение)
export { toSubstitution } from './substitution'

// Енумы
export {
    TripStartSign,
    TransportKind,
    CommercialTransportKind,
    MessageKind,
    WaybillIssuerKind,
    IdentificationKind,
    ParticipantKind,
    SignatureType,
    AuthorityConfirmationMethod,
    AddressType,
    MunicipalDistrictKind,
    SettlementKind,
} from './consts'

// Типы таблиц
export type { TWaybillContent } from './data/5.3-WaybillContent'
export type { TWaybillValidity } from './data/5.4-WaybillValidity'
export type { TWaybillIssuer } from './data/5.5-WaybillIssuer'
export type { TIdentificationDetails } from './data/5.6-IdentificationDetails'
export type { TIndividualEntrepreneur } from './data/5.7-IndividualEntrepreneur'
export type { TLegalEntity } from './data/5.8-LegalEntity'
export type { TVehicleInfo } from './data/5.9-VehicleInfo'
export type { TVehicle } from './data/5.10-Vehicle'
export type { TTrailer } from './data/5.11-Trailer'
export type { TDriverInfo } from './data/5.12-DriverInfo'
export type { TDriverLicense } from './data/5.13-DriverLicense'
export type { TShipperInfo } from './data/5.14-ShipperInfo'
export type { TParticipantInfo } from './data/5.15-ParticipantInfo'
export type { TParticipantIdentification } from './data/5.16-ParticipantIdentification'
export type { TIndividualEntrepreneur5 } from './data/5.17-IndividualEntrepreneur'
export type { TLegalEntity5 } from './data/5.18-LegalEntity'
export type { TForeignEntityNotRegistered } from './data/5.19-ForeignEntityNotRegistered'
export type { TIndividual } from './data/5.20-Individual'
export type { TForeignPersonIdDocument } from './data/5.21-ForeignPersonIdDocument'
export type { TWaybillSigner } from './data/5.22-WaybillSigner'
export type { TElectronicPOA } from './data/5.23-ElectronicPOA'
export type { TPaperPOA } from './data/5.24-PaperPOA'
export type { TInfoField } from './data/5.25-InfoField'
export type { TTextInfo } from './data/5.26-TextInfo'
export type { TDeparturePoint } from './data/5.27-DeparturePoint'
export type { TCoordinates } from './data/5.28-Coordinates'
export type { TAddress } from './data/5.29-Address'
export type { TRussianAddress } from './data/5.30-RussianAddress'
export type { TFiasAddress } from './data/5.31-FiasAddress'
export type { TElementKindCodeName } from './data/5.32-ElementKindCodeName'
export type { TElementKindName } from './data/5.33-ElementKindName'
export type { TElementTypeName } from './data/5.34-ElementTypeName'
export type { TAddressElementNumber } from './data/5.35-AddressElementNumber'
export type { TForeignAddressInfo } from './data/5.36-ForeignAddressInfo'
export type { TContacts } from './data/5.37-Contacts'
export type { TPersonFullName } from './data/5.38-PersonFullName'
