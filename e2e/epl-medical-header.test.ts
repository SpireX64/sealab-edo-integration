import { describe, expect, it } from 'vitest'
import { Document1110381 } from '../src/docs/epl/1110381'
import { epl1110381Fixture } from './fixtures/epl-2'
import { toXml } from '../src/helpers'

describe('ЭПЛ: формирование файла предрейсового осмотра', () => {
    it('берёт дату файла из метаданных, отдельно от даты осмотра', () => {
        const xml = toXml(Document1110381(epl1110381Fixture, { documentCreatedAt: new Date(2026, 8, 10, 12, 34, 56) }))
        expect(xml).toContain('ДатИнфМО="10.09.2026"')
        expect(xml).toContain('ВрИнфМО="12:34:56"')
        expect(xml).toContain('_20260910_')
    })
})
