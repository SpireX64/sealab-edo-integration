import { describe,expect,it } from 'vitest'
import { Document1110352 } from '../src/docs/zn/1110352'
import { formatPenalty } from '../src/docs/zn/1110352/data/Note'
import { zn1110352Fixture as fixture } from './fixtures/zn-submission'
import { toXml } from '../src/helpers'
const meta={programTag:'TOS TEST'}
describe('Заказ-наряд 1110352',()=>{
    it('связывает подачу ТС с согласованием и сохраняет акты/штрафы',()=>{
        const xml=toXml(Document1110352(fixture,meta))
        expect(xml).toContain('ON_ZAKAZNARPOD_');expect(xml).toContain('ИдФайлИнфФщ="ON_ZAKAZNARSOG_TEST"');expect(xml).toContain('ДатВрПодТС=');expect(xml).toContain('ИтогРазмШтрИн="10.00"');expect(xml).toContain('<СвАктВзв ')
    })
    it('допускает нулевой штраф без подстановок',()=>expect(formatPenalty({amountRub:0})['ИтогРазмШтрРФ']).toBe('0.00'))
    it('не принимает нечисловую сумму',()=>expect(()=>formatPenalty({amountRub:NaN})).toThrow('фактическая сумма'))
    it('не выдумывает отметки',()=>expect(toXml(Document1110352({...fixture,content:{...fixture.content,notes:undefined}},meta))).not.toContain('<ОтметФт'))
    it('требует МЧД',()=>expect(()=>Document1110352({...fixture,signer:{...fixture.signer,powerOfAttorney:undefined}},meta)).toThrow('доверенности'))
})
