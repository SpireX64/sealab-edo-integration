/**
 * Константы и перечисления документа ЭЗЗ 1110362.
 *
 * Используются те же перечисления, что и в 1110361.
 */

export {
    Authority,
    OperationType,
    MassDeterminationMethod,
    SignatureType,
    AuthorityConfirmationMethod,
    IssuerType,
    formatAuthority,
    formatOperationType,
    formatMassDeterminationMethod,
    formatSignatureType,
    formatAuthorityConfirmationMethod,
} from '../1110361/consts'

/**
 * Налоговая ставка: XSD ON_ZAKZVPER_1_969_02_05_01_03 (с 01.01.2026).
 */
export enum TaxRate {
    /** 0% */
    ZeroPercent = "ZeroPercent",
    /** 10% */
    TenPercent = "TenPercent",
    /** 20% */
    TwentyPercent = "TwentyPercent",
    /** 10/110 */
    TenOverHundredTen = "TenOverHundredTen",
    /** 20/120 */
    TwentyOverHundredTwenty = "TwentyOverHundredTwenty",
    /** 5% */
    FivePercent = "FivePercent",
    /** 7% */
    SevenPercent = "SevenPercent",
    /** 9,09% */
    NinePointZeroNinePercent = "NinePointZeroNinePercent",
    /** 16,67% */
    SixteenPointSixtySevenPercent = "SixteenPointSixtySevenPercent",
    /** 18,03% */
    EighteenPointZeroThreePercent = "EighteenPointZeroThreePercent",
    /** 22% */
    TwentyTwoPercent = "TwentyTwoPercent",
    /** 5/105 */
    FiveOverHundredFive = "FiveOverHundredFive",
    /** 7/107 */
    SevenOverHundredSeven = "SevenOverHundredSeven",
    /** 22/122 */
    TwentyTwoOverHundredTwentyTwo = "TwentyTwoOverHundredTwentyTwo",
    /** без НДС */
    WithoutVAT = "WithoutVAT",
    /** НДС исчисляется налоговым агентом */
    VatCalculatedByTaxAgent = "VatCalculatedByTaxAgent",
}

export function formatTaxRate(value: TaxRate): string {
    switch (value) {
        case TaxRate.ZeroPercent:
            return "0%"
        case TaxRate.TenPercent:
            return "10%"
        case TaxRate.TwentyPercent:
            return "20%"
        case TaxRate.TenOverHundredTen:
            return "10/110"
        case TaxRate.TwentyOverHundredTwenty:
            return "20/120"
        case TaxRate.FivePercent:
            return "5%"
        case TaxRate.SevenPercent:
            return "7%"
        case TaxRate.NinePointZeroNinePercent:
            return "9,09%"
        case TaxRate.SixteenPointSixtySevenPercent:
            return "16,67%"
        case TaxRate.EighteenPointZeroThreePercent:
            return "18,03%"
        case TaxRate.TwentyTwoPercent:
            return "22%"
        case TaxRate.FiveOverHundredFive:
            return "5/105"
        case TaxRate.SevenOverHundredSeven:
            return "7/107"
        case TaxRate.TwentyTwoOverHundredTwentyTwo:
            return "22/122"
        case TaxRate.WithoutVAT:
            return "без НДС"
        case TaxRate.VatCalculatedByTaxAgent:
            return "НДС исчисляется налоговым агентом"
    }
}

/**
 * Тип владения транспортным средством.
 */
export enum OwnershipType {
    /** Собственность */
    Ownership = "Ownership",
    /** Совместная собственность супругов */
    JointSpousalOwnership = "JointSpousalOwnership",
    /** Аренда */
    Lease = "Lease",
    /** Лизинг */
    Leasing = "Leasing",
    /** Безвозмездное пользование */
    FreeUse = "FreeUse",
}

export function formatOwnershipType(value: OwnershipType): string {
    switch (value) {
        case OwnershipType.Ownership:
            return "1"
        case OwnershipType.JointSpousalOwnership:
            return "2"
        case OwnershipType.Lease:
            return "3"
        case OwnershipType.Leasing:
            return "4"
        case OwnershipType.FreeUse:
            return "5"
    }
}

/**
 * Тип участника перевозки.
 */
export enum ParticipantType {
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
