/** Статусы подписанта фрахтователя: XSD заказа-наряда 1/2/3. */
export enum ChartererSignerStatus {
    ChartererWithoutPOA='ChartererWithoutPOA',
    ChartererElectronicPOA='ChartererElectronicPOA',
    ChartererPaperPOA='ChartererPaperPOA',
}
export function formatChartererSignerStatus(value:ChartererSignerStatus) {
    switch(value) {
        case ChartererSignerStatus.ChartererWithoutPOA:return '1'
        case ChartererSignerStatus.ChartererElectronicPOA:return '2'
        case ChartererSignerStatus.ChartererPaperPOA:return '3'
        default:throw new TypeError('Не указан статус подписанта фрахтователя')
    }
}
