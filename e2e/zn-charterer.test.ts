import { describe,expect,it } from 'vitest'
import { Document1110350 } from '../src/docs/zn/1110350'
import { zn1110350Fixture as fixture } from './fixtures/zn-charterer'
import { formatForeignIssuer } from '../src/docs/zn/1110350/data/DocumentRequisites'
import { toXml } from '../src/helpers'
const meta={programTag:'TOS TEST'}
describe('Заказ-наряд 1110350',()=>{
    it('сохраняет условия, обе формы маршрута и нулевой штраф',()=>{
        const xml=toXml(Document1110350(fixture,meta))
        expect(xml).toContain('ON_ZAKAZNAR_');expect(xml).toContain('СвСрокВыпПрвз="8"');expect(xml).toContain('РазШтрНеПрТС="0.00"')
        expect(xml).toContain('МршТекст=');expect(xml).toContain('МршМашЧит=');expect(xml).toContain('<АдрИнф ');expect(xml).not.toContain('<АдресИнф ')
    })
    it('требует целые часы',()=>expect(()=>Document1110350({...fixture,content:{...fixture.content,durationHours:1.5}},meta)).toThrow('целые часы'))
    it('требует маршрут',()=>expect(()=>Document1110350({...fixture,content:{...fixture.content,submission:{...fixture.content.submission,route:{}}}},meta)).toThrow('маршрут'))
    it('приложения требуют обе категории документов',()=>expect(()=>Document1110350({...fixture,content:{...fixture.content,documents:{orderDocuments:[],cargoDocuments:[]}}},meta)).toThrow('документы'))
    it('не создаёт необязательные приложения',()=>expect(toXml(Document1110350({...fixture,content:{...fixture.content,documents:undefined}},meta))).not.toContain('<СопрДок'))
    it('иностранному ЮЛ нужна страна',()=>expect(()=>formatForeignIssuer({legalEntity:true,name:'Тест'})).toThrow('страна'))
    it('иностранному ФЛ нужен документ',()=>expect(()=>formatForeignIssuer({legalEntity:false})).toThrow('удостоверяющий'))
    it('требует МЧД',()=>expect(()=>Document1110350({...fixture,signer:{...fixture.signer,powerOfAttorney:undefined}},meta)).toThrow('доверенности'))
})
