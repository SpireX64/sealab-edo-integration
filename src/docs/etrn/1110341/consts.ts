/**
 * Енумы и их format-мапперы для документа ЭТрН 1110341.
 */

// ─── ConsigneeSignerStatus ─────────────────────────────────

/**
 * Статус подписанта со стороны грузополучателя
 * (СтатПодп, таб-13.9)
 */
export enum ConsigneeSignerStatus {
    /** Лицо, действующее от имени грузополучателя без доверенности */
    ConsigneeWithoutPOA = "ConsigneeWithoutPOA",
    /** Лицо, действующее от имени грузополучателя на основании электронной доверенности */
    ConsigneeElectronicPOA = "ConsigneeElectronicPOA",
    /** Лицо, действующее от имени грузополучателя на основании бумажной доверенности */
    ConsigneePaperPOA = "ConsigneePaperPOA",
}

export function formatConsigneeSignerStatus(status: ConsigneeSignerStatus): string {
    switch (status) {
        case ConsigneeSignerStatus.ConsigneeWithoutPOA:
            return "лицо, действующее от имени грузополучателя без доверенности"
        case ConsigneeSignerStatus.ConsigneeElectronicPOA:
            return "лицо, действующее от имени грузополучателя на основании электронной доверенности"
        case ConsigneeSignerStatus.ConsigneePaperPOA:
            return "лицо, действующее от имени грузополучателя на основании бумажной доверенности"
    }
}
