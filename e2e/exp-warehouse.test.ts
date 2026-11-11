import {describe,expect,it} from 'vitest'
import {Document1110490} from '../src/docs/exp/1110490'
import {formatParticipant} from '../src/docs/exp/1110490/data/Party'
import {formatCargoDescription} from '../src/docs/exp/1110490/data/Cargo'
import {exp1110490Fixture as fixture} from './fixtures/exp-warehouse'
import {toXml} from '../src/helpers'
const meta={programTag:'TOS TEST'}
describe('Складская расписка 1110490',()=>{
 it('сохраняет хранение, склад, страхование и атрибут иных контактов',()=>{
  const xml=toXml(Document1110490(fixture,meta));for(const t of ['ON_SKLADRASP_','<УслПриемГр ','<СведСклад ','<СвСтрах ','ИнКонт="Тестовый контакт"','ЗагрКонтейн="1"']) expect(xml).toContain(t)
  expect(xml).not.toContain('<ИнКонт>');expect(xml).not.toContain('ВозмУкСтГруз');expect(xml).not.toContain('ПредКонтейн=')
 })
 it('требует стороннего владельца склада',()=>{
  const f=structuredClone(fixture);delete f.content.warehouse.owner;expect(()=>Document1110490(f,meta)).toThrow('владельце')
 })
 it('требует полномочия лица, принявшего на хранение',()=>{
  const f=structuredClone(fixture);delete f.content.consignment.acceptances[0]!.authority;expect(()=>Document1110490(f,meta)).toThrow('полномочия')
 })
 it('требует ИНН вместе с иными сведениями при отсутствии ФИО',()=>{
  expect(()=>formatParticipant({identification:{kind:'individual',individual:{otherDetails:'Тест'}}})).toThrow('ИНН')
  expect(formatParticipant({identification:{kind:'individual',individual:{inn:'770000000000',otherDetails:'Тест'}}}).ИдСв).toHaveProperty('СвФЛУч')
 })
 it('соблюдает предел количества мест и отсутствие выдуманного хранения',()=>{
  const cargo=fixture.content.consignment.cargo[0]!
  expect(()=>formatCargoDescription({...cargo,packageCount:10000000})).toThrow('семью')
  const f=structuredClone(fixture);f.content.consignment.acceptances=[];expect(()=>Document1110490(f,meta)).toThrow('приёмка')
 })
 it('не смешивает объявленную и действительную стоимость',()=>{
  const f=structuredClone(fixture);f.content.consignment.actualValue=f.content.consignment.declaredValue;expect(()=>Document1110490(f,meta)).toThrow('один вид')
 })
})
