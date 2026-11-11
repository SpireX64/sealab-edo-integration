/** Синтетический пример переадресовки, без действующей электронной подписи. */
import { CarrierSignerStatus, IssuerType, READDRESSING_NOTIFICATION_DELIVERY_METHOD, type TDocument1110343 } from '../../src/docs/etrn/1110343'
export const etrn1110343Fixture: TDocument1110343 = {
    documentName:'Транспортная накладная',
    createdAt:new Date('2026-09-10T09:00:00Z'),
    otherRecipientIds:['TEST_RECIPIENT'],
    carrierAcceptanceFileId:{fileId:'ON_TRNACLPPRIN_TEST',createdAt:new Date('2026-09-10T06:00:00Z'),signBase64:'VEVTVA=='},
    content:{
        waybillId:'00000000-0000-4000-8000-000000000100',
        readdressedAt:new Date('2026-09-10T08:50:00Z'),
        instructionReceived:true,
        notificationDeliveryMethod:READDRESSING_NOTIFICATION_DELIVERY_METHOD,
        notificationSignature:'VEVTVA==',
        correction:{correctionNumber:1,correctionDate:new Date('2026-09-10T09:00:00Z')},
        basis:{name:'Тестовое электронное уведомление',documentNumber:'TEST-PA-1',documentDate:new Date('2026-09-10T08:45:00Z'),id:'TEST-PA',additionalDetails:'Синтетический пример',issuerRequisites:[{issuerType:IssuerType.LegalEntity,inn:'7700000000'}]},
        newConsignee:{
            participantInfo:{inn:'7800000000',comment:'Тестовая информация для получателя'},
            partyId:{type:IssuerType.LegalEntity,name:'Тестовый получатель',inn:'7800000000',kpp:'780001001'},
            address:{postalCode:'190000',regionCode:'78',city:'Санкт-Петербург',street:'Тестовая',house:'2'},
            contacts:{phones:['+70000000000'],emails:['test@example.test']},
        },
        newUnloadingPoint:{scheduledAt:new Date('2026-09-10T12:00:00Z'),address:{gln:'0000000000000',comment:'Тестовый пункт выгрузки',coords:{latitude:'59.0000000000000',longitude:'30.0000000000000'},address:{postalCode:'190000',regionCode:'78',city:'Санкт-Петербург',street:'Тестовая',house:'2'}}},
        notes:[{notedAt:new Date('2026-09-10T08:55:00Z'),circumstances:'Тестовое согласование переадресовки',infoField:[{textEntries:[{identifier:'Тест',content:'Отметка'}]}]}],
        infoField:[{textEntries:[{identifier:'Тест',content:'Не оформлять реальную перевозку'}]}],
    },
    signers:[{status:CarrierSignerStatus.CarrierElectronicPOA,fullName:{lastName:'Тестов',firstName:'Тест'},position:'Тестовый подписант',powerOfAttorney:{executionDate:new Date('2026-01-01T00:00:00Z'),fileId:'TEST-MCHD',revocationSystemUrl:'https://mchd.example.test/'}}],
}
