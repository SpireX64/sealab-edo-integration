/** Синтетическое завершение пользования ТС. */
import { FreighterSignerStatus,type TDocument1110353 } from '../../src/docs/zn/1110353'
export const zn1110353Fixture:TDocument1110353 = {
    createdAt:new Date('2026-09-10T15:00:00Z'),submissionFileId:{fileId:'ON_ZAKAZNARPOD_TEST',createdAt:new Date('2026-09-10T06:00:00Z'),signBase64:'VEVTVA=='},
    content:{orderId:'00000000-0000-4000-8000-000000000500',useCompletedAt:new Date('2026-09-10T15:00:00Z'),correction:{number:1,date:new Date('2026-09-10Z'),otherPersonRequisites:['Тестовый составитель']},reservations:{changedCarriageAt:new Date('2026-09-10T14:00:00Z'),changedDeadline:'10.09.2026 до 17:00',changedRoute:'Тестовый изменённый маршрут',infoField:[{textEntries:[{identifier:'Тест',content:'Оговорка'}]}]},notes:[{notedAt:new Date('2026-09-10T15:00:00Z'),circumstances:'Тестовая отметка завершения',acts:[{id:'TEST-ACT',issuers:[{kind:'legalEntity',inn:'7700000000'}]}],penalties:[{amountRub:0,calculation:'Тестовый нулевой штраф'}],weighingActs:[{id:'TEST-WEIGH',issuers:[{kind:'legalEntity',inn:'7700000000'}]}]}],infoField:[{textEntries:[{identifier:'Тест',content:'Не оформлять реальную перевозку'}]}]},
    signer:{status:FreighterSignerStatus.FreighterElectronicPOA,fullName:{lastName:'Тестов',firstName:'Тест'},powerOfAttorney:{executionDate:new Date('2026-01-01Z'),serialNumber:'МЧД-001',fileId:'TEST-MCHD'}},
}
