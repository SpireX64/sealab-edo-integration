/**
 * Сведения об организации, состоящей на учете
 * в налоговых органах
 * (СвЮЛУчТип, таб-5.18)
 */

export type TLegalEntity5 = {
    /**
     * Наименование полное.
     * (1-1000 символов)
     */
    orgName: string

    /**
     * ИНН.
     * (10 символов)
     */
    inn: string

    /**
     * КПП.
     * (9 символов)
     */
    kpp?: string
}

export function formatLegalEntity5(data: TLegalEntity5) {
    return {
        "НаимОрг": data.orgName,
        "ИННЮЛ": data.inn,
        "КПП": data.kpp,
    }
}