/** Синтетическое согласование заказа-наряда. */
import { FreighterSignerStatus,type TDocument1110351 } from '../../src/docs/zn/1110351'
const fullName={lastName:'Тестов',firstName:'Тест'}
export const zn1110351Fixture:TDocument1110351={
    createdAt:new Date('2026-09-09T08:00:00Z'),chartererFileId:{fileId:'ON_ZAKAZNAR_TEST',createdAt:new Date('2026-09-09T07:00:00Z'),signBase64:'VEVTVA=='},
    content:{orderId:'00000000-0000-4000-8000-000000000500',
        freighter:{kind:'soleProprietor',soleProprietor:{inn:'770000000000',ogrnip:'300000000000001',fullName,contacts:{phones:['+70000000000'],emails:['test@example.test']}}},
        acceptance:{acceptedAt:new Date('2026-09-09T08:00:00Z'),position:'Ответственный',fullName},
        vehicles:{count:1,registrationNumber:'А001АА77',specs:{type:'Грузовой фургон',brand:'КАМАЗ',capacityTons:10,volume:30},drivers:[{licenseNumber:'123456',licenseSeries:'77',licenseIssuedAt:new Date('2020-01-01Z'),licenseExpiresAt:new Date('2030-01-01Z'),inn:'770000000000',simpleSignIdMethod:'Тестовый кабинет',fullName,contacts:[{phones:['+70000000000']}],waybills:[{name:'Путевой лист',number:'TEST-PL-001',issuedAt:new Date('2026-09-10Z'),validity:'10.09.2026'}]}]},
        otherConditions:[{permitId:'TEST-PERMIT-001',permitNumber:'TEST-001',permitIssuedAt:new Date('2026-09-01Z'),permitValidity:'01.09.2026–30.09.2026',workRestRegime:'Тестовый согласованный режим труда и отдыха',route:{text:'Тестовый склад А — тестовый склад Б'},acts:[{id:'TEST-ACT-001',issuers:[{kind:'legalEntity',inn:'7700000000'}]}]}],
        payment:{serviceCost:10000,tollRoadCost:0,customsCost:0,cleaningCost:1000,calculation:'10000 + 1000',total:11000,infoField:[{textEntries:[{identifier:'Тест',content:'Расчёт'}]}]},
        infoField:[{textEntries:[{identifier:'Тест',content:'Не оформлять реальную перевозку'}]}],
    },
    signer:{status:FreighterSignerStatus.FreighterElectronicPOA,fullName,powerOfAttorney:{executionDate:new Date('2026-01-01Z'),serialNumber:'МЧД-001',fileId:'TEST-MCHD'}},
}
