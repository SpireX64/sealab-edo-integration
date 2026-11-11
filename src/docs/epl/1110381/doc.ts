/**
 * Путевой лист, информация о результате предсменного,
 * предрейсового медицинского осмотра
 * (ЭПЛ, 1110381) (таб-7.2)
 */

import { formatDate, formatTime } from '../../../helpers'
import { fileNode, type TFileXmlMeta } from '../../shared'
import { formatShipperFileId, type TShipperFileId } from './data/7.3-ShipperFileId';
import { formatMedicalExamContent, type TMedicalExamContent } from './data/7.4-MedicalExamContent';
import { formatMedicalExamSigner, type TMedicalExamSigner } from './data/7.11-MedicalExamSigner';

export type TDocument1110381 = {
    /**
     * Идентификация файла обмена информации об обстоятельствах
     * и особенностях рейса.
     * (таб-7.3)
     */
    shipperFileId: TShipperFileId

    /**
     * Содержание путевого листа, информация о результате
     * предсменного, предрейсового медицинского осмотра.
     * (таб-7.4)
     */
    content: TMedicalExamContent

    /**
     * Сведения о лице, подписывающем файл обмена информации
     * о результате предсменного, предрейсового медицинского
     * осмотра в электронной форме.
     * (таб-7.11)
     */
    signer: TMedicalExamSigner
}

export const Document1110381 = (data: TDocument1110381, meta: TFileXmlMeta = {}) => {
    const createdAt = meta.documentCreatedAt ?? new Date()
    return fileNode("1110381", "5.01", {
        "ДатИнфМО": formatDate(createdAt),
        "ВрИнфМО": formatTime(createdAt),
        "ИдИнфСоб": formatShipperFileId(data.shipperFileId),
        "СодИнфМО": formatMedicalExamContent(data.content),
        "ПодпИнфМО": formatMedicalExamSigner(data.signer),
    }, { ...meta, documentCreatedAt: createdAt })
}
