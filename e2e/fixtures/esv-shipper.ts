/** Синтетическая ЭСВ грузоотправителя. */
import { ShipperSignerStatus, type TDocument1110348 } from '../../src/docs/esv/1110348'
export const esv1110348Fixture:TDocument1110348 = {
    createdAt:new Date('2026-09-10T06:30:00Z'),
    carrierFileId:{fileId:'ON_SOPVEDPER_TEST',createdAt:new Date('2026-09-10T05:00:00Z'),signBase64:'VEVTVA=='},
    content:{statementId:'00000000-0000-4000-8000-000000000400',
        correction:{number:1,date:new Date('2026-09-10Z'),otherPersonRequisites:['Тестовый составитель']},
        instructions:{transportRules:'Тестовые согласованные условия',deliveryDeadline:'10.09.2026',transshipmentProhibited:true,seals:'TEST-SEAL-001',temperature:{minimumCelsius:2,maximumCelsius:8,minimumHumidity:30,maximumHumidity:60},infoField:[{textEntries:[{identifier:'Тест',content:'Условия'}]}]},
        containers:[{cargoSubmittedAt:new Date('2026-09-10T06:15:00Z'),containerReturnedAt:new Date('2026-09-10T15:00:00Z')}],
        loading:{vehicleArrivedAt:new Date('2026-09-10T06:00:00Z'),loadedAt:new Date('2026-09-10T06:15:00Z'),vehicleDepartedAt:new Date('2026-09-10T06:30:00Z'),containerCondition:'Исправен',packageCount:1,address:{address:{countryCode:'643',addressText:'Тестовый склад'}},weight:{grossKg:500,netKg:480,palletCount:1},infoField:[{textEntries:[{identifier:'Тест',content:'Погрузка'}]}]},
        infoField:[{textEntries:[{identifier:'Тест',content:'Не оформлять реальную перевозку'}]}],
    },
    signer:{status:ShipperSignerStatus.ShipperElectronicPOA,fullName:{lastName:'Тестов',firstName:'Тест'},powerOfAttorney:{executionDate:new Date('2026-01-01Z'),serialNumber:'МЧД-001',fileId:'TEST-MCHD'}},
}
