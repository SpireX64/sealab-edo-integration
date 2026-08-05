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
 * Налоговая ставка.
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
        case TaxRate.WithoutVAT:
            return "без НДС"
        case TaxRate.VatCalculatedByTaxAgent:
            return "НДС исчисляется налоговым агентом"
    }
}
