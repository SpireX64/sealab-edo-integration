/** Синтетический пример выдачи груза, для локального тестирования. */
import { CarrierSignerStatus, IssuerType, type TDocument1110342 } from '../../src/docs/etrn/1110342'

export const etrn1110342Fixture: TDocument1110342 = {
    documentName: 'Транспортная накладная',
    documentDateTime: new Date('2026-09-10T13:15:00Z'),
    otherRecipientIds: ['TEST_RECIPIENT'],
    consigneeFileId: {fileId:'ON_TRNACLGRPO_TEST',createdAt:new Date('2026-09-10T13:00:00Z'),signBase64:'VEVTVA=='},
    carrierInfo: {
        waybillId:'00000000-0000-4000-8000-000000000100',
        delivered:true,
        reservations: {
            arrivalDateTime:new Date('2026-09-10T12:00:00Z'),
            unloadingDateTime:new Date('2026-09-10T12:15:00Z'),
            departureDateTime:new Date('2026-09-10T13:10:00Z'),
            cargoCondition:'Тестовое замечание об упаковке',
            unloadingWorkNote:'Тестовое замечание о выгрузке',
            infoField:[{textEntries:[{identifier:'Тест',content:'Синтетический пример'}]}],
        },
        notes:[{
            notedAt:new Date('2026-09-10T13:10:00Z'),
            circumstances:'Тестовое повреждение упаковки',
            weighingActNote:'Тестовая отметка акта взвешивания',
            commercialActs:[{id:'TEST-ACT',name:'Тестовый акт',documentNumber:'TEST-1',documentDate:new Date('2026-09-10T13:00:00Z'),additionalDetails:'Тест',issuerRequisites:[{issuerType:IssuerType.LegalEntity,inn:'7700000000'}]}],
            penaltyCalculation:[{actualUnitCount:'1',rubAmount:0,foreignAmount:0,foreignCurrency:{currencyCode:'840',currencyName:'Доллар США',exchangeRateDate:new Date('2026-09-10T00:00:00Z'),exchangeRate:80},calculation:'Синтетический нулевой штраф'}],
            infoField:[{textEntries:[{identifier:'Тест',content:'Тестовая отметка'}]}],
        }],
        infoField:[{textEntries:[{identifier:'Тест',content:'Не оформлять реальную перевозку'}]}],
    },
    signer: {
        status:CarrierSignerStatus.CarrierElectronicPOA,
        position:'Тестовый подписант',
        fullName:{lastName:'Тестов',firstName:'Тест'},
        powerOfAttorney:{executionDate:new Date('2026-01-01T00:00:00Z'),fileId:'TEST_MCHD',serialNumber:1,revocationSystemUrl:'https://mchd.example.test/'},
    },
}
