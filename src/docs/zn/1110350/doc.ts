/** Заказ-наряд: информация фрахтователя, 1110350. */
import { formatDate,formatTime } from '../../../helpers'
import { fileNode,type TFileXmlMeta } from '../../shared'
import { formatChartererContent,type TChartererContent } from './data/Content'
import { formatChartererSigner,type TChartererSigner } from './data/ChartererSigner'
export type TDocument1110350 = {createdAt:Date;content:TChartererContent;signer:TChartererSigner}
export function Document1110350(data:TDocument1110350,meta:TFileXmlMeta={}) {
    if (!meta.programTag?.trim() || meta.programTag.length>40) throw new TypeError('Не указана версия программы programTag (1–40 символов)')
    return fileNode('1110350','5.01',{"ДатИнфФт":formatDate(data.createdAt),"ВрИнфФт":formatTime(data.createdAt).replace(/:/g,'.'),"СодЗНИнфФт":formatChartererContent(data.content),"Подписант":formatChartererSigner(data.signer)},{...meta,documentCreatedAt:meta.documentCreatedAt??data.createdAt})
}
