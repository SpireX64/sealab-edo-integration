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
            return "1"
        case ConsigneeSignerStatus.ConsigneeElectronicPOA:
            return "2"
        case ConsigneeSignerStatus.ConsigneePaperPOA:
            return "3"
    }
}
