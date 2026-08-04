/**
 * Сведения об организации, состоящей на учете в налоговых органах
 * (СвЮЛУчТип, таб-5.22)
 */

export type TLegalEntity = {
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

export function formatLegalEntity(data: TLegalEntity) {
    return {
        "НаимОрг": data.orgName,
        "ИННЮЛ": data.inn,
        "КПП": data.kpp,
    }
}
