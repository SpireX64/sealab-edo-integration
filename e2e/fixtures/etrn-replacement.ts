/** Синтетическая замена водителя и автомобиля. */
import { CarrierSignerStatus, IssuerType, VehicleOwnershipType, type TDocument1110344 } from '../../src/docs/etrn/1110344'
export const etrn1110344Fixture: TDocument1110344 = {
    documentName:'Транспортная накладная',createdAt:new Date('2026-09-10T10:00:00Z'),otherRecipientIds:['TEST_RECIPIENT'],
    carrierAcceptanceFileId:{fileId:'ON_TRNACLPPRIN_TEST',createdAt:new Date('2026-09-10T06:00:00Z'),signBase64:'VEVTVA=='},
    content:{
        waybillId:'00000000-0000-4000-8000-000000000100',replacedAt:new Date('2026-09-10T09:50:00Z'),operationDescription:'Замена водителя и транспортного средства',
        reason:{text:'Тестовое перераспределение транспорта'},
        correction:{correctionNumber:1,correctionDate:new Date('2026-09-10T10:00:00Z')},
        drivers:[{
            cargoTransferDocument:{id:'TEST-TRANSFER',issuerRequisites:[{issuerType:IssuerType.LegalEntity,inn:'7700000000'}]},
            newDriver:{driverLicenseNumber:'123456',driverLicenseSeries:'7700',driverLicenseDate:new Date('2020-01-01T00:00:00Z'),inn:'770000000000',simpleSignIdMethod:'Тестовая идентификация',phones:['+70000000000'],fullName:{lastName:'Тестов',firstName:'Новый'},waybills:[{id:'TEST-PL',issuerRequisites:[{issuerType:IssuerType.LegalEntity,inn:'7700000000'}]}]},
        }],
        vehicles:[{
            vehicle:{stsNumber:'7700123456',vin:'XTC12345678901234',regNumber:'А002АА77',ownershipType:VehicleOwnershipType.Owned,specs:{type:'Грузовой фургон',brand:'КАМАЗ',loadCapacity:10,capacity:30}},
            cargoTransferDocument:{id:'TEST-TRANSFER',issuerRequisites:[{issuerType:IssuerType.LegalEntity,inn:'7700000000'}]},
            specialDrivingConditions:[{permitFileId:'TEST-PERMIT',route:{isGeoJson:false,route:'Тестовый маршрут'}}],
        }],
        notes:[{notedAt:new Date('2026-09-10T09:55:00Z'),circumstances:'Тестовая передача груза',infoField:[{textEntries:[{identifier:'Тест',content:'Отметка'}]}]}],
        infoField:[{textEntries:[{identifier:'Тест',content:'Не оформлять реальную перевозку'}]}],
    },
    signer:{status:CarrierSignerStatus.CarrierElectronicPOA,fullName:{lastName:'Тестов',firstName:'Тест'},position:'Тестовый подписант',powerOfAttorney:{executionDate:new Date('2026-01-01T00:00:00Z'),fileId:'TEST-MCHD',revocationSystemUrl:'https://mchd.example.test/'}},
}
