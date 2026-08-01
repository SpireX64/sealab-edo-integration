/**
 * Информация для участника документооборота
 * (ИнфДляУчаст, таб-5.30)
 */

export type TParticipantInfo = {
    /**
     * ИНН участника.
     * (10-12 символов)
     */
    inn: string

    /**
     * Информация для участника.
     * (1-255 символов)
     */
    comment: string
}

export function formatParticipantInfo(data: TParticipantInfo) {
    return {
        "ИННУчаст": data.inn,
        "ИнфУчаст": data.comment,
    }
}
