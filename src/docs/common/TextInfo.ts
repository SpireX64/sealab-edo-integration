/**
 * Текстовая информация
 * (ТекстИнфТип)
 *
 * Общий тип для документов ЭТрН (1110339, 1110340, 1110341)
 * и ЭЗЗ (1110361).
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
