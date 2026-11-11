/** Контейнеры: порядковый номер, ISO-классификатор, идентификаторы, пломбы и массы. */
import { mapArrayIfNotEmpty } from '../../../../helpers'
import { formatDimensions,type TDimensions } from '../../../common/Dimensions'
import { formatInfoField,type TInfoField } from '../../../common/InfoField'
import { ContainerUse,ContainerProvider } from '../consts'
export type TContainer = {sequenceNumber:number;isoCode?:string;use?:ContainerUse;provider:ContainerProvider;cargoWeightKg?:number;tareWeightKg?:number;sealCount?:number;sealNumbers?:number[];internationalId?:string;nonstandardId?:string;specialDimensions?:TDimensions;infoField?:TInfoField[]}
export function formatContainer(data:TContainer) {
    if (data.internationalId && data.nonstandardId) throw new TypeError('Указывается только один вид идентификатора контейнера')
    if ((data.sealCount!==undefined)!==Boolean(data.sealNumbers?.length)) throw new TypeError('Количество и номера пломб указываются вместе')
    if (data.provider===ContainerProvider.Client && data.tareWeightKg==null) throw new TypeError('Для контейнера клиента нужен вес тары')
    if (data.isoCode!==undefined && data.isoCode.length!==4) throw new TypeError('ISO-код контейнера должен содержать 4 символа')
    return {"НомКонтейн":data.sequenceNumber,"ИСОКонтейн":data.isoCode,"ИспКонтейн":data.use===undefined?undefined:String(data.use),"ПредКонтейн":String(data.provider),"СумВесГруз":data.cargoWeightKg?.toFixed(4),"ВесТара":data.tareWeightKg?.toFixed(4),"КолПломб":data.sealCount,"НомПломб":data.sealNumbers,"ИдКонтейнМежд":data.internationalId?[data.internationalId]:undefined,"ИдКонтейнНест":data.nonstandardId?[data.nonstandardId]:undefined,"ГабарСпКонтейн":data.specialDimensions && formatDimensions(data.specialDimensions),"ИнфПол":mapArrayIfNotEmpty(data.infoField,formatInfoField)}
}
