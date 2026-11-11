/** Синтетический заказ-наряд; не для реальной перевозки. */
import { ChartererSignerStatus,type TDocument1110350 } from '../../src/docs/zn/1110350'
export const zn1110350Fixture:TDocument1110350 = {
    createdAt:new Date('2026-09-09T07:00:00Z'),
    content:{orderId:'00000000-0000-4000-8000-000000000500',number:'TEST-ZN-001',issuedAt:new Date('2026-09-09Z'),durationHours:8,
        correction:{number:1,date:new Date('2026-09-09Z'),persons:[{lastName:'Тестов',firstName:'Тест'}]},
        charterer:{kind:'legalEntity',legalEntity:{name:'ООО «ТЕСТ ФРАХТОВАТЕЛЬ»',inn:'7700000000',otherDetails:'Синтетический участник',address:{countryCode:'643',addressText:'Тестовый адрес'},contacts:{phones:['+70000000000'],emails:['test@example.test'],otherContacts:'Тест'}}},
        conditions:{loadingAndCleaningProcedure:'Тестовые согласованные условия погрузки, выгрузки, промывки и дезинфекции',vehicleNotProvidedPenalty:0,useRefusedPenalty:1000},
        cargo:{descriptions:[{name:'Тестовое оборудование',commodityCode:'8501',condition:'Исправное',packagingMethod:'Коробки',packagingType:'00',density:250,canDistributeAxleLoad:true,additionalInfo:'Тест',volume:2,packageCount:1,markings:['ТЕСТ'],dimensions:{height:1,length:2,width:1},containers:[{count:1,identifiers:['TEST0000001']}],weight:{grossKg:500,netKg:480,palletCount:1},declaredValue:{amount:10000,currencyCode:'643',currencyName:'Российский рубль'}}],totalDeclaredValue:{amount:10000,currencyCode:'643',currencyName:'Российский рубль'},infoField:[{textEntries:[{identifier:'Тест',content:'Груз'}]}]},
        documents:{orderDocuments:[{name:'Тестовый документ',documentNumber:'TEST-001',documentDate:new Date('2026-09-09Z'),additionalDetails:'Тест',issuers:[{kind:'legalEntity',inn:'7700000000'}]}],cargoDocuments:[{id:'TEST-CARGO-DOC',issuers:[{kind:'authority',name:'Тестовый составитель'}]}],statement:{id:'ON_SOPVEDPER_TEST',issuers:[{kind:'legalEntity',inn:'7700000000'}]}},
        instructions:{transportRules:'Тестовые нормы перевозки',vehicle:{type:'Грузовой фургон',brand:'КАМАЗ',capacityTons:10,volume:30},infoField:[{textEntries:[{identifier:'Тест',content:'Условия'}]}]},
        submission:{submittedAt:new Date('2026-09-10T06:00:00Z'),route:{text:'Тестовый склад А — тестовый склад Б',machineReadable:'{"type":"LineString","coordinates":[[37.6,55.7],[37.7,55.8]]}'},address:{address:{countryCode:'643',addressText:'Тестовый склад А'},gln:'4600000000000',comment:'Тест',coords:{latitude:'55.7',longitude:'37.6'}}},
        infoField:[{textEntries:[{identifier:'Тест',content:'Не оформлять реальную перевозку'}]}],
    },
    signer:{status:ChartererSignerStatus.ChartererElectronicPOA,fullName:{lastName:'Тестов',firstName:'Тест'},position:'Ответственный',powerOfAttorney:{executionDate:new Date('2026-01-01Z'),serialNumber:'МЧД-001',fileId:'TEST-MCHD',revocationSystemUrl:'https://mchd.example.test/'}},
}
