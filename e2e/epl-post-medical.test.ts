import { describe, expect, it } from 'vitest'
import { Document1110385, MedicalExamKind, AuthorityConfirmationMethod } from '../src/docs/epl/1110385'
import { formatMedicalExamPassInfo } from '../src/docs/epl/1110385/data/15.7-MedicalExamPassInfo'
import { formatMedicalExamContent } from '../src/docs/epl/1110385/data/15.4-MedicalExamContent'
import { formatMedicalExamSigner } from '../src/docs/epl/1110385/data/15.11-MedicalExamSigner'
import { epl1110385Fixture as fixture } from './fixtures/epl-post'
import { toXml } from '../src/helpers'

const meta = {programTag: 'TOS TEST', documentCreatedAt: new Date(2026, 8, 10, 17)}
describe('ЭПЛ 1110385: послерейсовый осмотр', () => {
    it.each([[MedicalExamKind.PostShift,'1'],[MedicalExamKind.PostTrip,'2']])('формирует вид осмотра %s', (examKind,code) => {
        const xml = toXml(Document1110385({...fixture,content:{...fixture.content,examKind}},meta))
        expect(xml).toContain(`ВидМО="${code}"`)
        expect(xml).toContain('КНД="1110385"')
        expect(xml).toContain('ON_PTLSPOSMO_')
        expect(xml).toContain('ИдФайлИнфЗаезд="ON_PTLSODPARK_TEST"')
        expect(xml).toContain('ОтметМОПосл="Прошел послерейсовый медицинский осмотр"')
        expect(xml).not.toContain('СвМОПред')
    })
    it.each([undefined,false])('не подставляет положительный результат без подтверждения', passed => {
        expect(() => formatMedicalExamPassInfo({...fixture.content.examPassInfo,passed:passed as true})).toThrow('Не подтверждено')
    })
    it('не использует плановое время вместо отсутствующего факта осмотра', () => {
        expect(() => formatMedicalExamPassInfo({...fixture.content.examPassInfo,examDateTime:undefined!})).toThrow('фактическое время')
    })
    it('требует версию программы', () => expect(() => Document1110385(fixture)).toThrow('programTag'))
    it('проверяет выбор медицинского работника', () => {
        expect(() => formatMedicalExamContent({...fixture.content,medicalWorkerStaff:undefined,medicalWorkerOrg:undefined})).toThrow('Требуется')
    })
    it('требует МЧД для способа 3 и бумажную доверенность для способа 5', () => {
        for (const authorityConfirmationMethod of [AuthorityConfirmationMethod.ElectronicPOAInSystemByDoc,AuthorityConfirmationMethod.PaperPOA]) {
            expect(() => formatMedicalExamSigner({...fixture.signer,authorityConfirmationMethod,electronicPOAs:[],paperPOAs:[]})).toThrow('обязателен')
        }
    })
})
