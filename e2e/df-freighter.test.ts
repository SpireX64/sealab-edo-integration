import { describe,expect,it } from 'vitest'
import { Document1110374 } from '../src/docs/df/1110374'
import { df1110374Fixture as fixture } from './fixtures/df-freighter'
import { toXml } from '../src/helpers'
const meta={programTag:'TOS TEST'}
describe('Договор фрахтования 1110374',()=>{
    it('связывает договор с ТС, водителем и ЭПЛ с номером GUID',()=>{
        const xml=toXml(Document1110374(fixture,meta))
        expect(xml).toContain('ON_DOGFRASHCH_');expect(xml).toContain('ИдФайлИнфФт="ON_DOGFRAKHTEL_TEST"');expect(xml).toContain('НомерПЛ="00000000-0000-4000-8000-000000000300"')
    })
    it('не придумывает необязательные ТС',()=>expect(toXml(Document1110374({...fixture,content:{charterId:fixture.content.charterId}},meta))).not.toContain('<СвТС'))
    it('требует водителя при указании ТС',()=>expect(()=>Document1110374({...fixture,content:{...fixture.content,vehicles:[{...fixture.content.vehicles![0]!,drivers:[]}]}},meta)).toThrow('водители'))
    it('требует основание стороннего составителя',()=>expect(()=>Document1110374({...fixture,compilerAuthority:undefined},meta)).toThrow('основание'))
    it('требует МЧД при способе 3',()=>expect(()=>Document1110374({...fixture,signer:{...fixture.signer,electronicPOAs:[]}},meta)).toThrow('СвДоверЭл'))
})
