import { describe, expect, it } from 'vitest'
import { Document1110361, DocumentFunction, IssuerType } from '../src/docs/ezz/1110361'
import { formatIssuerRequisites } from '../src/docs/ezz/1110361/data/5.17-IssuerRequisites'
import { toXml } from '../src/helpers'
import { ezzFixture } from './fixtures/ezz'

describe('ЭЗЗ: информация грузоотправителя', () => {
    it('формирует функцию и дату файла из переданных данных', () => {
        const xml = toXml(Document1110361({ ...ezzFixture, createdAt: new Date(2026, 8, 9, 12, 30) }))
        expect(xml).toContain('Функция="Заказ"')
        expect(xml).toContain('ДатИнфГО="09.09.2026"')
        expect(xml).toContain('ВрИнфГО="12:30:00"')
    })
    it('требует договор для заявки', () => {
        expect(() => Document1110361({ ...ezzFixture, documentFunction: DocumentFunction.Request, transportContract: undefined })).toThrow('договор')
    })
    it('отклоняет неизвестную функцию', () => {
        expect(() => Document1110361({ ...ezzFixture, documentFunction: undefined! })).toThrow('функция')
    })
    it.each([
        [{ issuerType: IssuerType.LegalEntity, inn: '7700000000' }, '<ИННЮЛ>7700000000</ИННЮЛ>'],
        [{ issuerType: IssuerType.Individual, inn: '770000000000' }, '<ИННФЛ>770000000000</ИННФЛ>'],
        [{ issuerType: IssuerType.ExecutiveAuthority, name: 'Тестовый орган' }, '<НаимОИВ>Тестовый орган</НаимОИВ>'],
    ] as const)('передает реквизиты составителя дочерними элементами', (input, expected) => {
        expect(toXml({ ИдРекСост: formatIssuerRequisites(input) })).toContain(expected)
    })
})
