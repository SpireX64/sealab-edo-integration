import { describe, expect, it } from 'vitest'
import { Document1110343, READDRESSING_NOTIFICATION_DELIVERY_METHOD } from '../src/docs/etrn/1110343'
import { etrn1110343Fixture as fixture } from './fixtures/etrn-readdressing'
import { toXml } from '../src/helpers'
const meta={programTag:'TOS TEST'}
describe('ЭТрН 1110343: переадресовка', () => {
    it('формирует новое место и сведения получателя', () => {
        const xml=toXml(Document1110343(fixture,meta))
        expect(xml).toContain('ON_TRNPEREADR_')
        expect(xml).toContain('ФормаПА="Электронная"')
        expect(xml).toContain(`ВидДост="${READDRESSING_NOTIFICATION_DELIVERY_METHOD}"`)
        expect(xml).toContain('НомерИспр="1"')
        expect(xml).toContain('<НовГрузПол>')
        expect(xml).toContain('<ГЛН>0000000000000</ГЛН>')
        expect(xml).toContain('ИдФайлПрвПрием="ON_TRNACLPPRIN_TEST"')
    })
    it('разрешает несколько подписантов', () => {
        const xml=toXml(Document1110343({...fixture,signers:[...fixture.signers,...fixture.signers]},meta))
        expect(xml.match(/<Подписант /g)).toHaveLength(2)
    })
    it.each([
        '', 'Устно', 'Электронное уведомление о переадресовке', 'x'.repeat(50), 'x'.repeat(51),
        ` ${READDRESSING_NOTIFICATION_DELIVERY_METHOD}`, `${READDRESSING_NOTIFICATION_DELIVERY_METHOD} `,
        `«${READDRESSING_NOTIFICATION_DELIVERY_METHOD}»`, READDRESSING_NOTIFICATION_DELIVERY_METHOD.toLowerCase(),
    ])('отклоняет иной ВидДост без исправления или сокращения: %s', value => {
        // Deliberately bypass the literal type to check callers supplying untyped input.
        const notificationDeliveryMethod = value as typeof READDRESSING_NOTIFICATION_DELIVERY_METHOD
        expect(() => Document1110343({...fixture,content:{...fixture.content,notificationDeliveryMethod}},meta)).toThrow('ВидДост должен точно совпадать')
    })
    it('фиксирует ожидаемый конфликт ВидДост с original XSD maxLength=50, а не XSD PASS', () => {
        // ON_TRNPEREADR_1_973_03_05_01_01.xsd remains unchanged.
        // This is the approved field exception; XML generation is not XSD validation.
        const originalXsdMaximumLength = 50
        expect(READDRESSING_NOTIFICATION_DELIVERY_METHOD).toBe('Электронное уведомление перевозчика о переадресовке')
        expect(READDRESSING_NOTIFICATION_DELIVERY_METHOD).toHaveLength(51)
        expect(READDRESSING_NOTIFICATION_DELIVERY_METHOD.length).toBeGreaterThan(originalXsdMaximumLength)
        const xml = toXml(Document1110343(fixture, meta))
        expect(xml.match(/ВидДост="([^"]*)"/)?.[1]).toBe(READDRESSING_NOTIFICATION_DELIVERY_METHOD)
    })
    it('требует подписанта' , () => expect(() => Document1110343({...fixture,signers:[]},meta)).toThrow('подписанты'))
    it('требует подтверждённое получение указания', () => {
        expect(() => Document1110343({...fixture,content:{...fixture.content,instructionReceived:undefined!}},meta)).toThrow('получение указания')
    })
    it('требует обязательный адрес нового получателя', () => {
        expect(() => Document1110343({...fixture,content:{...fixture.content,newConsignee:{...fixture.content.newConsignee!,address:undefined!}}},meta)).toThrow('адрес')
    })
    it('разрешает сохранить получателя без передачи пустого блока', () => {
        const xml=toXml(Document1110343({...fixture,content:{...fixture.content,newConsignee:undefined}},meta))
        expect(xml).not.toContain('НовГрузПол')
    })
})
