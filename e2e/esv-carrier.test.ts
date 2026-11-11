import { describe, expect, it } from 'vitest'
import { Document1110347 } from '../src/docs/esv/1110347'
import { esv1110347Fixture as fixture } from './fixtures/esv-carrier'
import { formatCorrection } from '../src/docs/esv/1110347/data/Content'
import { formatResponsiblePerson } from '../src/docs/esv/1110347/data/Party'
import { formatVehicle } from '../src/docs/esv/1110347/data/Transport'
import { VehicleOwnershipType } from '../src/docs/esv/1110347/consts'
import { toXml } from '../src/helpers'
const meta={programTag:'TOS TEST'}
describe('ЭСВ 1110347',()=>{
    it('передаёт контейнеры, путевые листы и фактические времена',()=>{
        const xml=toXml(Document1110347(fixture,meta))
        expect(xml).toContain('ON_SOPVEDPER_')
        expect(xml).toMatch(/ВрИнфПрв="\d{2}\.\d{2}\.\d{2}"/)
        expect(xml).toContain('<НомКонтейн>TEST0000001</НомКонтейн>')
        expect(xml).toContain('ПрТаблПломб="1"')
        expect(xml).toContain('НомерДовер="МЧД-001"')
        expect(xml).toContain('НомерПЛ="TEST-PL-001"')
    })
    it('не разрешает пустой список контейнеров',()=>expect(()=>Document1110347({...fixture,content:{...fixture.content,containers:[]}},meta)).toThrow('контейнеры'))
    it('требует адрес ответственного за погрузку',()=>expect(()=>formatResponsiblePerson(fixture.content.carrier.responsible,true)).toThrow('места жительства'))
    it('запрещает адрес ответственного за приём',()=>expect(()=>formatResponsiblePerson({...fixture.content.carrier.responsible,residenceAddress:'00000000-0000-4000-8000-000000000001'},false)).toThrow('запрещён'))
    it('исправление выбирает ФИО либо иные реквизиты',()=>{
        expect(formatCorrection({number:1,date:fixture.createdAt,otherPersonRequisites:['ИНН тестового составителя']})['ФИОЛиц']).toBeUndefined()
        expect(()=>formatCorrection({number:1,date:fixture.createdAt,persons:[]})).toThrow('один способ')
    })
    it('требует основание аренды',()=>expect(()=>formatVehicle({...fixture.content.vehicles.vehicle,ownershipType:VehicleOwnershipType.Lease})).toThrow('основание'))
    it('требует доверенность подписанта',()=>expect(()=>Document1110347({...fixture,signer:{...fixture.signer,powerOfAttorney:undefined}},meta)).toThrow('доверенности'))
})
