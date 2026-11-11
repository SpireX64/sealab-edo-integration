/**
 * Путевой лист, информация о результате предрейсового
 * или предсменного контроля технического состояния
 * транспортного средства и выпуске транспортного
 * средства на линию
 * (ЭПЛ, 1110382) (таб-9.2)
 */

import { formatDate, formatTime } from '../../../helpers'
import { fileNode, type TFileXmlMeta } from '../../shared'
import { formatFileIdentification, type TFileIdentification } from './data/9.3-FileIdentification';
import { formatTechnicalCheckContent, type TTechnicalCheckContent } from './data/9.4-TechnicalCheckContent';
import { formatTechnicalCheckSigner, type TTechnicalCheckSigner } from './data/9.9-TechnicalCheckSigner';

export type TDocument1110382 = {
    /**
     * Идентификация файла обмена информации об обстоятельствах
     * и особенностях рейса.
     * (таб-9.3)
     */
    fileIdentification: TFileIdentification

    /**
     * Содержание путевого листа, информация о результате
     * предрейсового или предсменного контроля технического
     * состояния транспортного средства и выпуске
     * транспортного средства на линию.
     * (таб-9.4)
     */
    content: TTechnicalCheckContent

    /**
     * Сведения о лице, подписывающем файл обмена информации
     * о результате предрейсового или предсменного контроля
     * технического состояния транспортного средства и выпуске
     * транспортного средства на линию в электронной форме.
     * (таб-9.9)
     */
    signer: TTechnicalCheckSigner
}

export const Document1110382 = (data: TDocument1110382, meta: TFileXmlMeta = {}) => {
    const createdAt = meta.documentCreatedAt ?? new Date()
    return fileNode("1110382", "5.01", {
        "ДатИнфТехСост": formatDate(createdAt),
        "ВрИнфТехСост": formatTime(createdAt),
        "ИдИнфСоб": formatFileIdentification(data.fileIdentification),
        "СодИнфТехСост": formatTechnicalCheckContent(data.content),
        "ПодпИнфТехСост": formatTechnicalCheckSigner(data.signer),
    }, { ...meta, documentCreatedAt: createdAt })
}
