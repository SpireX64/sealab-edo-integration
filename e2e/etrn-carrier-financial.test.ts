import { describe, expect, it } from 'vitest'
import { Document1110345, TaxRate } from '../src/docs/etrn/1110345'
import { formatTaxRate } from '../src/docs/etrn/1110345/consts'
import { etrn1110345Fixture as fixture } from './fixtures/etrn-carrier-financial'
import { toXml } from '../src/helpers'
const meta={programTag:'TOS TEST'}
describe('ЭТрН 1110345: финансовый титул перевозчика', () => {
    it('сохраняет фактические суммы и актуальную ставку', () => {
        const xml=toXml(Document1110345(fixture,meta))
        expect(xml).toContain('НалСт="22%"')
        expect(xml).toContain('<СумНДС>2200.00</СумНДС>')
        expect(xml).toContain('СтТовУчНал="12200.00"')
        expect(xml).toContain('БИК="044525000"')
        expect(xml).toContain('ИдФайлПрвВыд="ON_TRNACLPVYN_TEST"')
    })
    it('набор ставок равен последней XSD', () => {
        expect(Object.values(TaxRate).map(formatTaxRate).sort()).toEqual(['0%','5%','7%','9,09%','10%','16,67%','18,03%','20%','22%','5/105','7/107','10/110','20/120','22/122','без НДС','НДС исчисляется налоговым агентом'].sort())
    })
    it('без НДС оформляется явно, а не числовым нулём', () => {
        const xml=toXml(Document1110345({...fixture,content:{...fixture.content,taxRate:TaxRate.WithoutVAT,tax:{withoutVat:true},amountWithVat:10000}},meta))
        expect(xml).toContain('<БезНДС>без НДС</БезНДС>')
        expect(xml).not.toContain('СумНДС')
    })
    it('не выдумывает сумму налога налогового агента', () => {
        expect(() => Document1110345({...fixture,content:{...fixture.content,taxRate:TaxRate.VatCalculatedByTaxAgent,tax:undefined!}},meta)).toThrow('фактическую сумму')
    })
    it('требует основание стороннего составителя', () => {
        expect(() => Document1110345({...fixture,compilerAuthority:undefined},meta)).toThrow('документ-основание')
    })
    it('разрешает неизвестный необязательный итог без его подстановки', () => {
        expect(toXml(Document1110345({...fixture,content:{...fixture.content,amountWithVat:undefined}},meta))).not.toContain('СтТовУчНал=')
    })
})
