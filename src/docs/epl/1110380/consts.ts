/**
 * Константы и перечисления документа ЭПЛ 1110380.
 */

/**
 * Признак начала рейса.
 */
export enum TripStartSign {
    /** Выезд с парковки (парковочного места) */
    ParkingDeparture = "ParkingDeparture",
    /** Прием-сдача транспортного средства последующим водителем */
    VehicleHandover = "VehicleHandover",
}

export function formatTripStartSign(value: TripStartSign): string {
    switch (value) {
        case TripStartSign.ParkingDeparture:
            return "1"
        case TripStartSign.VehicleHandover:
            return "2"
    }
}

/**
 * Вид перевозки.
 */
export enum TransportKind {
    /** Коммерческие перевозки */
    Commercial = "Commercial",
    /** Перевозки для собственных нужд */
    OwnNeeds = "OwnNeeds",
    /** Передвижение и работа специальных транспортных средств */
    Special = "Special",
}

export function formatTransportKind(value: TransportKind): string {
    switch (value) {
        case TransportKind.Commercial:
            return "КП"
        case TransportKind.OwnNeeds:
            return "СН"
        case TransportKind.Special:
            return "СТ"
    }
}

/**
 * Вид коммерческой перевозки.
 */
export enum CommercialTransportKind {
    /** Регулярная перевозка пассажиров и багажа */
    RegularPassenger = "RegularPassenger",
    /** Перевозка грузов */
    Cargo = "Cargo",
    /** Перевозка пассажиров и багажа по заказу */
    PassengerOrder = "PassengerOrder",
    /** Перевозка пассажиров и багажа легковым такси */
    Taxi = "Taxi",
    /** Организованная перевозка групп детей автобусами */
    ChildrenGroup = "ChildrenGroup",
}

export function formatCommercialTransportKind(value: CommercialTransportKind): string {
    switch (value) {
        case CommercialTransportKind.RegularPassenger:
            return "РП"
        case CommercialTransportKind.Cargo:
            return "ПГ"
        case CommercialTransportKind.PassengerOrder:
            return "ЗП"
        case CommercialTransportKind.Taxi:
            return "ЛТ"
        case CommercialTransportKind.ChildrenGroup:
            return "ПД"
    }
}

/**
 * Вид сообщения.
 */
export enum MessageKind {
    /** Городское */
    Urban = "Urban",
    /** Пригородное */
    Suburban = "Suburban",
    /** Междугородное */
    Intercity = "Intercity",
}

export function formatMessageKind(value: MessageKind): string {
    switch (value) {
        case MessageKind.Urban:
            return "Г"
        case MessageKind.Suburban:
            return "П"
        case MessageKind.Intercity:
            return "М"
    }
}

/**
 * Лицо, оформившее путевой лист.
 */
export enum WaybillIssuerKind {
    /** Собственник (владелец) транспортного средства */
    Owner = "Owner",
    /** Арендодатель, предоставивший в аренду транспортное средство с экипажем */
    Lessor = "Lessor",
}

export function formatWaybillIssuerKind(value: WaybillIssuerKind): string {
    switch (value) {
        case WaybillIssuerKind.Owner:
            return "С"
        case WaybillIssuerKind.Lessor:
            return "А"
    }
}

/**
 * Тип идентификационных сведений.
 */
export enum IdentificationKind {
    /** Индивидуальный предприниматель */
    IndividualEntrepreneur = "IndividualEntrepreneur",
    /** Юридическое лицо */
    LegalEntity = "LegalEntity",
}

/**
 * Тип участника перевозки (идентификационные сведения).
 */
export enum ParticipantKind {
    /** Индивидуальный предприниматель */
    IndividualEntrepreneur = "IndividualEntrepreneur",
    /** Юридическое лицо */
    LegalEntity = "LegalEntity",
    /** Иностранная организация (иностранный гражданин) */
    ForeignEntityNotRegistered = "ForeignEntityNotRegistered",
    /** Физическое лицо */
    Individual = "Individual",
}

/**
 * Тип подписи.
 */
export enum SignatureType {
    /** Усиленная квалифицированная электронная подпись */
    QualifiedDigital = "QualifiedDigital",
    /** Простая электронная подпись */
    SimpleDigital = "SimpleDigital",
    /** Усиленная неквалифицированная электронная подпись */
    UnqualifiedDigital = "UnqualifiedDigital",
}

