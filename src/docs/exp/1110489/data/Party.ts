import {formatParticipant as formatBaseParticipant,type TParticipant} from '../../1110486/data/Party'
export function formatParticipant(data:TParticipant) {
    for (const phone of data.contacts?.phones??[]) if (!phone.length || phone.length>20) throw new TypeError('Телефон участника расписки должен содержать 1–20 символов')
    if (data.okpo!==undefined && (!data.okpo.length || data.okpo.length>10)) throw new TypeError('ОКПО расписки должен содержать 1–10 символов')
    return formatBaseParticipant(data)
}
export type {TParticipant}
