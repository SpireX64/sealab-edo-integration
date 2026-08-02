/**
 * Сведения о сопроводительных документах на груз
 * (СопрДок, таб-5.11)
 */

import { mapArrayIfNotEmpty } from '../../../../helpers'
import { formatSettlementDoc, type TSettlementDoc } from './5.45-SettlementDoc';

export type TAccompaningDocs = {
    /**
     * Перечень прилагаемых к транспортной накладной документов,
     * предусмотренных Соглашением о международной дорожной перевозке опасных грузов (ДОПОГ),
     * санитарными, таможенными (при наличии), карантинными,
     * иными правилами в соответствии с законодательством Российской Федерации
     */
    adrDocs?: TSettlementDoc[]

    /**
     * Перечень прилагаемых к грузу сертификатов, паспортов качества,
     * удостоверений и других документов, наличие которых установлено законодательством Российской Федерации,
     * либо регистрационные номера указанных документов,
     * если такие документы (сведения о таких документах) содержатся в государственных информационных системах
     */
    cargoCertificates?: TSettlementDoc[]

    /**
     * Реквизиты, позволяющие идентифицировать документ, подтверждающий отгрузку товара
     */
    shipmentDoc?: TSettlementDoc[]

    /**
     * Реквизиты сопроводительной ведомости (при перевозке груженых контейнеров или порожних контейнеров)
     */
    containerManifest?: TSettlementDoc // Обяз. только при 5.9 "НаимГруз" = "Контейнер"
}

export function formatAccompaningDocs(
    {adrDocs, cargoCertificates, shipmentDoc, containerManifest}: TAccompaningDocs,
    isContainer: boolean = false,
) {
    if (isContainer && !containerManifest) {
        throw new TypeError("Требуется указать реквизиты сопроводительной ведомости для контейнеров")
    }

    return {
        "ДокКТрН": mapArrayIfNotEmpty(adrDocs, formatSettlementDoc),
        "ДокКГр": mapArrayIfNotEmpty(cargoCertificates, formatSettlementDoc),
        "ДокПерЦенн": mapArrayIfNotEmpty(shipmentDoc, formatSettlementDoc),
        "РекСопрВед": containerManifest && formatSettlementDoc(containerManifest),
    }
}