export function formatSignatureType(value: SignatureType): string {
    switch (value) {
        case SignatureType.QualifiedDigital:
            return "1"
        case SignatureType.SimpleDigital:
            return "2"
        case SignatureType.UnqualifiedDigital:
            return "3"
    }
}

/**
 * Способ подтверждения полномочий на подписание документа.
 */
export enum AuthorityConfirmationMethod {
    /** В соответствии с данными, содержащимися в электронной подписи */
    SignatureData = "SignatureData",
    /** В соответствии с электронной доверенностью в машиночитаемой форме (включена в пакет) */
    ElectronicPOAInPackage = "ElectronicPOAInPackage",
    /** В соответствии с электронной доверенностью в машиночитаемой форме (хранение в ИС, сведения в документе) */
    ElectronicPOAInSystemByDoc = "ElectronicPOAInSystemByDoc",
    /** В соответствии с электронной доверенностью в машиночитаемой форме (хранение в ИС, сведения иным способом) */
    ElectronicPOAInSystemOther = "ElectronicPOAInSystemOther",
    /** В соответствии с доверенностью в форме документа на бумажном носителе */
    PaperPOA = "PaperPOA",
    /** Любое иное */
    Other = "Other",
}

export function formatAuthorityConfirmationMethod(value: AuthorityConfirmationMethod): string {
    switch (value) {
        case AuthorityConfirmationMethod.SignatureData:
            return "1"
        case AuthorityConfirmationMethod.ElectronicPOAInPackage:
            return "2"
        case AuthorityConfirmationMethod.ElectronicPOAInSystemByDoc:
            return "3"
        case AuthorityConfirmationMethod.ElectronicPOAInSystemOther:
            return "4"
        case AuthorityConfirmationMethod.PaperPOA:
            return "5"
        case AuthorityConfirmationMethod.Other:
            return "6"
    }
}

/**
 * Тип адреса.
 */
export enum AddressType {
    /** Адрес в Российской Федерации (ЕГРЮЛ) */
    RussianAddress = "RussianAddress",
    /** Адрес по ФИАС */
    FiasAddress = "FiasAddress",
    /** Информация об адресе (в т.ч. за пределами РФ) */
    ForeignAddressInfo = "ForeignAddressInfo",
}

/**
 * Вид муниципального района / городского округа.
 */
export enum MunicipalDistrictKind {
    /** Муниципальный район */
    MunicipalDistrict = "MunicipalDistrict",
    /** Городской округ */
    UrbanOkrug = "UrbanOkrug",
    /** Внутригородская территория города федерального значения */
    InnerCityTerritory = "InnerCityTerritory",
    /** Муниципальный округ */
    MunicipalOkrug = "MunicipalOkrug",
    /** Федеральная территория */
    FederalTerritory = "FederalTerritory",
}

export function formatMunicipalDistrictKind(value: MunicipalDistrictKind): string {
    switch (value) {
        case MunicipalDistrictKind.MunicipalDistrict:
            return "1"
        case MunicipalDistrictKind.UrbanOkrug:
            return "2"
        case MunicipalDistrictKind.InnerCityTerritory:
            return "3"
        case MunicipalDistrictKind.MunicipalOkrug:
            return "4"
        case MunicipalDistrictKind.FederalTerritory:
            return "5"
    }
}

/**
 * Вид городского / сельского поселения.
 */
export enum SettlementKind {
    /** Городское поселение */
    UrbanSettlement = "UrbanSettlement",
    /** Сельское поселение */
    RuralSettlement = "RuralSettlement",
    /** Межселенная территория в составе муниципального района */
    InterSettlementTerritory = "InterSettlementTerritory",
    /** Внутригородской район городского округа */
    InnerCityDistrict = "InnerCityDistrict",
}

export function formatSettlementKind(value: SettlementKind): string {
    switch (value) {
        case SettlementKind.UrbanSettlement:
            return "1"
        case SettlementKind.RuralSettlement:
            return "2"
        case SettlementKind.InterSettlementTerritory:
            return "3"
        case SettlementKind.InnerCityDistrict:
            return "4"
    }
}
