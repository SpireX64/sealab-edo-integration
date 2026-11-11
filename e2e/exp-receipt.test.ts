import {describe,expect,it} from 'vitest'
import {Document1110489} from '../src/docs/exp/1110489'
import {formatContainer,formatCargoDescription} from '../src/docs/exp/1110489/data/Cargo'
import {exp1110489Fixture as fixture} from './fixtures/exp-receipt'
import {toXml} from '../src/helpers'
const meta={programTag:'TOS TEST'}
describe('Экспедиторская расписка 1110489',()=>{
 it('сохраняет приёмку, груз, контейнер и полномочия',()=>{
  const xml=toXml(Document1110489(fixture,meta));for(const t of ['ON_EXPRASP_','<УслПрием','<ОбязЭксп>','<СвЛицПриемГр ','<ОснДовПриемГр','<СвЛицПогрГр']) expect(xml).toContain(t)
  expect(xml).not.toContain('ЗапрПерегруз');expect(xml).not.toContain('ИспКонтейн=')
 })
 it('требует стоимость согласно признаку',()=>{
  const f=structuredClone(fixture);delete f.content.declaredValue;expect(()=>Document1110489(f,meta)).toThrow('Стоимость')
  f.content.valueAvailable=false;expect(toXml(Document1110489(f,meta))).toContain('ВозмУкОбщСтГруз="0"')
  const cargo=fixture.content.consignments[0]!.cargo[0]!;expect(()=>formatCargoDescription({...cargo,valueAvailable:false})).toThrow('Стоимость')
 })
 it('требует полномочия приёмщика и перевозчика-погрузчика',()=>{
  const f=structuredClone(fixture);delete f.content.acceptanceAuthority;expect(()=>Document1110489(f,meta)).toThrow('полномочия')
  const g=structuredClone(fixture);delete g.content.loadingPerson!.authority;expect(()=>Document1110489(g,meta)).toThrow('основание')
 })
 it('требует сведения о владельце либо причину их отсутствия',()=>{
  expect(()=>Document1110489({...fixture,content:{...fixture.content,infrastructure:{owner:2}}},meta)).toThrow('владелец')
  expect(()=>Document1110489({...fixture,content:{...fixture.content,infrastructure:{owner:3}}},meta)).toThrow('причина')
 })
 it('не переносит обязательность веса тары контейнера из поручения',()=>expect(formatContainer({sequenceNumber:1,provider:1}).ВесТара).toBeUndefined())
 it('требует исходный файл и УИД при исправлении',()=>{
  const f=structuredClone(fixture);f.content.correction={previousFileId:'TEST_PREVIOUS',number:1,issuedAt:new Date('2026-09-11Z')};expect(()=>Document1110489(f,meta)).toThrow('исходный')
 })
})
