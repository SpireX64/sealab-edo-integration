import { describe, expect, it } from 'vitest'
import { Document1110383 } from '../src/docs/epl/1110383'
import { epl1110383Fixture } from './fixtures/epl-3'
import { toXml } from '../src/helpers'

describe('ЭПЛ: формирование файла выезда ТС', () => {
    it('берёт дату файла из метаданных, отдельно от даты выезда', () => {
        const xml = toXml(Document1110383(epl1110383Fixture, { documentCreatedAt: new Date(2026, 8, 10, 12, 34, 56) }))
        expect(xml).toContain('ДатИнфВыезд="10.09.2026"')
        expect(xml).toContain('ВрИнфВыезд="12:34:56"')
        expect(xml).toContain('_20260910_')
    })
})
