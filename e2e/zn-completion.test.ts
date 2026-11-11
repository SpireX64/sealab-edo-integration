import { describe,expect,it } from 'vitest'
import { Document1110353 } from '../src/docs/zn/1110353'
import { zn1110353Fixture as fixture } from './fixtures/zn-completion'
import { toXml } from '../src/helpers'
const meta={programTag:'TOS TEST'}
describe('Заказ-наряд 1110353',()=>{
    it('ссылается на подачу и фиксирует завершение/изменения/отметки',()=>{
        const xml=toXml(Document1110353(fixture,meta))
        expect(xml).toContain('ON_ZAKAZNARVOZ_');expect(xml).toContain('ИдФайлИнфФт="ON_ZAKAZNARPOD_TEST"');expect(xml).toContain('ДатВрЗавПолТС=');expect(xml).toContain('ИзмМршВыпПрвз=');expect(xml).toContain('<ОтметФщ ')
    })
    it('не придумывает оговорки',()=>expect(toXml(Document1110353({...fixture,content:{orderId:fixture.content.orderId,useCompletedAt:fixture.content.useCompletedAt}},meta))).not.toContain('<СвОгЗамФщ'))
    it('при оговорке требует изменённый срок',()=>expect(()=>Document1110353({...fixture,content:{...fixture.content,reservations:{changedCarriageAt:fixture.createdAt,changedDeadline:''}}},meta)).toThrow('сроки'))
    it('требует МЧД',()=>expect(()=>Document1110353({...fixture,signer:{...fixture.signer,powerOfAttorney:undefined}},meta)).toThrow('доверенности'))
})
