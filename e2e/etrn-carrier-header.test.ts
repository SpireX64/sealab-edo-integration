import { describe, expect, it } from 'vitest'
import { Document1110340, CarrierSignerStatus } from '../src/docs/etrn/1110340'
import { formatCarrierSignerStatus } from '../src/docs/etrn/1110340/consts'
import { etrn1110340Fixture } from './fixtures/etrn-2'
import { toXml } from '../src/helpers'

describe('ЭТрН Т2: заголовок и подписант', () => {
    it.each([
        [CarrierSignerStatus.CarrierWithoutPOA, '1'],
        [CarrierSignerStatus.CarrierElectronicPOA, '2'],
        [CarrierSignerStatus.CarrierPaperPOA, '3'],
    ])('кодирует статус %s', (status, expected) => expect(formatCarrierSignerStatus(status)).toBe(expected))
    it('разделяет дату и время и использует префикс перевозчика', () => {
        const xml = toXml(Document1110340({ ...etrn1110340Fixture, documentDateTime: new Date(2026, 8, 10, 8, 30) }))
        expect(xml).toContain('ON_TRNACLPPRIN_')
        expect(xml).toContain('ДатИнфПрвПрием="10.09.2026"')
        expect(xml).toContain('ВрИнфПрвПрием="08:30:00"')
        expect(xml).toContain('ПоФактХЖ="Транспортная накладная"')
        expect(xml).not.toContain('НалКоорТочВрИнфПрв')
    })
    it.each(['', ' ', 'x'.repeat(256)])('отклоняет неверное название', documentName => {
        expect(() => Document1110340({ ...etrn1110340Fixture, documentName })).toThrow('наименование')
    })
})
