/** Статус подписанта грузоотправителя (таб-19.5). */
export enum ShipperSignerStatus {
    ShipperWithoutPOA = 'ShipperWithoutPOA',
    ShipperElectronicPOA = 'ShipperElectronicPOA',
    ShipperPaperPOA = 'ShipperPaperPOA',
}
export function formatShipperSignerStatus(value: ShipperSignerStatus): string {
    switch (value) {
        case ShipperSignerStatus.ShipperWithoutPOA: return '1'
        case ShipperSignerStatus.ShipperElectronicPOA: return '2'
        case ShipperSignerStatus.ShipperPaperPOA: return '3'
        default: throw new TypeError('Не указан статус подписанта грузоотправителя')
    }
}
export { IssuerType } from '../common/IssuerType'
