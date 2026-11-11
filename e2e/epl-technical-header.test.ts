import { describe, expect, it } from 'vitest'
import { Document1110382 } from '../src/docs/epl/1110382'
import { epl1110382Fixture } from './fixtures/epl-3'
import { toXml } from '../src/helpers'

describe('ЭПЛ: формирование файла технического контроля', () => {
    it('берёт дату файла из метаданных, отдельно от даты осмотра', () => {
        const xml = toXml(Document1110382(epl1110382Fixture, { documentCreatedAt: new Date(2026, 8, 10, 12, 34, 56) }))
        expect(xml).toContain('ДатИнфТехСост="10.09.2026"')
        expect(xml).toContain('ВрИнфТехСост="12:34:56"')
        expect(xml).toContain('_20260910_')
    })
})
