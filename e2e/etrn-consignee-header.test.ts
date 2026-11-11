import { describe, expect, it } from 'vitest'
import { Document1110341, ConsigneeSignerStatus } from '../src/docs/etrn/1110341'
import { formatConsigneeSignerStatus } from '../src/docs/etrn/1110341/consts'
import { etrn1110341Fixture } from './fixtures/etrn-2'
import { toXml } from '../src/helpers'

describe('ЭТрН Т3: заголовок и подписант', () => {
    it.each([
        [ConsigneeSignerStatus.ConsigneeWithoutPOA, '1'],
        [ConsigneeSignerStatus.ConsigneeElectronicPOA, '2'],
        [ConsigneeSignerStatus.ConsigneePaperPOA, '3'],
    ])('кодирует статус %s', (status, expected) => expect(formatConsigneeSignerStatus(status)).toBe(expected))
    it('разделяет дату и время и использует префикс грузополучателя', () => {
        const xml = toXml(Document1110341({ ...etrn1110341Fixture, createdAt: new Date(2026, 8, 10, 8, 30) }))
        expect(xml).toContain('ON_TRNACLGRPO_')
        expect(xml).toContain('ДатИнфГП="10.09.2026"')
        expect(xml).toContain('ВрИнфГП="08:30:00"')
        expect(xml).toContain('ПоФактХЖ="Транспортная накладная"')
        expect(xml).not.toContain('НалКоорТочВрИнфПрв')
    })
    it.each(['', ' ', 'x'.repeat(256)])('отклоняет неверное название', documentName => {
        expect(() => Document1110341({ ...etrn1110341Fixture, documentName })).toThrow('наименование')
    })
})
