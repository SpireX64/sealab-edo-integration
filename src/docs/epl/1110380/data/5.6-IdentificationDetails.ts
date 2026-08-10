/**
 * Идентификационные сведения
 * (ИдСв, таб-5.6)
 *
 * Одно из полей обязательно.
 */

import { IdentificationKind } from '../consts'
import { formatIndividualEntrepreneur, type TIndividualEntrepreneur } from './5.7-IndividualEntrepreneur';
import { formatLegalEntity, type TLegalEntity } from './5.8-LegalEntity';

export type TIdentificationDetails =
    | {
        identificationKind: IdentificationKind.IndividualEntrepreneur

        individualEntrepreneur: TIndividualEntrepreneur
    }
    | {
        identificationKind: IdentificationKind.LegalEntity

        legalEntity: TLegalEntity
    }

export function formatIdentificationDetails(data: TIdentificationDetails) {
    switch (data.identificationKind) {
        case IdentificationKind.IndividualEntrepreneur:
            return { "СвИП": formatIndividualEntrepreneur(data.individualEntrepreneur) }

        case IdentificationKind.LegalEntity:
            return { "СвЮЛУч": formatLegalEntity(data.legalEntity) }
    }
}