/**
 * Идентификационные сведения о лице, имеющем отношение
 * к перевозке (об участнике перевозки)
 * (ИдСвТип, таб-5.16)
 *
 * Одно из полей обязательно.
 */

import { ParticipantKind } from '../consts'
import { formatIndividualEntrepreneur5, type TIndividualEntrepreneur5 } from './5.17-IndividualEntrepreneur';
import { formatLegalEntity5, type TLegalEntity5 } from './5.18-LegalEntity';
import { formatForeignEntityNotRegistered, type TForeignEntityNotRegistered } from './5.19-ForeignEntityNotRegistered';
import { formatIndividual, type TIndividual } from './5.20-Individual';

export type TParticipantIdentification =
    | {
        participantKind: ParticipantKind.IndividualEntrepreneur

        individualEntrepreneur: TIndividualEntrepreneur5
    }
    | {
        participantKind: ParticipantKind.LegalEntity

        legalEntity: TLegalEntity5
    }
    | {
        participantKind: ParticipantKind.ForeignEntityNotRegistered

        foreignEntityNotRegistered: TForeignEntityNotRegistered
    }
    | {
        participantKind: ParticipantKind.Individual

        individual: TIndividual
    }

export function formatParticipantIdentification(data: TParticipantIdentification) {
    switch (data.participantKind) {
        case ParticipantKind.IndividualEntrepreneur:
            return { "СвИП": formatIndividualEntrepreneur5(data.individualEntrepreneur) }

        case ParticipantKind.LegalEntity:
            return { "СвЮЛУч": formatLegalEntity5(data.legalEntity) }

        case ParticipantKind.ForeignEntityNotRegistered:
            return { "СвИнНеУч": formatForeignEntityNotRegistered(data.foreignEntityNotRegistered) }

        case ParticipantKind.Individual:
            return { "СвФЛУчаст": formatIndividual(data.individual) }
    }
}