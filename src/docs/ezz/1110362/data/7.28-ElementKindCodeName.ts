/**
 * Сведения о виде (код) и наименовании адресного элемента
 * (ВидНаимКодТип, таб-7.28)
 */

import {
    MunicipalDistrictKind,
    SettlementKind,
    formatMunicipalDistrictKind,
    formatSettlementKind,
} from '../consts'

export type TElementKindCodeName = {
    /**
     * Вид (код) элемента.
     *
     * @see MunicipalDistrictKind
     * @see SettlementKind
     */
    kindCode: MunicipalDistrictKind | SettlementKind

    /**
     * Наименование элемента.
     * (1-50 символов)
     */
    name: string
}

export function formatElementKindCodeName(
    data: TElementKindCodeName,
    category: 'municipalDistrict' | 'settlement',
) {
    switch (category) {
        case 'municipalDistrict':
            return {
                "ВидКод": formatMunicipalDistrictKind(data.kindCode as MunicipalDistrictKind),
                "Наим": data.name,
            }
        case 'settlement':
            return {
                "ВидКод": formatSettlementKind(data.kindCode as SettlementKind),
                "Наим": data.name,
            }
    }
}