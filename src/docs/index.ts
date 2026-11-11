/**
 * Баррель всех документов.
 *
 * Конструкторы документов (`Document*`) и типы документов (`TDocument*`)
 * доступны напрямую. Типы таблиц и енумы — через пространства имён
 * по номеру документа (имена табличных типов пересекаются между документами).
 *
 * @example
 * import { Document1110380, EPL1110380 } from 'saby-tms-client'
 *
 * const doc = Document1110380({ ... })
 * const content: EPL1110380.TWaybillContent = { ... }
 */

// ЭТрН
export { Document111339 } from './etrn/1110339'
export type { TDocument111339 } from './etrn/1110339'
export * as ETRN1110339 from './etrn/1110339'

export { Document1110340 } from './etrn/1110340'
export type { TDocument1110340 } from './etrn/1110340'
export * as ETRN1110340 from './etrn/1110340'

export { Document1110341 } from './etrn/1110341'
export type { TDocument1110341 } from './etrn/1110341'
export * as ETRN1110341 from './etrn/1110341'

// ЭЗЗ
export { Document1110361 } from './ezz/1110361'
export type { TDocument1110361 } from './ezz/1110361'
export * as EZZ1110361 from './ezz/1110361'

export { Document1110362 } from './ezz/1110362'
export type { TDocument1110362 } from './ezz/1110362'
export * as EZZ1110362 from './ezz/1110362'

// ЭПЛ
export { Document1110380 } from './epl/1110380'
export type { TDocument1110380 } from './epl/1110380'
export * as EPL1110380 from './epl/1110380'

export { Document1110381 } from './epl/1110381'
export type { TDocument1110381 } from './epl/1110381'
export * as EPL1110381 from './epl/1110381'

export { Document1110382 } from './epl/1110382'
export type { TDocument1110382 } from './epl/1110382'
export * as EPL1110382 from './epl/1110382'

export { Document1110383 } from './epl/1110383'
export type { TDocument1110383 } from './epl/1110383'
export * as EPL1110383 from './epl/1110383'

export { Document1110384 } from './epl/1110384'
export type { TDocument1110384 } from './epl/1110384'
export * as EPL1110384 from './epl/1110384'

// Метаданные формирования XML-файла обмена (конструкторы `Document*`).
export type { TFileXmlMeta } from './shared'

// Фабрика готового тела документа (имя файла + base64 + Тип/Регламент) из XmlNode.
export { toAttachment } from './shared'
export type { TReadyAttachment } from './shared'

export { Document1110385 } from './epl/1110385'
export type { TDocument1110385 } from './epl/1110385'
export * as EPL1110385 from './epl/1110385'

export { Document1110342 } from './etrn/1110342'
export type { TDocument1110342 } from './etrn/1110342'
export * as ETRN1110342 from './etrn/1110342'

export { Document1110343, type TDocument1110343 } from './etrn/1110343'
export * as ETRN1110343 from './etrn/1110343'

export { Document1110344, type TDocument1110344 } from './etrn/1110344'
export * as ETRN1110344 from './etrn/1110344'

export { Document1110345, type TDocument1110345 } from './etrn/1110345'
export * as ETRN1110345 from './etrn/1110345'

export { Document1110346, type TDocument1110346 } from './etrn/1110346'
export * as ETRN1110346 from './etrn/1110346'

export { Document1110347, type TDocument1110347 } from './esv/1110347'
export * as ESV1110347 from './esv/1110347'

export { Document1110348, type TDocument1110348 } from './esv/1110348'
export * as ESV1110348 from './esv/1110348'

export { Document1110349, type TDocument1110349 } from './esv/1110349'
export * as ESV1110349 from './esv/1110349'

export { Document1110350, type TDocument1110350 } from './zn/1110350'
export * as ZN1110350 from './zn/1110350'

export { Document1110351,type TDocument1110351 } from './zn/1110351'
export * as ZN1110351 from './zn/1110351'

export { Document1110352,type TDocument1110352 } from './zn/1110352'
export * as ZN1110352 from './zn/1110352'

export { Document1110353,type TDocument1110353 } from './zn/1110353'
export * as ZN1110353 from './zn/1110353'

export { Document1110373,type TDocument1110373 } from './df/1110373'
export * as DF1110373 from './df/1110373'

export { Document1110374,type TDocument1110374 } from './df/1110374'
export * as DF1110374 from './df/1110374'

export { Document1110486,type TDocument1110486 } from './exp/1110486'
export * as EXP1110486 from './exp/1110486'

export { Document1110487,type TDocument1110487 } from './exp/1110487'
export * as EXP1110487 from './exp/1110487'

export { Document1110488,type TDocument1110488 } from './exp/1110488'
export * as EXP1110488 from './exp/1110488'

export { Document1110489,type TDocument1110489 } from './exp/1110489'
export * as EXP1110489 from './exp/1110489'

export { Document1110490,type TDocument1110490 } from './exp/1110490'
export * as EXP1110490 from './exp/1110490'
