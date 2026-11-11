/** Груз и контейнеры в ЭСВ перевозчика. */
import { formatDateTimeWithUtc } from '../../../../helpers'
import { formatDimensions, type TDimensions } from '../../../etrn/1110339/data/5.39-DimensionsInfo'
import { formatDangerousGoodsInfo, type TDangerousGoodsInfo } from '../../../etrn/1110339/data/5.33-DangerousGoodsInfo'

export type TDangerousCargo = TDangerousGoodsInfo & {classificationCode:string;packingGroup:string;tunnelCode:string}
export type TCargoDescription = {
    name:string
    condition:string
    packagingMethod?:string
    packagingType?:string
    density?:string
    divisible:boolean
    containerVolume:number
    containerWeightKg:number
    additionalInfo?:string
    volume?:number
    plannedPackageCount?:number
    markings:string[]
    dimensions:TDimensions
    dangerousGoods?:TDangerousCargo
    plannedWeight?:{grossKg:number;netKg?:number;palletCount?:number}
}
export type TCargo = {descriptions:TCargoDescription[];declaredValue?:{amount?:number;currencyCode?:string;currencyName?:string}}
export type TContainer = {
    numbers:string[]
    submittedForLoadingAt?:Date
    returnedAt?:Date
    sizeTypeCode?:string
    countryCode?:string
    capacityTons:number
    weightKg:number
    hasSafetyPlate:boolean
}
export function formatCargoDescription(data:TCargoDescription) {
    if (!data.markings?.length) throw new TypeError("Не указана маркировка груза")
    if (typeof data.divisible!=='boolean') throw new TypeError("Не указан признак делимости груза")
    if (data.dangerousGoods && (!data.dangerousGoods.classificationCode || !data.dangerousGoods.packingGroup || !data.dangerousGoods.tunnelCode)) throw new TypeError("Нужны фактические классификационный код, группа упаковки и код тоннелей опасного груза")
    return {
        "НаимГруз":data.name,"СостГруз":data.condition,"СпУпак":data.packagingMethod,"ВидТар":data.packagingType,"Плотн":data.density,"ГрузДелим":data.divisible?'1':'0',
        "ОбъемКонт":data.containerVolume.toFixed(3),"МассаКонт":data.containerWeightKg.toFixed(3),"ИнфГруз":data.additionalInfo,"Объем":data.volume?.toFixed(3),"ПлКолМест":data.plannedPackageCount,
        "Марк":data.markings,"Габар":formatDimensions(data.dimensions),"СвОпГруз":data.dangerousGoods && formatDangerousGoodsInfo(data.dangerousGoods),
        "ПлМасГруз":data.plannedWeight && {"МасНетЗнач":data.plannedWeight.netKg?.toFixed(3),"МасБрутЗнач":data.plannedWeight.grossKg.toFixed(3),"КолПалл":data.plannedWeight.palletCount},
    }
}
export function formatCargo(data:TCargo) {
    if (!data.descriptions?.length) throw new TypeError("Не указан груз ЭСВ")
    return {"ОпГруз":data.descriptions.map(formatCargoDescription),"ОбщСтоимГруз":data.declaredValue && {"СтЦеннГр":data.declaredValue.amount?.toFixed(2),"КодОКВ":data.declaredValue.currencyCode,"НаимОКВ":data.declaredValue.currencyName}}
}
export function formatContainer(data:TContainer) {
    if (!data.numbers?.length) throw new TypeError("Не указаны номера контейнеров")
    if (typeof data.hasSafetyPlate!=='boolean') throw new TypeError("Не указано наличие таблички КБК")
    if (data.sizeTypeCode!==undefined && data.sizeTypeCode.length!==4) throw new TypeError("Код размера/типа контейнера должен содержать 4 символа")
    const loading=data.submittedForLoadingAt && formatDateTimeWithUtc(data.submittedForLoadingAt)
    const returned=data.returnedAt && formatDateTimeWithUtc(data.returnedAt)
    return {"ДатВрСдПгр":loading?.dateTime,"НалКоорТочВрСдПгр":loading?.utc,"ДатВрВозврКонт":returned?.dateTime,"НалКоорТочВрВозврКонт":returned?.utc,"КодРазТипКонт":data.sizeTypeCode,"КонтКодСтр":data.countryCode,"ГрузПодКонт":data.capacityTons.toFixed(3),"МассаКонт":data.weightKg.toFixed(3),"ПрТаблПломб":data.hasSafetyPlate?'1':'0',"НомКонтейн":data.numbers}
}
export type { TDimensions }
