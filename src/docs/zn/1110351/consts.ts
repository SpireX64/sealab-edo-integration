/** Статусы подписанта фрахтовщика: XSD заказа-наряда 1/2/3. */
export enum FreighterSignerStatus {
    FreighterWithoutPOA='FreighterWithoutPOA',
    FreighterElectronicPOA='FreighterElectronicPOA',
    FreighterPaperPOA='FreighterPaperPOA',
}
export function formatFreighterSignerStatus(value:FreighterSignerStatus) {
    switch(value) {
        case FreighterSignerStatus.FreighterWithoutPOA:return '1'
        case FreighterSignerStatus.FreighterElectronicPOA:return '2'
        case FreighterSignerStatus.FreighterPaperPOA:return '3'
        default:throw new TypeError('Не указан статус подписанта фрахтовщика')
    }
}
