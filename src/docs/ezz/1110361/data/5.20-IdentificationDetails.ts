/**
 * Идентификационные сведения о лице, имеющем отношение
 * к перевозке (об участнике перевозки)
 * (ИдСвТип, таб-5.20)
 *
 * Одно из полей обязательно.
 */

import { formatIndividualEntrepreneur, type TIndividualEntrepreneur } from './5.21-IndividualEntrepreneur';
import { formatLegalEntity, type TLegalEntity } from './5.22-LegalEntity';
import { formatForeignEntityNotRegistered, type TForeignEntityNotRegistered } from './5.23-ForeignEntityNotRegistered';
import { formatIndividual, type TIndividual } from './5.24-Individual';

export type TIdentificationDetails =
    | { individualEntrepreneur: TIndividualEntrepreneur }
    | { legalEntity: TLegalEntity }
    | { foreignEntityNotRegistered: TForeignEntityNotRegistered }
    | { individual: TIndividual }

export function formatIdentificationDetails(data: TIdentificationDetails) {
    if ('individualEntrepreneur' in data) {
        return { "СвИП": formatIndividualEntrepreneur(data.individualEntrepreneur) }
    }
    if ('legalEntity' in data) {
        return { "СвЮЛУч": formatLegalEntity(data.legalEntity) }
    }
    if ('foreignEntityNotRegistered' in data) {
        return { "СвИнНеУч": formatForeignEntityNotRegistered(data.foreignEntityNotRegistered) }
    }
    return { "СвФЛУчаст": formatIndividual(data.individual) }
}
