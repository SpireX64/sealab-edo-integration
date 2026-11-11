/** Фактические отметки заказа-наряда, акты и штрафы. */
import { formatDate,formatDateTimeWithUtc,mapArrayIfNotEmpty } from '../../../../helpers'
import { formatInfoField,type TInfoField } from '../../../common/InfoField'
import { formatDocumentRequisites,type TDocumentRequisites } from '../../1110350/data/DocumentRequisites'
export type TPenalty = {
    actualQuantity?:string
    /** XSD Schematron ссылается на отсутствующее ИтогРазмШтрИН; поэтому требуется фактический итог в рублях. */
    amountRub:number
    currencyCode?:string;currencyName?:string;amountForeign?:number;exchangeRateDate?:Date;exchangeRate?:number;calculation?:string
}
export function formatPenalty(data:TPenalty) {
    if (data.amountRub==null || !Number.isFinite(data.amountRub)) throw new TypeError('Нужна фактическая сумма штрафа в рублях по условию XSD')
    return {"ФактКолЕдИзм":data.actualQuantity,"ИтогРазмШтрРФ":data.amountRub.toFixed(2),"КодОКВ":data.currencyCode,"НаимОКВ":data.currencyName,"ИтогРазмШтрИн":data.amountForeign?.toFixed(2),"ДатаКурсВал":data.exchangeRateDate && formatDate(data.exchangeRateDate),"КурсВал":data.exchangeRate?.toFixed(4),"РасчШтр":data.calculation}
}
export type TNote = {notedAt:Date;circumstances:string;acts?:TDocumentRequisites[];penalties?:TPenalty[];weighingActs?:TDocumentRequisites[];infoField?:TInfoField[]}
export function formatNote(data:TNote) {
    if (!data.circumstances?.trim() || data.circumstances.length>2000) throw new TypeError('Нужны фактические обстоятельства отметки (1–2000 символов)')
    const at=formatDateTimeWithUtc(data.notedAt)
    return {"ДатВрОтмет":at.dateTime,"НалКоорТочВрОтмет":at.utc,"ОбстОтмет":data.circumstances,"СвАкт":mapArrayIfNotEmpty(data.acts,formatDocumentRequisites),"РазмШтр":mapArrayIfNotEmpty(data.penalties,formatPenalty),"СвАктВзв":mapArrayIfNotEmpty(data.weighingActs,formatDocumentRequisites),"ИнфПол":mapArrayIfNotEmpty(data.infoField,formatInfoField)}
}
export type {TDocumentRequisites,TInfoField}
