import {formatParticipant as formatBaseParticipant,type TParticipant} from '../../1110489/data/Party'
export function formatParticipant(data:TParticipant) {
    if (data.identification.kind==='individual') {
        const person=data.identification.individual
        if (!person.fullName && (!person.inn || !person.otherDetails)) throw new TypeError('Без ФИО физлицу нужны ИНН и иные сведения')
    }
    const participant=formatBaseParticipant(data)
    // В складской расписке ИнКонт — атрибут, а не текстовый дочерний элемент.
    return {...participant,Контакт:participant.Контакт && {...participant.Контакт,ИнКонт:data.contacts?.otherContacts}}
}
export type {TParticipant}
