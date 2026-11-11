import { describe, expect, it } from 'vitest'
import { Document1110344 } from '../src/docs/etrn/1110344'
import { formatNewDriver } from '../src/docs/etrn/1110344/data/11.6-NewDriver'
import { formatVehicleReplacement } from '../src/docs/etrn/1110344/data/11.7-VehicleReplacement'
import { etrn1110344Fixture as fixture } from './fixtures/etrn-replacement'
import { toXml } from '../src/helpers'
const meta={programTag:'TOS TEST'}
describe('ЭТрН 1110344: замена', () => {
    it('передаёт текст причины как элемент и сведения замены', () => {
        const xml=toXml(Document1110344(fixture,meta))
        expect(xml).toContain('ON_TRNZAMEN_')
        expect(xml).toContain('<ПричЗамТекст>Тестовое перераспределение транспорта</ПричЗамТекст>')
        expect(xml).toContain('СерВУ="7700"')
        expect(xml).toContain('РегНомер="А002АА77"')
    })
    it('поддерживает документ вместо текста причины', () => {
        const document=fixture.content.drivers![0].cargoTransferDocument!
        const xml=toXml(Document1110344({...fixture,content:{...fixture.content,reason:{document}}},meta))
        expect(xml).toContain('<ПричЗамДок ')
        expect(xml).not.toContain('ПричЗамТекст')
    })
    it('требует минимум одну замену', () => {
        expect(() => Document1110344({...fixture,content:{...fixture.content,drivers:[],vehicles:[]}},meta)).toThrow('замена')
    })
    it('проверяет исключающий выбор причины', () => {
        expect(() => Document1110344({...fixture,content:{...fixture.content,reason:{text:'Тест',document:fixture.content.drivers![0].cargoTransferDocument!} as never}},meta)).toThrow('одну причину')
    })
    it('требует серию ВУ без ИНН', () => {
        expect(() => formatNewDriver({...fixture.content.drivers![0].newDriver!,inn:undefined,driverLicenseSeries:undefined})).toThrow('серия')
    })
    it('требует телефон', () => expect(() => formatNewDriver({...fixture.content.drivers![0].newDriver!,phones:[]})).toThrow('телефон'))
    it('требует ТС или прицеп', () => expect(() => formatVehicleReplacement({})).toThrow('ТС или прицеп'))
})
