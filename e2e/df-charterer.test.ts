import { describe,expect,it } from 'vitest'
import { Document1110373,CharterFunction,AuthorityConfirmationMethod } from '../src/docs/df/1110373'
import { df1110373Fixture as fixture } from './fixtures/df-charterer'
import { toXml } from '../src/helpers'
const meta={programTag:'TOS TEST'}
describe('Договор фрахтования 1110373',()=>{
    it('сохраняет ФИАС, массу тары и иностранного составителя',()=>{
        const xml=toXml(Document1110373(fixture,meta))
        expect(xml).toContain('ON_DOGFRAKHTEL_');expect(xml).toContain('Функция="0"');expect(xml).toContain('<Регион>77</Регион>');expect(xml).toContain('<ГЛН>4600000000000</ГЛН>');expect(xml).toContain('МасТар="20.000"');expect(xml).toContain('ИдСтат="ИО"')
    })
    it('требует груз при грузовой функции',()=>expect(()=>Document1110373({...fixture,content:{...fixture.content,cargo:undefined}},meta)).toThrow('обязателен груз'))
    it('требует пассажирские признаки при пассажирской функции',()=>expect(()=>Document1110373({...fixture,documentFunction:CharterFunction.Passengers},meta)).toThrow('круг лиц'))
    it('сохраняет отрицательные пассажирские признаки без груза',()=>{
        const xml=toXml(Document1110373({...fixture,documentFunction:CharterFunction.Passengers,content:{...fixture.content,cargo:undefined,definedPassengerGroup:false,passengersAdmitted:false}},meta))
        expect(xml).toContain('Функция="1"');expect(xml).toContain('ПрвзЛиц="0"');expect(xml).not.toContain('<НаимГруз')
    })
    it('запрещает МЧД при другом способе полномочий',()=>expect(()=>Document1110373({...fixture,signer:{...fixture.signer,authorityConfirmationMethod:AuthorityConfirmationMethod.PaperPOA}},meta)).toThrow('СвДоверЭл'))
    it('требует основание стороннего составителя',()=>expect(()=>Document1110373({...fixture,compilerAuthority:undefined},meta)).toThrow('основание'))
})
