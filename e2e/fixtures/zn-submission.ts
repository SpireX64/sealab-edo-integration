/** Синтетическое подтверждение подачи ТС. */
import { ChartererSignerStatus,type TDocument1110352 } from '../../src/docs/zn/1110352'
export const zn1110352Fixture:TDocument1110352 = {
    createdAt:new Date('2026-09-10T06:00:00Z'),freighterFileId:{fileId:'ON_ZAKAZNARSOG_TEST',createdAt:new Date('2026-09-09T08:00:00Z'),signBase64:'VEVTVA=='},
    content:{orderId:'00000000-0000-4000-8000-000000000500',submittedAt:new Date('2026-09-10T06:00:00Z'),notes:[{notedAt:new Date('2026-09-10T06:00:00Z'),circumstances:'Тестовая отметка подачи',acts:[{id:'TEST-ACT',issuers:[{kind:'legalEntity',inn:'7700000000'}]}],penalties:[{amountRub:1000,amountForeign:10,currencyCode:'978',currencyName:'Евро',exchangeRate:100,exchangeRateDate:new Date('2026-09-10Z'),actualQuantity:'1 час',calculation:'10 × 100'}],weighingActs:[{id:'TEST-WEIGH',issuers:[{kind:'legalEntity',inn:'7700000000'}]}],infoField:[{textEntries:[{identifier:'Тест',content:'Отметка'}]}]}],infoField:[{textEntries:[{identifier:'Тест',content:'Не оформлять реальную перевозку'}]}]},
    signer:{status:ChartererSignerStatus.ChartererElectronicPOA,fullName:{lastName:'Тестов',firstName:'Тест'},powerOfAttorney:{executionDate:new Date('2026-01-01Z'),serialNumber:'МЧД-001',fileId:'TEST-MCHD'}},
}
