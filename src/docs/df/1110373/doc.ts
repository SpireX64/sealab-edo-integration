/** Договор фрахтования: сведения фрахтователя, 1110373. */
import { formatDate,formatTime } from '../../../helpers'
import { fileNode,type TFileXmlMeta } from '../../shared'
import { CharterFunction,formatCharterFunction } from './consts'
import { formatDocumentRequisites,type TDocumentRequisites } from './data/DocumentRequisites'
import { formatCharterContent,type TCharterContent } from './data/Content'
import { formatSigner,type TSigner } from './data/Signer'
export type TDocument1110373 = {documentFunction:CharterFunction;createdAt:Date;compilerName:string;compilerIsCharterer:boolean;compilerAuthority?:TDocumentRequisites;content:TCharterContent;signer:TSigner}
export function Document1110373(data:TDocument1110373,meta:TFileXmlMeta={}) {
    if (!meta.programTag?.trim() || meta.programTag.length>40) throw new TypeError('Не указана версия программы programTag (1–40 символов)')
    if (!data.compilerName?.trim()) throw new TypeError('Не указан составитель')
    if (typeof data.compilerIsCharterer!=='boolean' || (!data.compilerIsCharterer && !data.compilerAuthority)) throw new TypeError('Стороннему составителю нужно основание')
    if (data.documentFunction===CharterFunction.Cargo && !data.content.cargo) throw new TypeError('Для грузового договора обязателен груз')
    if (data.documentFunction===CharterFunction.Passengers && (typeof data.content.definedPassengerGroup!=='boolean' || typeof data.content.passengersAdmitted!=='boolean')) throw new TypeError('Для пассажирского договора нужны круг лиц и допуск пассажиров')
    return fileNode('1110373','5.01',{"Функция":formatCharterFunction(data.documentFunction),"ДатИнфФт":formatDate(data.createdAt),"ВрИнфФт":formatTime(data.createdAt),"НаимЭкСубСост":data.compilerName,"ОснДовОргСост":data.compilerAuthority && formatDocumentRequisites(data.compilerAuthority),"СодДФИнфФт":formatCharterContent(data.content),"ПодпДФИнфФт":formatSigner(data.signer)},{...meta,documentCreatedAt:meta.documentCreatedAt??data.createdAt})
}
