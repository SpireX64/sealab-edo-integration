/** Груз договора: своя точность величин, обязательная валюта оценки, масса тары. */
import { mapArrayIfNotEmpty } from '../../../../helpers'
import { formatDimensions,type TDimensions } from '../../../common/Dimensions'
import { formatInfoField,type TInfoField } from '../../../common/InfoField'
import { formatDangerousCargo,type TDangerousCargo } from '../../../zn/1110350/data/Cargo'
export type TDeclaredValue = {amount:number;currencyCode:string;currencyName:string}
export function formatDeclaredValue(data:TDeclaredValue) {return {"СтЦеннГр":data.amount.toFixed(2),"КодОКВ":data.currencyCode,"НаимОКВ":data.currencyName}}
export type TCargoWeight = {grossKg:number;netKg?:number;palletCount?:number;tareKg?:number}
export function formatCargoWeight(data:TCargoWeight) {return {"МасНетЗнач":data.netKg?.toFixed(3),"МасБрутЗнач":data.grossKg.toFixed(3),"КолПалл":data.palletCount,"МасТар":data.tareKg?.toFixed(3)}}
export type TContainer = {sequenceNumber:number;identifier:string}
export function formatContainer(data:TContainer) {return {"ПорНомКонтейн":data.sequenceNumber,"ИдКонтейн":data.identifier}}
export type TCargoDescription = {name:string;commodityCode?:string;condition:string;packagingMethod:string;packagingType:string;density?:number;canDistributeAxleLoad:boolean;additionalInfo?:string;volume:number;packageCount:number;markings:string[];dimensions:TDimensions;dangerousGoods?:TDangerousCargo;containers?:TContainer[];weight:TCargoWeight;declaredValue?:TDeclaredValue}
export function formatCargoDescription(data:TCargoDescription) {
    if (!data.markings?.length) throw new TypeError('Нужна маркировка груза')
    if (typeof data.canDistributeAxleLoad!=='boolean') throw new TypeError('Нужен признак распределения нагрузки')
    return {"НаимГруз":data.name,"КодТовНом":data.commodityCode,"СостГруз":data.condition,"СпУпак":data.packagingMethod,"ВидТар":data.packagingType,"Плотн":data.density?.toFixed(4),"ВозмРаспр":data.canDistributeAxleLoad?'1':'0',"ИнфГруз":data.additionalInfo,"Объем":data.volume.toFixed(2),"КолМест":data.packageCount,"Марк":data.markings,"Габар":formatDimensions(data.dimensions),"СвОпаснГруз":data.dangerousGoods && formatDangerousCargo(data.dangerousGoods),"СвКонтейн":mapArrayIfNotEmpty(data.containers,formatContainer),"МасГруз":formatCargoWeight(data.weight),"ЦеннГруз":data.declaredValue && formatDeclaredValue(data.declaredValue)}
}
export type TCargo = {descriptions:TCargoDescription[];totalDeclaredValue?:TDeclaredValue;infoField?:TInfoField[]}
export function formatCargo(data:TCargo) {
    if (!data.descriptions?.length) throw new TypeError('Не указан груз договора')
    return {"ОпГруз":data.descriptions.map(formatCargoDescription),"ОбЦеннГр":data.totalDeclaredValue && formatDeclaredValue(data.totalDeclaredValue),"ИнфПол":mapArrayIfNotEmpty(data.infoField,formatInfoField)}
}
export type {TDangerousCargo,TDimensions,TInfoField}
