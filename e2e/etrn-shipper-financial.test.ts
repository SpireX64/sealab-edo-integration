import { describe, expect, it } from 'vitest'
import { Document1110346 } from '../src/docs/etrn/1110346'
import { etrn1110346Fixture as fixture } from './fixtures/etrn-shipper-financial'
import { toXml } from '../src/helpers'
const meta={programTag:'TOS TEST'}
describe('ЭТрН 1110346: финансовый титул отправителя', () => {
    it('передаёт иного плательщика и его основание', () => {
        const xml=toXml(Document1110346(fixture,meta))
        expect(xml).toContain('ON_TRNPUDGO_')
        expect(xml).toContain('НаимПлат="Тестовый плательщик"')
        expect(xml).toContain('<ОснИнПлат ')
        expect(xml).toContain('ИдФайлПУДИнфПрв="ON_TRNPUDPER_TEST"')
        expect(xml).toContain('СтатПодп="2"')
    })
    it('требует основание другого плательщика', () => {
        expect(() => Document1110346({...fixture,otherPayerBasis:undefined},meta)).toThrow('плательщика требуется основание')
    })
    it('разрешает исходного плательщика без дополнительного блока', () => {
        const xml=toXml(Document1110346({...fixture,otherPayerName:undefined,otherPayerBasis:undefined},meta))
        expect(xml).not.toContain('НаимПлат')
        expect(xml).not.toContain('ОснИнПлат')
    })
    it('требует основание стороннего составителя', () => {
        expect(() => Document1110346({...fixture,compilerAuthority:undefined},meta)).toThrow('документ-основание')
    })
    it('поддерживает несколько подписантов', () => {
        expect(toXml(Document1110346({...fixture,signers:[...fixture.signers,...fixture.signers]},meta)).match(/<Подписант /g)).toHaveLength(2)
    })
})
