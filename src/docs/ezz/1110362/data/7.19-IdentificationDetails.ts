/**
 * Идентификационные сведения о лице, имеющем отношение
 * к перевозке (об участнике перевозки)
 * (ИдСвТип, таб-7.19)
 *
 * Одно из полей обязательно.
 */

import { ParticipantType } from '../consts'
import { formatIndividualEntrepreneur, type TIndividualEntrepreneur } from './7.20-IndividualEntrepreneur';
import { formatLegalEntity, type TLegalEntity } from './7.21-LegalEntity';
import { formatForeignEntityNotRegistered, type TForeignEntityNotRegistered } from './7.22-ForeignEntityNotRegistered';
import { formatIndividual, type TIndividual } from './7.23-Individual';

export type TIdentificationDetails =
    | {
        participantType: ParticipantType.IndividualEntrepreneur

        individualEntrepreneur: TIndividualEntrepreneur
    }
    | {
        participantType: ParticipantType.LegalEntity

        legalEntity: TLegalEntity
    }
    | {
        participantType: ParticipantType.ForeignEntityNotRegistered

        foreignEntityNotRegistered: TForeignEntityNotRegistered
    }
    | {
        participantType: ParticipantType.Individual

        individual: TIndividual
    }

export function formatIdentificationDetails(data: TIdentificationDetails) {
    switch (data.participantType) {
        case ParticipantType.IndividualEntrepreneur:
            return { "СвИП": formatIndividualEntrepreneur(data.individualEntrepreneur) }

        case ParticipantType.LegalEntity:
            return { "СвЮЛУч": formatLegalEntity(data.legalEntity) }

        case ParticipantType.ForeignEntityNotRegistered:
            return { "СвИнНеУч": formatForeignEntityNotRegistered(data.foreignEntityNotRegistered) }

        case ParticipantType.Individual:
            return { "СвФЛУчаст": formatIndividual(data.individual) }
    }
}