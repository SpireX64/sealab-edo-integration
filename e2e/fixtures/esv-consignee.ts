/** Синтетическая ЭСВ грузополучателя. */
import { ConsigneeSignerStatus, type TDocument1110349 } from '../../src/docs/esv/1110349'
export const esv1110349Fixture:TDocument1110349 = {
    createdAt:new Date('2026-09-10T15:00:00Z'),
    carrierFileId:{fileId:'ON_SOPVEDPER_TEST',createdAt:new Date('2026-09-10T05:00:00Z'),signBase64:'VEVTVA=='},
    content:{statementId:'00000000-0000-4000-8000-000000000400',
        correction:{number:1,date:new Date('2026-09-10Z'),persons:[{lastName:'Тестов',firstName:'Тест'}]},
        containers:[{submittedForUnloadingAt:new Date('2026-09-10T14:00:00Z'),containerReturnedAt:new Date('2026-09-10T15:00:00Z')}],
        unloading:{vehicleArrivedAt:new Date('2026-09-10T13:30:00Z'),positionedForUnloadingAt:new Date('2026-09-10T14:00:00Z'),vehicleDepartedAt:new Date('2026-09-10T15:00:00Z'),containerCondition:'Исправен',packageCount:1,address:{address:{countryCode:'643',addressText:'Тестовый склад получателя'}},weight:{grossKg:500,netKg:480,palletCount:1},infoField:[{textEntries:[{identifier:'Тест',content:'Выгрузка'}]}]},
        infoField:[{textEntries:[{identifier:'Тест',content:'Не оформлять реальную перевозку'}]}],
    },
    signer:{status:ConsigneeSignerStatus.ConsigneeElectronicPOA,fullName:{lastName:'Тестов',firstName:'Тест'},powerOfAttorney:{executionDate:new Date('2026-01-01Z'),serialNumber:'МЧД-001',fileId:'TEST-MCHD'}},
}
