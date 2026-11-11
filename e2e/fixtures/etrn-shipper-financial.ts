/** Синтетический ответный финансовый титул грузоотправителя. */
import { ShipperSignerStatus, IssuerType, type TDocument1110346 } from '../../src/docs/etrn/1110346'
export const etrn1110346Fixture: TDocument1110346 = {
    documentName:'Транспортная накладная',createdAt:new Date('2026-09-10T16:00:00Z'),compilerName:'Тестовый составитель',compilerIsShipper:false,
    compilerAuthority:{id:'TEST-COMPILER',issuerRequisites:[{issuerType:IssuerType.LegalEntity,inn:'7700000000'}]},
    otherPayerName:'Тестовый плательщик',otherPayerBasis:{id:'TEST-PAYER',issuerRequisites:[{issuerType:IssuerType.LegalEntity,inn:'7700000000'}]},
    carrierFinancialFileId:{fileId:'ON_TRNPUDPER_TEST',createdAt:new Date('2026-09-10T15:00:00Z'),signBase64:'VEVTVA=='},
    content:{
        waybillId:'00000000-0000-4000-8000-000000000100',operationDescription:'Приняты услуги по перевозке тестового груза',
        shipperDetails:{okpo:'12345678',department:'Тестовое подразделение',participantInfo:'Тест',shortName:'Тестовый отправитель',bankDetails:{accountNumber:'40702810000000000000',bank:{name:'Тестовый банк',bik:'044525000',correspondentAccount:'30101810000000000000'}}},
        infoField:[{textEntries:[{identifier:'Тест',content:'Не оформлять реальную перевозку'}]}],
    },
    signers:[{status:ShipperSignerStatus.ShipperElectronicPOA,fullName:{lastName:'Тестов',firstName:'Тест'},position:'Тестовый подписант',powerOfAttorney:{executionDate:new Date('2026-01-01T00:00:00Z'),fileId:'TEST-MCHD',revocationSystemUrl:'https://mchd.example.test/'}}],
}
