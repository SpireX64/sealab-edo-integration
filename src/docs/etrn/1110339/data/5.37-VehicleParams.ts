/**
 * Транспортное средство
 * (ПараметрыТСТип, таб-5.37)
 */

import { VehicleOwnershipType, IssuerType } from '../consts'
import { mapArrayIfNotEmpty } from '../../../../helpers'
import { formatVehicleSpecs, type TVehicleSpecs } from './5.38-VehicleSpecs';
import { formatSettlementDoc, type TSettlementDoc } from './5.45-SettlementDoc';

export type TVehicleParams = {
    /**
     * Номер СТС. Указывается серия и номер СТС
     * без учета пробелов и знака номера.
     * (1-10 символов)
     */
    stsNumber?: string

    /** VIN номер (1-17 символов) */
    vin?: string

    /** Регистрационный номер (1-9 символов) */
    regNumber: string

    /** Тип владения */
    ownershipType: VehicleOwnershipType

    /** Параметры транспортного средства */
    specs: TVehicleSpecs

    /**
     * Реквизиты документа (документов), подтверждающего основание
     * владения грузовым автомобилем (тягачом), а также прицепом (полуприцепом).
     * Обязателен при ТипВлад = 3 (аренда), 4 (лизинг) или 5 (безвозмездное пользование).
     * При этом элемент ДаннИно (ForeignEntity в TIssuerIdentity) не может быть выбран.
     */
    ownershipDocs?: TSettlementDoc[]
}

export function formatVehicleParams(data: TVehicleParams) {
    const needsOwnershipDocs =
        data.ownershipType === VehicleOwnershipType.Lease ||
        data.ownershipType === VehicleOwnershipType.Leasing ||
        data.ownershipType === VehicleOwnershipType.GratuitousUse

    if (needsOwnershipDocs && !data.ownershipDocs?.length) {
        throw new TypeError(
            "Требуется указать документы-основания владения ТС " +
            "при типе владения: аренда, лизинг или безвозмездное пользование"
        )
    }

    if (data.ownershipDocs) {
        for (const doc of data.ownershipDocs) {
            for (const issuer of doc.partyDetails) {
                if (issuer.type === IssuerType.ForeignEntity) {
                    throw new TypeError(
                        "ДаннИно (иностранное лицо) не может быть указано " +
                        "в документах-основаниях владения ТС"
                    )
                }
            }
        }
    }

    return {
        "НомСТС": data.stsNumber,
        "НомерВИН": data.vin,
        "РегНомер": data.regNumber,
        "ТипВлад": data.ownershipType,
        "ПарТС": formatVehicleSpecs(data.specs),
        "ОснАрЛиз": mapArrayIfNotEmpty(data.ownershipDocs, formatSettlementDoc),
    }
}
