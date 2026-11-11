/** Статусы подписанта грузополучателя: XSD ЭСВ 1/2/3. */
export enum ConsigneeSignerStatus {
    ConsigneeWithoutPOA='ConsigneeWithoutPOA',
    ConsigneeElectronicPOA='ConsigneeElectronicPOA',
    ConsigneePaperPOA='ConsigneePaperPOA',
}
export function formatConsigneeSignerStatus(value:ConsigneeSignerStatus) {
    switch(value) {
        case ConsigneeSignerStatus.ConsigneeWithoutPOA:return '1'
        case ConsigneeSignerStatus.ConsigneeElectronicPOA:return '2'
        case ConsigneeSignerStatus.ConsigneePaperPOA:return '3'
        default:throw new TypeError('Не указан статус подписанта грузополучателя')
    }
}
