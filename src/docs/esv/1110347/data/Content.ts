/** Содержание сопроводительной ведомости перевозчика. */
import { formatDate, mapArrayIfNotEmpty } from '../../../../helpers'
import { formatInfoField, type TInfoField } from '../../../common/InfoField'
import { formatPersonFullNameFields, type TPersonFullName } from '../../../common/PersonFullName'
import { formatShipper, formatConsignee, type TShipper, type TConsignee } from './Party'
import { formatCargo, formatContainer, type TCargo, type TContainer } from './Cargo'
import { formatContainerTransfer, formatCarrier, formatVehicles, type TContainerTransfer, type TCarrier, type TVehicles } from './Transport'
export type TCorrection = {number:number;date:Date} & ({persons:TPersonFullName[];otherPersonRequisites?:never}|{persons?:never;otherPersonRequisites:string[]})
export type TCarrierContent = {
    statementId:string
    number:string
    issuedAt:Date
    correction?:TCorrection
    shipper:TShipper
    consignee:TConsignee
    cargo:TCargo
    containers:TContainer[]
    transfer:TContainerTransfer
    carrier:TCarrier
    vehicles:TVehicles
    infoField?:TInfoField[]
}
export function formatCorrection(data:TCorrection) {
    if (Boolean(data.persons?.length) === Boolean(data.otherPersonRequisites?.length)) throw new TypeError("В исправлении нужен один способ идентификации: ФИО либо иные реквизиты")
    return {"НомИспр":data.number,"ДатаИспр":formatDate(data.date),"ФИОЛиц":data.persons?.map(formatPersonFullNameFields),"ИнРекИдентифЛиц":data.otherPersonRequisites}
}
export function formatCarrierContent(data:TCarrierContent) {
    if (!data.containers?.length) throw new TypeError("Не указаны контейнеры ЭСВ")
    if (!data.statementId?.trim() || !data.number?.trim()) throw new TypeError("Не указаны УИД и номер сопроводительной ведомости")
    return {"УИД_СВ":data.statementId,"НомерСВ":data.number,"ДатаСВ":formatDate(data.issuedAt),"ИспрСВ":data.correction && formatCorrection(data.correction),"СвГО":formatShipper(data.shipper),"СвГП":formatConsignee(data.consignee),"СвГруз":formatCargo(data.cargo),"СвКонтейн":data.containers.map(formatContainer),"СдачКонтПогрВыгр":formatContainerTransfer(data.transfer),"СвПрв":formatCarrier(data.carrier),"СвТС":formatVehicles(data.vehicles),"ИнфПол":mapArrayIfNotEmpty(data.infoField,formatInfoField)}
}
