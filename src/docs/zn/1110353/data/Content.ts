/** Завершение пользования ТС и оговорки фрахтовщика. */
import { formatDateTimeWithUtc,mapArrayIfNotEmpty } from '../../../../helpers'
import { formatInfoField,type TInfoField } from '../../../common/InfoField'
import { formatCorrection,type TCorrection } from '../../../esv/1110347/data/Content'
import { formatNote,type TNote } from './Note'
export type TReservations = {changedCarriageAt:Date;changedDeadline:string;changedRoute?:string;infoField?:TInfoField[]}
export function formatReservations(data:TReservations) {
    if (!data.changedDeadline?.trim()) throw new TypeError('В оговорке нужны изменённые сроки перевозки')
    const at=formatDateTimeWithUtc(data.changedCarriageAt)
    return {"ИзмДатВрВыпПрвз":at.dateTime,"НалКоорТочВрВыпПрвз":at.utc,"ИзмСрокВыпПрвз":data.changedDeadline,"ИзмМршВыпПрвз":data.changedRoute,"ИнфПол":mapArrayIfNotEmpty(data.infoField,formatInfoField)}
}
export type TCompletionContent = {orderId:string;useCompletedAt:Date;correction?:TCorrection;reservations?:TReservations;notes?:TNote[];infoField?:TInfoField[]}
export function formatCompletionContent(data:TCompletionContent) {
    if (!data.orderId?.trim() || data.orderId.length>1000) throw new TypeError('Не указан УИД заказа-наряда')
    const at=formatDateTimeWithUtc(data.useCompletedAt)
    return {"УИД_ЗН":data.orderId,"ДатВрЗавПолТС":at.dateTime,"НалКоорТочВрПолТС":at.utc,"ИспрЗН":data.correction && formatCorrection(data.correction),"СвОгЗамФщ":data.reservations && formatReservations(data.reservations),"ОтметФщ":mapArrayIfNotEmpty(data.notes,formatNote),"ИнфПол":mapArrayIfNotEmpty(data.infoField,formatInfoField)}
}
export type {TCorrection,TInfoField}
