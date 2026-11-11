import { describe, expect, it } from 'vitest'
import { Document1110384 } from '../src/docs/epl/1110384'
import { epl1110384Fixture } from './fixtures/epl-3'
import { toXml } from '../src/helpers'

describe('ЭПЛ: формирование файла заезда ТС', () => {
    it('берёт дату файла из метаданных, отдельно от даты заезда', () => {
        const xml = toXml(Document1110384(epl1110384Fixture, { documentCreatedAt: new Date(2026, 8, 10, 12, 34, 56) }))
        expect(xml).toContain('ДатИнфЗаезд="10.09.2026"')
        expect(xml).toContain('ВрИнфЗаезд="12:34:56"')
        expect(xml).toContain('_20260910_')
    })
})
