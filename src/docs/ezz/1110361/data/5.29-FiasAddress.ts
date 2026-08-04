/**
 * Адрес по ФИАС
 * (АдрФИАСТип, таб-5.29)
 */

import { mapArrayIfNotEmpty } from '../../../../helpers'
import { formatElementKindCodeName, type TElementKindCodeName } from './5.30-ElementKindCodeName';
import { formatElementKindName, type TElementKindName } from './5.31-ElementKindName';
import { formatElementTypeName, type TElementTypeName } from './5.32-ElementTypeName';
import { formatAddressElementNumber, type TAddressElementNumber } from './5.33-AddressElementNumber';

export type TFiasAddress = {
    /**
     * Уникальный идентификационный номер.
     * Элемент применяется только при представлении документа
     * в электронной форме.
     * (1-36 символов)
     */
    id?: string

    /**
     * Почтовый индекс.
     * (6 символов)
     */
    postalCode?: string

    /**
     * Субъект Российской Федерации (код).
     * Принимает значение в соответствии со справочником
     * «Коды субъектов Российской Федерации и иных территорий
     * Российской Федерации».
     * (2 символа)
     */
    regionCode: string

    /**
     * Муниципальный район / городской округ / внутригородская
     * территория города федерального значения / муниципальный
     * округ / федеральная территория.
     * Обязателен, если значение элемента <Регион> не равно 99.
     * (таб-5.30)
     */
    municipalDistrict?: TElementKindCodeName

    /**
     * Городское поселение / сельское поселение / межселенная
     * территория в составе муниципального района /
     * внутригородской район городского округа.
     * (таб-5.30)
     */
    urbanRuralSettlement?: TElementKindCodeName

    /**
     * Населенный пункт (город, деревня, село и прочее).
     * (таб-5.31)
     */
    locality?: TElementKindName

    /**
     * Элемент планировочной структуры.
     * (таб-5.32)
     */
    planningStructureElement?: TElementTypeName

    /**
     * Элемент улично-дорожной сети.
     * (таб-5.32)
     */
    streetRoadNetworkElement?: TElementTypeName

    /**
     * Земельный участок (номер).
     * (1-50 символов)
     */
    landPlot?: string

    /**
     * Здание / сооружение / объект незавершенного строительства.
     * (таб-5.33)
     */
    buildings?: TAddressElementNumber[]

    /**
     * Помещение в пределах здания, сооружения / машино-место.
     * (таб-5.33)
     */
    buildingPremises?: TAddressElementNumber

    /**
     * Помещение в пределах квартиры.
     * (таб-5.33)
     */
    apartmentPremises?: TAddressElementNumber
}

export function formatFiasAddress(data: TFiasAddress) {
    if (data.regionCode !== "99" && !data.municipalDistrict) {
        throw new TypeError(
            "Муниципальный район обязателен, если код региона не равен 99"
        )
    }

    return {
        "ИдНом": data.id,
        "Индекс": data.postalCode,
        "Регион": data.regionCode,
        "МуниципРайон": data.municipalDistrict && formatElementKindCodeName(data.municipalDistrict),
        "ГородСелПоселен": data.urbanRuralSettlement && formatElementKindCodeName(data.urbanRuralSettlement),
        "НаселенПункт": data.locality && formatElementKindName(data.locality),
        "ЭлПланСтруктур": data.planningStructureElement && formatElementTypeName(data.planningStructureElement),
        "ЭлУлДорСети": data.streetRoadNetworkElement && formatElementTypeName(data.streetRoadNetworkElement),
        "ЗемелУчасток": data.landPlot,
        "Здание": mapArrayIfNotEmpty(data.buildings, formatAddressElementNumber),
        "ПомещЗдания": data.buildingPremises && formatAddressElementNumber(data.buildingPremises),
        "ПомещКвартиры": data.apartmentPremises && formatAddressElementNumber(data.apartmentPremises),
    }
}
