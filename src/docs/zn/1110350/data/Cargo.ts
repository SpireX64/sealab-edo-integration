/** Груз заказа-наряда; данные не заменяются расчётными заглушками. */
import { mapArrayIfNotEmpty } from '../../../../helpers'
import { formatDimensions, type TDimensions } from '../../../common/Dimensions'
import { formatDangerousGoodsInfo, type TDangerousGoodsInfo } from '../../../etrn/1110339/data/5.33-DangerousGoodsInfo'
import { formatCargoWeight, type TCargoWeight } from '../../../esv/1110348/data/Content'
import { formatInfoField, type TInfoField } from '../../../common/InfoField'
export type TDangerousCargo = TDangerousGoodsInfo & {classificationCode:string;packingGroup:string;tunnelCode:string}
export function formatDangerousCargo(data:TDangerousCargo) {
    if (!data.classificationCode || !data.packingGroup || !data.tunnelCode) throw new TypeError('Нужны фактические классификация, группа упаковки и код тоннелей')
    return formatDangerousGoodsInfo(data)
}
export type TDeclaredValue = {amount?:number;currencyCode?:string;currencyName?:string}
export function formatDeclaredValue(data:TDeclaredValue) {
    return {"СтЦеннГр":data.amount?.toFixed(2),"КодОКВ":data.currencyCode,"НаимОКВ":data.currencyName}
}
export type TContainers = {count:number;identifiers:string[]}
export function formatContainers(data:TContainers) {
    if (!data.identifiers?.length) throw new TypeError('Нужны идентификаторы контейнеров')
    return {"КолКонтейн":data.count,"ИдКонтейн":data.identifiers}
}
export type TCargoDescription = {
    name:string;commodityCode?:string;condition:string;packagingMethod:string;packagingType:string;density?:number;canDistributeAxleLoad:boolean;additionalInfo?:string;volume:number;packageCount:number
    markings:string[];dimensions:TDimensions;dangerousGoods?:TDangerousCargo[];containers?:TContainers[];weight:TCargoWeight;declaredValue?:TDeclaredValue
}
export function formatCargoDescription(data:TCargoDescription) {
    if (!data.markings?.length) throw new TypeError('Нужна маркировка груза')
    if (typeof data.canDistributeAxleLoad!=='boolean') throw new TypeError('Нужен признак возможности распределения нагрузки')
    return {"НаимГруз":data.name,"КодТовНом":data.commodityCode,"СостГруз":data.condition,"СпУпак":data.packagingMethod,"ВидТар":data.packagingType,"Плотн":data.density?.toFixed(2),"ВозмРаспр":data.canDistributeAxleLoad?'1':'0',"ДрОГруз":data.additionalInfo,"Объем":data.volume.toFixed(3),"КолМест":data.packageCount,"Марк":data.markings,"Габар":formatDimensions(data.dimensions),"СвОпГруз":mapArrayIfNotEmpty(data.dangerousGoods,formatDangerousCargo),"СвКонтейн":mapArrayIfNotEmpty(data.containers,formatContainers),"МасГруз":formatCargoWeight(data.weight),"ЦеннГруз":data.declaredValue && formatDeclaredValue(data.declaredValue)}
}
export type TCargo = {descriptions:TCargoDescription[];totalDeclaredValue?:TDeclaredValue;infoField?:TInfoField[]}
export function formatCargo(data:TCargo) {
    if (!data.descriptions?.length) throw new TypeError('Не указан груз')
    return {"ОпГруз":data.descriptions.map(formatCargoDescription),"ОбЦеннГр":data.totalDeclaredValue && formatDeclaredValue(data.totalDeclaredValue),"ИнфПол":mapArrayIfNotEmpty(data.infoField,formatInfoField)}
}
export type {TDimensions,TCargoWeight,TInfoField}
