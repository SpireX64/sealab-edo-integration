/** Синтетический финансовый титул перевозчика, НДС 22%. */
import { CarrierSignerStatus, TaxRate, IssuerType, type TDocument1110345 } from '../../src/docs/etrn/1110345'
export const etrn1110345Fixture: TDocument1110345 = {
    documentName:'Транспортная накладная',createdAt:new Date('2026-09-10T15:00:00Z'),compilerName:'Тестовый составитель',compilerIsCarrier:false,
    compilerAuthority:{id:'TEST-COMPILER',issuerRequisites:[{issuerType:IssuerType.LegalEntity,inn:'7700000000'}]},
    carrierDeliveryFileId:{fileId:'ON_TRNACLPVYN_TEST',createdAt:new Date('2026-09-10T13:15:00Z'),signBase64:'VEVTVA=='},
    content:{
        waybillId:'00000000-0000-4000-8000-000000000100',operationDescription:'Оказаны услуги по перевозке тестового груза',currencyCode:'643',currencyName:'Российский рубль',
        amountWithoutVat:10000,taxRate:TaxRate.TwentyTwoPercent,amountWithVat:12200,tax:{amount:2200},calculation:'Тестовый расчёт: 10000 + 2200',
        correction:{correctionNumber:1,correctionDate:new Date('2026-09-10T15:00:00Z')},
        carrierDetails:{okpo:'12345678',department:'Тестовое подразделение',participantInfo:'Тест',shortName:'Тестовый перевозчик',bankDetails:{accountNumber:'40702810000000000000',bank:{name:'Тестовый банк',bik:'044525000',correspondentAccount:'30101810000000000000'}}},
        infoField:[{textEntries:[{identifier:'Тест',content:'Не оформлять реальную перевозку'}]}],
    },
    signers:[{status:CarrierSignerStatus.CarrierElectronicPOA,fullName:{lastName:'Тестов',firstName:'Тест'},position:'Тестовый подписант',powerOfAttorney:{executionDate:new Date('2026-01-01T00:00:00Z'),fileId:'TEST-MCHD',revocationSystemUrl:'https://mchd.example.test/'}}],
}
