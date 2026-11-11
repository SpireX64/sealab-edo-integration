import { describe,expect,it } from 'vitest'
import { Document1110351 } from '../src/docs/zn/1110351'
import { formatDriver,formatOtherConditions } from '../src/docs/zn/1110351/data/Content'
import { zn1110351Fixture as fixture } from './fixtures/zn-freighter'
import { toXml } from '../src/helpers'
const meta={programTag:'TOS TEST'}
describe('Заказ-наряд 1110351',()=>{
    it('передаёт принятие, водителей, путевые листы и расчёт',()=>{
        const xml=toXml(Document1110351(fixture,meta))
        expect(xml).toContain('ON_ZAKAZNARSOG_');expect(xml).toContain('ИдФайлИнфФт="ON_ZAKAZNAR_TEST"');expect(xml).toContain('РазмерПлат="11000.00"');expect(xml).toContain('РасхПлатДор="0.00"');expect(xml).toContain('НомерПЛ="TEST-PL-001"')
    })
    it('не придумывает итог при его отсутствии',()=>{
        const xml=toXml(Document1110351({...fixture,content:{...fixture.content,payment:{serviceCost:10000}}},meta))
        expect(xml).not.toContain('РазмерПлат=')
    })
    it('применяет обязательность спецразрешения из Schematron',()=>expect(()=>formatOtherConditions({workRestRegime:'Тест'})).toThrow('спецразрешения'))
    it('принимает только идентификатор спецразрешения',()=>expect(formatOtherConditions({workRestRegime:'Тест',permitId:'TEST'})['ИдСР']).toBe('TEST'))
    it('требует путевой лист каждого водителя',()=>expect(()=>formatDriver({...fixture.content.vehicles.drivers[0]!,waybills:[]})).toThrow('путевой лист'))
    it('требует МЧД',()=>expect(()=>Document1110351({...fixture,signer:{...fixture.signer,powerOfAttorney:undefined}},meta)).toThrow('доверенности'))
})
