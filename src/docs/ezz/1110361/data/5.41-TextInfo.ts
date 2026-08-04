/**
 * Текстовая информация
 * (ТекстИнфТип, таб-5.41)
 */

export type TTextInfo = {
    /**
     * Идентификатор.
     * (1-50 символов)
     */
    identifier: string

    /**
     * Значение.
     * (1-2000 символов)
     */
    content: string
}

export function formatTextInfo(data: TTextInfo) {
    return {
        "Идентиф": data.identifier,
        "Значение": data.content,
    }
}
