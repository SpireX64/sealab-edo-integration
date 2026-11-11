import { describe, expect, it } from 'vitest'
import { Document1110348, ShipperSignerStatus } from '../src/docs/esv/1110348'
import { esv1110348Fixture as fixture } from './fixtures/esv-shipper'
import { toXml } from '../src/helpers'
const meta={programTag:'TOS TEST'}
describe('ЭСВ 1110348',()=>{
    it('передаёт условия, пломбы и ссылку на перевозчика',()=>{
        const xml=toXml(Document1110348(fixture,meta))
        expect(xml).toContain('ON_SOPVEDGO_')
        expect(xml).toContain('ИдФайлИнфПрв="ON_SOPVEDPER_TEST"')
        expect(xml).toContain('СвПломба="TEST-SEAL-001"')
        expect(xml).toMatch(/ВрФайлИнфПрв="\d{2}\.\d{2}\.\d{2}"/)
        expect(xml).toContain('СтатПодп="2"')
    })
    it('не придумывает отсутствующие факты погрузки',()=>{
        const xml=toXml(Document1110348({...fixture,content:{statementId:fixture.content.statementId,containers:[{}],loading:{}}},meta))
        expect(xml).not.toContain('ФактДатаПогр')
        expect(xml).not.toContain('ТемпРеж')
        expect(xml).not.toContain('НалКоорТочВр')
    })
    it('допускает нулевую температуру',()=>{
        const copy=structuredClone(fixture);copy.content.instructions!.temperature={minimumCelsius:0}
        expect(toXml(Document1110348(copy,meta))).toContain('ТемпНеНижеСВ="0.00"')
    })
    it('требует сведения о контейнерах',()=>expect(()=>Document1110348({...fixture,content:{...fixture.content,containers:[]}},meta)).toThrow('контейнеров'))
    it('требует МЧД при электронных полномочиях',()=>expect(()=>Document1110348({...fixture,signer:{...fixture.signer,powerOfAttorney:undefined}},meta)).toThrow('доверенности'))
    it('может ссылаться на систему хранения МЧД',()=>{
        const xml=toXml(Document1110348({...fixture,signer:{...fixture.signer,status:ShipperSignerStatus.ShipperElectronicPOA,powerOfAttorney:undefined,storageSystemUrl:'https://mchd.example.test/'}},meta))
        expect(xml).toContain('ИдСистХран=')
        expect(xml).not.toContain('<СвДовер')
    })
})
