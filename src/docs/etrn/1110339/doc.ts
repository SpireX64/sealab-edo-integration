/**
 * Транспортная Накладная - Информация Грузоотправителя
 * (ЭТрН, 1110339) (таб-5.2)
 */

import { formatDate, formatTime } from '../../../helpers'
import { fileNode, type TFileXmlMeta } from '../../shared'
import { formatShipperWaybill, type TShipperWaybill } from './data/5.3-ShipperWaybill';
import { formatSettlementDoc, type TSettlementDoc } from './data/5.45-SettlementDoc';
import { formatSignerInfo, type TSignerInfo } from './data/5.23-SignerInfo';

export type TDocument111339 = TShipperWaybill & {
    /** Наименование документа по факту хозяйственной жизни (1-255). */
    documentName: string;
    /** Фактическая дата и время формирования файла обмена. */
    createdAt: Date;

    /**
     * Наименование экономического субъекта, составляющего файл обмена информации грузоотправителя.
     * (maxlen=1000)
     * @example 'Общество с ограниченной ответственностью "ОСНОва"'
     */
    issuer: string;

    /**
     * Основание, по которому экономический субъект является составителем
     * файла обмена информации грузоотправителя.
     * (таб-5.45)
     */
    issuerAuthorityDoc?: TSettlementDoc

    /**
     * Сведения о лице, подписывающем файл обмена информации грузоотправителя.
     * (таб-5.23)
     */
    signer: TSignerInfo
}

export const Document111339 = (data: TDocument111339, meta: TFileXmlMeta = {}) =>
    fileNode("1110339", "5.01", {
        "ПоФактХЖ": data.documentName,
        "ДатИнфГО": formatDate(data.createdAt),
        "ВрИнфГО": formatTime(data.createdAt),
        "НаимЭкСубСост": data.issuer,
        "ОснДовОргСост": data.issuerAuthorityDoc && formatSettlementDoc(data.issuerAuthorityDoc),
        "СодИнфГО": formatShipperWaybill(data),
        "Подписант": formatSignerInfo(data.signer)
    }, meta);
