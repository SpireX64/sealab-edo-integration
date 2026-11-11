import {describe,expect,it} from 'vitest'
import {Document1110487,VatRate} from '../src/docs/exp/1110487'
import {formatDriver,formatVehicle,formatService,formatPayment} from '../src/docs/exp/1110487/data/Content'
import {exp1110487Fixture as fixture} from './fixtures/exp-forwarder'
import {toXml} from '../src/helpers'
const meta={programTag:'TOS TEST'}
const service=fixture.content.services![0]!
describe('Согласование экспедитора 1110487',()=>{
 it('связывает клиента, услуги, НДС, ТС и ГАР без ограничения в три здания',()=>{
  const xml=toXml(Document1110487(fixture,meta));expect(xml).toContain('ИдФайлИнфКлнт="ON_POREXPKLT_TEST"');expect(xml).toContain('НалСт="22%"');expect(xml.match(/<Здание /g)).toHaveLength(4)
 })
 it('не придумывает необязательные услуги и НДС',()=>{
  const copy=structuredClone(fixture);delete copy.content.services
  expect(toXml(Document1110487(copy,meta))).not.toContain('ДопИнфЭксп')
  expect(formatPayment({amountIncludingVat:100,vatRate:VatRate.TaxAgent,currencyCode:'643',currencyName:'Российский рубль'}).СумНал).toBeUndefined()
 })
 it('требует исправление вместе с исходным файлом',()=>expect(()=>Document1110487({...fixture,content:{...fixture.content,originalFileId:'TEST'}},meta)).toThrow('вместе'))
 it('ограничивает третье лицо и данные автотранспорта',()=>{
  expect(()=>formatService({...service,executionMode:1})).toThrow('Третье лицо')
  expect(()=>formatVehicle({mode:4,registrationNumber:'А001АА77'})).toThrow('автомобильному')
  expect(()=>formatVehicle({mode:3,bodyType:'Фургон'})).toThrow('Кузов')
 })
 it('требует идентификацию водителя без вымышленных ВУ',()=>{
  const driver={fullName:{lastName:'Тестов',firstName:'Тест'},phones:['+70000000000']}
  expect(()=>formatDriver(driver)).toThrow('ВУ');expect(formatDriver({...driver,inn:'770000000000'}).НомВУ).toBeUndefined()
 })
 it('принимает только ставки формата и фактические суммы',()=>{
  expect(()=>formatPayment({...service.payment!,vatRate:'20%' as VatRate})).toThrow('Ставка')
  expect(()=>formatPayment({...service.payment!,amountIncludingVat:-1})).toThrow('неотрицательными')
  expect(formatPayment({...service.payment!,vatRate:VatRate.WithoutVat,vatAmount:'без НДС'}).СумНал).toEqual({БезНДС:['без НДС']})
 })
})
