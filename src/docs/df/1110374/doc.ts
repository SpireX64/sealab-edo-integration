/** Договор фрахтования: сведения фрахтовщика, 1110374. */
import { formatDate,formatTime } from '../../../helpers'
import { fileNode,type TFileXmlMeta } from '../../shared'
import { formatDocumentRequisites,type TDocumentRequisites } from '../1110373/data/DocumentRequisites'
import { formatSigner,type TSigner } from '../1110373/data/Signer'
import { formatFreighterContent,type TFreighterContent } from './data/Content'
import { formatChartererFileId,type TChartererFileId } from './data/ChartererFileId'
export type TDocument1110374 = {createdAt:Date;compilerName:string;compilerIsFreighter:boolean;compilerAuthority?:TDocumentRequisites;chartererFileId:TChartererFileId;content:TFreighterContent;signer:TSigner}
export function Document1110374(data:TDocument1110374,meta:TFileXmlMeta={}) {
    if (!meta.programTag?.trim() || meta.programTag.length>40) throw new TypeError('Не указана версия программы programTag (1–40 символов)')
    if (!data.compilerName?.trim()) throw new TypeError('Не указан составитель')
    if (typeof data.compilerIsFreighter!=='boolean' || (!data.compilerIsFreighter && !data.compilerAuthority)) throw new TypeError('Стороннему составителю нужно основание')
    return fileNode('1110374','5.01',{"ДатИнфФщ":formatDate(data.createdAt),"ВрИнфФщ":formatTime(data.createdAt),"НаимЭкСубСост":data.compilerName,"ОснДовОргСост":data.compilerAuthority && formatDocumentRequisites(data.compilerAuthority),"ИдИнфФт":formatChartererFileId(data.chartererFileId),"СодДФИнфФщ":formatFreighterContent(data.content),"ПодпДФИнфФщ":formatSigner(data.signer)},{...meta,documentCreatedAt:meta.documentCreatedAt??data.createdAt})
}
export type {TSigner,TDocumentRequisites}
