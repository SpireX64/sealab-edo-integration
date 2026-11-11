/** Синтетическая ЭСВ, не для реальной перевозки. */
import { CarrierSignerStatus, VehicleOwnershipType, type TDocument1110347 } from '../../src/docs/esv/1110347'
const fullName = {lastName:'Тестов',firstName:'Тест',middleName:'Тестович'}
const contacts = {phones:['+70000000000'],emails:['test@example.test'],otherContacts:'Тест'}
const address = {countryCode:'643',addressText:'Тестовый адрес склада'}
const legalEntity = {name:'ООО «ТЕСТ»',inn:'7700000000',otherDetails:'Синтетический участник',address,contacts}
export const esv1110347Fixture:TDocument1110347 = {
    createdAt:new Date('2026-09-10T05:00:00Z'),
    content:{
        statementId:'00000000-0000-4000-8000-000000000400',number:'TEST-SV-001',issuedAt:new Date('2026-09-10T05:00:00Z'),
        correction:{number:1,date:new Date('2026-09-10T05:00:00Z'),persons:[fullName]},
        shipper:{participant:{kind:'legalEntity',legalEntity},loadingResponsible:{kind:'individual',individual:{fullName,contacts,residenceAddress:address}}},
        consignee:{participant:{kind:'legalEntity',legalEntity},receiptResponsible:{kind:'individual',individual:{fullName,contacts}}},
        cargo:{descriptions:[{name:'Тестовое оборудование',condition:'Исправное',packagingMethod:'В коробках',packagingType:'00',density:'500 кг/м3',divisible:false,containerVolume:33,containerWeightKg:2200,additionalInfo:'Тест',volume:2,plannedPackageCount:1,markings:['ТЕСТ'],dimensions:{height:1,length:2,width:1},plannedWeight:{grossKg:500,netKg:480,palletCount:1}}],declaredValue:{amount:10000,currencyCode:'643',currencyName:'Российский рубль'}},
        containers:[{numbers:['TEST0000001'],sizeTypeCode:'22G1',countryCode:'643',capacityTons:28,weightKg:2200,hasSafetyPlate:true,submittedForLoadingAt:new Date('2026-09-10T06:00:00Z'),returnedAt:new Date('2026-09-10T15:00:00Z')}],
        transfer:{loadingAddress:{address},unloadingAddress:{address},vehicleLoadingAt:new Date('2026-09-10T06:00:00Z'),vehicleUnloadingAt:new Date('2026-09-10T14:00:00Z')},
        carrier:{kind:'legalEntity',legalEntity,responsible:{fullName,contacts},drivers:[{fullName,inn:'770000000000',licenseNumber:'123456',licenseSeries:'77',licenseIssuedAt:new Date('2020-01-01Z'),licenseExpiresAt:new Date('2030-01-01Z'),simpleSignIdMethod:'Личный кабинет',phones:contacts.phones}],waybills:[{name:'Путевой лист',number:'TEST-PL-001',issuedAt:new Date('2026-09-10Z'),validity:'10.09.2026'}]},
        vehicles:{vehicle:{regNumber:'А001АА77',ownershipType:VehicleOwnershipType.Owned,specs:{type:'Тягач',brand:'КАМАЗ',capacityTons:28,volume:33}},trailers:[{regNumber:'АА000177',specs:{type:'Контейнеровоз',brand:'Тест',capacityTons:28}}]},
        infoField:[{textEntries:[{identifier:'Тест',content:'Не оформлять реальную перевозку'}]}],
    },
    signer:{status:CarrierSignerStatus.CarrierElectronicPOA,fullName,position:'Ответственный',powerOfAttorney:{executionDate:new Date('2026-01-01Z'),serialNumber:'МЧД-001',fileId:'TEST-MCHD',revocationSystemUrl:'https://mchd.example.test/'}},
}
