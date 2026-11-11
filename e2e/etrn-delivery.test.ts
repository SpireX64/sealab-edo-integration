import { describe, expect, it } from 'vitest'
import { Document1110342 } from '../src/docs/etrn/1110342'
import { etrn1110342Fixture as fixture } from './fixtures/etrn-delivery'
import { formatDocumentRequisites } from '../src/docs/etrn/common/DocumentRequisites'
import { toXml } from '../src/helpers'
const meta = {programTag:'TOS TEST'}
describe('ЭТрН 1110342: выдача груза', () => {
    it('передаёт дополнительные сведения и нулевой штраф', () => {
        const xml = toXml(Document1110342(fixture,meta))
        expect(xml).toContain('ON_TRNACLPVYN_')
        expect(xml.indexOf('<ИдПолИной>')).toBeLessThan(xml.indexOf('<Документ '))
        expect(xml).toContain('ИдФайлИнфГП="ON_TRNACLGRPO_TEST"')
        expect(xml).toContain('ЗамДатаВрПриб=')
        expect(xml).toContain('НалКоорТочВрПр=')
        expect(xml).toContain('ИтогРазмШтрРФ="0.00"')
        expect(xml).toContain('<ИННЮЛ>7700000000</ИННЮЛ>')
    })
    it('не подтверждает выдачу без фактических данных', () => {
        expect(() => Document1110342({...fixture,carrierInfo:{...fixture.carrierInfo,delivered:undefined!}},meta)).toThrow('фактическая выдача')
    })
    it.each(['a','x'.repeat(47)])('ограничивает идентификатор получателя', id => {
        expect(() => Document1110342({...fixture,otherRecipientIds:[id]},meta)).toThrow('4–46')
    })
    it('не создаёт выдуманный номер акта', () => {
        const act=fixture.carrierInfo.notes![0].commercialActs![0]
        const xml=toXml({Акт:formatDocumentRequisites({...act,documentNumber:undefined})})
        expect(xml).not.toContain('НомерДок=')
        expect(xml).not.toContain('Без номера')
    })
    it('требует реквизиты составителя акта', () => {
        expect(() => formatDocumentRequisites({id:'TEST',issuerRequisites:[]})).toThrow('составителей')
    })
    it('требует МЧД при статусе 2 без системы хранения', () => {
        expect(() => Document1110342({...fixture,signer:{...fixture.signer,powerOfAttorney:undefined}},meta)).toThrow('доверенности')
    })
})
