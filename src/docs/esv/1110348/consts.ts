/** Статусы подписанта грузоотправителя: XSD ЭСВ 1/2/3. */
export enum ShipperSignerStatus {
    ShipperWithoutPOA='ShipperWithoutPOA',
    ShipperElectronicPOA='ShipperElectronicPOA',
    ShipperPaperPOA='ShipperPaperPOA',
}
export function formatShipperSignerStatus(value:ShipperSignerStatus) {
    switch(value) {
        case ShipperSignerStatus.ShipperWithoutPOA:return '1'
        case ShipperSignerStatus.ShipperElectronicPOA:return '2'
        case ShipperSignerStatus.ShipperPaperPOA:return '3'
        default:throw new TypeError('Не указан статус подписанта грузоотправителя')
    }
}
