/**
 * Сведения об иностранном лице, не состоящем на учете в налоговых органах
 * в качестве налогоплательщика
 * (СвИнНеУчТрНТип, таб-5.27)
 *
 * Расширяет общий тип полем type для discriminated union в TIdentificationDetails.
 */

import { IssuerType } from '../consts'
import type { TForeignEntityNotRegistered } from '../../common/ForeignEntityNotRegistered'

export type TForeignEntityInfo = {
    type: IssuerType.ForeignEntity
} & TForeignEntityNotRegistered
