/** Согласованные условия договора фрахтования. */
import { formatDateTimeWithUtc,mapArrayIfNotEmpty } from '../../../../helpers'
import { formatInfoField,type TInfoField } from '../../../common/InfoField'
import { formatPayment,type TPayment } from '../../../zn/1110351/data/Content'
import { formatRoute,type TRoute } from '../../../zn/1110350/data/Content'
import { formatConcreteAddress,type TConcreteAddress } from './Address'
import { formatCharterer,formatFreighter,type TCharterer,type TFreighter } from './Party'
import { formatCargo,type TCargo } from './Cargo'
export type TVehicleSubmission = {submittedAt:Date;route:TRoute;address:TConcreteAddress}
export function formatVehicleSubmission(data:TVehicleSubmission) {
    const at=formatDateTimeWithUtc(data.submittedAt)
    return {"ДатВрПодТС":at.dateTime,"НалКоорТочВрПодТС":at.utc,"МршПрвз":formatRoute(data.route),"АдрМесПодТС":formatConcreteAddress(data.address)}
}
export type TCharterContent = {charterId?:string;durationHours:number;definedPassengerGroup?:boolean;passengersAdmitted?:boolean;otherConditions?:string;vehicleType:string;charterer:TCharterer;freighter:TFreighter;cargo?:TCargo;submission:TVehicleSubmission;payment:TPayment;infoField?:TInfoField[]}
export function formatCharterContent(data:TCharterContent) {
    if (!Number.isInteger(data.durationHours) || data.durationHours<0 || String(data.durationHours).length>5) throw new TypeError('Срок пользования ТС — целые часы, до 5 цифр')
    return {"УИД_ДФ":data.charterId,"СрокВыпПрвз":String(data.durationHours),"ПрвзЛиц":data.definedPassengerGroup===undefined?undefined:(data.definedPassengerGroup?'1':'0'),"ДопускПсжр":data.passengersAdmitted===undefined?undefined:(data.passengersAdmitted?'1':'0'),"ИныеУслв":data.otherConditions,"ТипТС":data.vehicleType,"СвФт":formatCharterer(data.charterer),"СвФщ":formatFreighter(data.freighter),"НаимГруз":data.cargo && formatCargo(data.cargo),"МршПодТС":formatVehicleSubmission(data.submission),"РазПлатТС":formatPayment(data.payment),"ИнфПол":mapArrayIfNotEmpty(data.infoField,formatInfoField)}
}
export type {TPayment,TRoute,TInfoField}
