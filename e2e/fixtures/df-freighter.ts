/** Синтетический ответ фрахтовщика. */
import { AuthorityConfirmationMethod,type TDocument1110374 } from '../../src/docs/df/1110374'
export const df1110374Fixture:TDocument1110374 = {
    createdAt:new Date('2026-09-09T08:00:00Z'),compilerName:'ООО «ТЕСТ СОСТАВИТЕЛЬ»',compilerIsFreighter:false,
    compilerAuthority:{id:'TEST-AUTHORITY',issuers:[{kind:'legalEntity',inn:'7700000000'}]},
    chartererFileId:{fileId:'ON_DOGFRAKHTEL_TEST',createdAt:new Date('2026-09-09T07:00:00Z'),signBase64:'VEVTVA=='},
    content:{charterId:'00000000-0000-4000-8000-000000000600',otherConditions:'Тестовые условия',vehicles:[{registrationNumber:'А001АА77',brand:'КАМАЗ',capacityTons:10,volume:30,drivers:[{licenseNumber:'123456',licenseSeries:'77',licenseIssuedAt:new Date('2020-01-01Z'),licenseExpiresAt:new Date('2030-01-01Z'),inn:'770000000000',contacts:{phones:['+70000000000'],emails:['test@example.test']},fullName:{lastName:'Тестов',firstName:'Тест'},waybill:{name:'Путевой лист',number:'00000000-0000-4000-8000-000000000300',issuedAt:new Date('2026-09-10Z'),validity:'10.09.2026'}}]}],infoField:[{textEntries:[{identifier:'Тест',content:'Не оформлять реальную перевозку'}]}]},
    signer:{position:'Ответственный',authorityConfirmationMethod:AuthorityConfirmationMethod.ElectronicPOAInSystemByDoc,fullName:{lastName:'Тестов',firstName:'Тест'},electronicPOAs:[{number:'00000000-0000-4000-8000-000000000602',issueDate:new Date('2026-01-01Z'),storageSystemInfo:'https://mchd.example.test/'}]},
}
