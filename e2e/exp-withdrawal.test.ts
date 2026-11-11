import {describe,expect,it} from 'vitest'
import {Document1110488} from '../src/docs/exp/1110488'
import {exp1110488Fixture as fixture} from './fixtures/exp-withdrawal'
import {toXml} from '../src/helpers'
const meta={programTag:'TOS TEST'}
describe('Отзыв поручения 1110488',()=>{
 it('связывает исходное поручение и сохраняет нулевые расходы и возврат',()=>{
  const xml=toXml(Document1110488(fixture,meta));for(const t of ['ON_POREXPOTZ_','ИдФайлИнфКлнт="ON_POREXPKLT_TEST"','СумФактРасх="0.00"','ВремяПрИсп="11:00:00+03:00"','<СвВозврГруз']) expect(xml).toContain(t)
 })
 it('не подставляет расходы и возврат без фактов',()=>{
  const f=structuredClone(fixture);delete f.content.actualExpenses;delete f.content.cargoReturn
  const xml=toXml(Document1110488(f,meta));expect(xml).not.toContain('СумФактРасх');expect(xml).not.toContain('СвВозврГруз')
 })
 it('проверяет временную зону',()=>expect(()=>Document1110488({...fixture,content:{...fixture.content,stoppedTime:'11:00:00'}},meta)).toThrow('формат'))
 it('связывает исправление с оригиналом',()=>{
  const correction={previousFileId:'TEST_PREVIOUS',number:1,issuedAt:new Date('2026-09-10Z')}
  expect(()=>Document1110488({...fixture,content:{...fixture.content,correction}},meta)).toThrow('вместе')
  expect(toXml(Document1110488({...fixture,content:{...fixture.content,correction,originalFileId:'TEST_ORIGINAL'}},meta))).toContain('ИдПредФайлИспр="TEST_PREVIOUS"')
 })
})
