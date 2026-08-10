/**
 * Сведения о юридическом лице, состоящем на учете
 * в налоговых органах
 * (СвЮЛУч, таб-5.8)
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
    inn?: string

    /**
     * КПП.
     * (9 символов)
     */
    kpp?: string

    /**
     * Основной государственный регистрационный номер
     * юридического лица.
     * (13 символов)
     */
    ogrn: string
}

export function formatLegalEntity(data: TLegalEntity) {
    return {
        "НаимОрг": data.orgName,
        "ИННЮЛ": data.inn,
        "КПП": data.kpp,
        "ОГРН": data.ogrn,
    }
}