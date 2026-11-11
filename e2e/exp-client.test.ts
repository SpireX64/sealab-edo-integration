import {describe,expect,it} from 'vitest'
import {Document1110486} from '../src/docs/exp/1110486'
import {formatCargoDescription} from '../src/docs/exp/1110486/data/Cargo'
import {formatContainer} from '../src/docs/exp/1110486/data/Container'
import {formatConsignment} from '../src/docs/exp/1110486/data/Consignment'
import {formatRussianAddressInfo} from '../src/docs/exp/1110486/data/Address'
import {exp1110486Fixture as fixture} from './fixtures/exp-client'
import {toXml} from '../src/helpers'
const meta={programTag:'TOS TEST'}
const consignment=fixture.content.consignments[0]!
const cargo=consignment.cargo[0]!
describe('Поручение клиента 1110486',()=>{
 it('сохраняет партии, контейнер, страхование, услуги, документы и МЧД',()=>{
  const xml=toXml(Document1110486(fixture,meta))
  for(const text of ['ON_POREXPKLT_','<СвГруз','<СвКонтейн','<СвСтрах','<СвУсл','<РеквЗаявТранс','ВнНомДовер="TEST-MCHD"','<ИдПолИной>TEST_OTHER</ИдПолИной>']) expect(xml).toContain(text)
  expect(xml.indexOf('<ИдПолИной>')).toBeLessThan(xml.indexOf('<Документ'))
 })
 it('не допускает одновременные виды стоимости',()=>{
  expect(()=>Document1110486({...fixture,content:{...fixture.content,actualValue:fixture.content.declaredValue}},meta)).toThrow('либо')
  expect(()=>formatConsignment({...consignment,actualValue:consignment.declaredValue})).toThrow('либо')
  expect(()=>formatCargoDescription({...cargo,actualValue:cargo.declaredValue})).toThrow('либо')
 })
 it('связывает исправление с оригиналом и УИД',()=>{
  const correction={previousFileId:'TEST_PREVIOUS',number:1,issuedAt:new Date('2026-09-10Z')}
  expect(()=>Document1110486({...fixture,content:{...fixture.content,correction}},meta)).toThrow('исходный')
  expect(toXml(Document1110486({...fixture,content:{...fixture.content,correction,originalFileId:'TEST_ORIGINAL'}},meta))).toContain('ИдИсхФайл="TEST_ORIGINAL"')
  expect(()=>Document1110486({...fixture,content:{...fixture.content,originalFileId:'TEST_ORIGINAL'}},meta)).toThrow('только')
 })
 it('проверяет признаки сопроводительных документов и уведомлений',()=>{
  expect(()=>Document1110486({...fixture,content:{...fixture.content,accompanyingDocuments:[]}},meta)).toThrow('ДокГруз')
  expect(()=>formatConsignment({...consignment,notifications:[]})).toThrow('уведомления')
 })
 it('проверяет условные сведения опасного груза, упаковки, ГИС и ТН ВЭД',()=>{
  for(const change of [{dangerous:true},{packaging:[]},{stateRegistration:1},{commodityCode:undefined},{volume:undefined}]) expect(()=>formatCargoDescription({...cargo,...change})).toThrow()
 })
 it('проверяет контейнеры и пломбы',()=>{
  expect(()=>formatConsignment({...consignment,containers:[]})).toThrow('Контейнеры')
  const container=consignment.containers![0]!
  expect(()=>formatContainer({...container,tareWeightKg:undefined})).toThrow('тары')
  expect(()=>formatContainer({...container,sealNumbers:[]})).toThrow('пломб')
  expect(()=>formatContainer({...container,nonstandardId:'TEST'})).toThrow('один')
 })
 it('не заменяет отсутствующие груз и сведения об адресе',()=>{
  expect(()=>formatConsignment({...consignment,cargo:[]})).toThrow('груз')
  expect(()=>formatRussianAddressInfo({regionCode:'77',regionName:'Москва',city:'Москва'})).toThrow('иные сведения')
 })
 it('требует основание составителя и обязательные реквизиты МЧД',()=>{
  expect(()=>Document1110486({...fixture,compilerAuthority:undefined},meta)).toThrow('основание')
  expect(()=>Document1110486({...fixture,signer:{...fixture.signer,electronicPOAs:[{...fixture.signer.electronicPOAs![0]!,internalNumber:''}]}},meta)).toThrow('внутренний номер')
 })
})
