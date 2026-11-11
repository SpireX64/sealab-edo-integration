/** Дополнительные сведения участника (ДопСвУчФХЖТип, таб-17.13). */
import { formatBankDetails, type TBankDetails } from './17.14-BankDetails'
export type TAdditionalPartyDetails = {
    /** ОКПО, 1–10 символов. */
    okpo?: string
    /** Структурное подразделение, 1–1000 символов. */
    department?: string
    /** Информация для участника, 1–255 символов. */
    participantInfo?: string
    /** Краткое название, 1–255 символов. */
    shortName?: string
    bankDetails?: TBankDetails
}
export function formatAdditionalPartyDetails(data: TAdditionalPartyDetails) {
    return { "ОКПО": data.okpo, "СтруктПодр": data.department, "ИнфДляУчаст": data.participantInfo, "КраткНазв": data.shortName, "БанкРекв": data.bankDetails && formatBankDetails(data.bankDetails) }
}
