import { describe, expect, it } from 'vitest'
import { Document1110349 } from '../src/docs/esv/1110349'
import { esv1110349Fixture as fixture } from './fixtures/esv-consignee'
import { toXml } from '../src/helpers'
const meta={programTag:'TOS TEST'}
describe('ЭСВ 1110349',()=>{
    it('ссылается на перевозчика и передаёт фактическую выгрузку',()=>{
        const xml=toXml(Document1110349(fixture,meta))
        expect(xml).toContain('ON_SOPVEDGP_')
        expect(xml).toContain('ИдФайлИнфПрв="ON_SOPVEDPER_TEST"')
        expect(xml).toContain('<СдачКонтВыгр ')
        expect(xml).toContain('ДатаПВыгр=')
        expect(xml).toContain('НалКоорТочВрПВыгр=')
        expect(xml).toMatch(/ВрИнфГП="\d{2}\.\d{2}\.\d{2}"/)
        expect(xml).not.toContain('ФактДатаПогр')
    })
    it('не придумывает время выгрузки',()=>{
        const xml=toXml(Document1110349({...fixture,content:{statementId:fixture.content.statementId,containers:[{}],unloading:{}}},meta))
        expect(xml).not.toContain('ДатаПВыгр')
        expect(xml).not.toContain('НалКоорТочВр')
    })
    it('требует сведения о контейнерах',()=>expect(()=>Document1110349({...fixture,content:{...fixture.content,containers:[]}},meta)).toThrow('контейнеров'))
    it('требует МЧД при электронных полномочиях',()=>expect(()=>Document1110349({...fixture,signer:{...fixture.signer,powerOfAttorney:undefined}},meta)).toThrow('доверенности'))
})
