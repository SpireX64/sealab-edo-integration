/**
 * Информация для участника документооборота
 * (ИнфДляУчаст, таб-5.19)
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
    info: string
}

export function formatParticipantInfo(data: TParticipantInfo) {
    return {
        "ИННУчаст": data.inn,
        "ИнфУчаст": data.info,
    }
}
