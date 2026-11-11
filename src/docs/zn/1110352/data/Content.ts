/** Подтверждение фактической подачи ТС фрахтователем. */
import { formatDateTimeWithUtc,mapArrayIfNotEmpty } from '../../../../helpers'
import { formatInfoField,type TInfoField } from '../../../common/InfoField'
import { formatNote,type TNote } from './Note'
export type TSubmissionContent = {orderId:string;submittedAt:Date;notes?:TNote[];infoField?:TInfoField[]}
export function formatSubmissionContent(data:TSubmissionContent) {
    if (!data.orderId?.trim() || data.orderId.length>1000) throw new TypeError('Не указан УИД заказа-наряда')
    const at=formatDateTimeWithUtc(data.submittedAt)
    return {"УИД_ЗН":data.orderId,"ДатВрПодТС":at.dateTime,"НалКоорТочВрПодТС":at.utc,"ОтметФт":mapArrayIfNotEmpty(data.notes,formatNote),"ИнфПол":mapArrayIfNotEmpty(data.infoField,formatInfoField)}
}
