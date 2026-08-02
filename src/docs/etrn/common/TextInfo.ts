/**
 * Текстовая информация
 * (ТекстИнфТип, общий тип для документов ЭТрН)
 */

export type TTextInfo = {
    /**
     * Идентификатор.
     * (1-50 символов)
     */
    id: string

    /**
     * Значение.
     * (1-2000 символов)
     */
    value: string
}

export function formatTextInfo(data: TTextInfo) {
    return {
        "Идентиф": data.id,
        "Значение": data.value,
    }
}
