import { describe, expect, it } from 'vitest'
import { formatConsigneeNote, type TConsigneeNote } from '../src/docs/etrn/1110341/data/13.7-ConsigneeNote'

describe('ЭТрН: фактические отметки получателя', () => {
    it.each([undefined, '', ' ', 'x'.repeat(2001)])('отклоняет отсутствующее или недопустимое описание', circumstances => {
        // Проверяем также вызов из JS, который не проверяет обязательные TS-поля.
        const note = { notedAt: new Date('2026-09-08T12:00:00Z'), circumstances } as TConsigneeNote
        expect(() => formatConsigneeNote(note)).toThrow('фактических обстоятельств')
    })

    it.each(['Повреждена упаковка', 'просрочка доставки грузов'])('сохраняет переданное обстоятельство: %s', circumstances => {
        expect(formatConsigneeNote({ notedAt: new Date('2026-09-08T12:00:00Z'), circumstances })['ОбстОтмет']).toBe(circumstances)
    })
})
