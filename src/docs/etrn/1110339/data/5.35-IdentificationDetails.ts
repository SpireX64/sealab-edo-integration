/**
 * Идентификационные сведения о лице, имеющем отношение к перевозке (об участнике перевозки)
 * (ИдСвТип, таб-5.35)
 *
 * Агрегирует типы из таблиц 5.25–5.28.
 */

import { IssuerType } from '../consts'
import { formatLegalEntityInfo, type TLegalEntityInfo } from './5.25-LegalEntityInfo';
import { formatSoleProprietorInfo, type TSoleProprietorInfo } from './5.26-SoleProprietorInfo';
import type { TForeignEntityInfo } from './5.27-ForeignEntityInfo'
import { formatForeignEntityNotRegistered } from '../../common/ForeignEntityNotRegistered'
import { formatIndividualInfo, type TIndividualInfo } from './5.28-IndividualInfo';

export type TIdentificationDetails =
    | TLegalEntityInfo
    | TSoleProprietorInfo
    | TForeignEntityInfo
    | TIndividualInfo

export function formatIdentificationDetails(data: TIdentificationDetails) {
    switch (data.type) {
        case IssuerType.LegalEntity:
            return formatLegalEntityInfo(data)
        case IssuerType.SoleProprietor:
            return formatSoleProprietorInfo(data)
        case IssuerType.ForeignEntity:
            return { "СвИнНеУч": formatForeignEntityNotRegistered(data) }
        case IssuerType.Individual:
            return formatIndividualInfo(data)
    }
}
