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

// Конвертеры (мапперы) — приводят сформированные конструкторами вложения
// к семантическим ключам, принимаемым `СБИС.СгенерироватьВложение`.
export { mapDocument1110339 } from './etrn/1110339/mapper'
export { mapDocument1110361 } from './ezz/1110361/mapper'
export { mapDocument1110362 } from './ezz/1110362/mapper'
export { mapDocument1110380 } from './epl/1110380/mapper'
export { mapDocument1110381 } from './epl/1110381/mapper'
export { mapDocument1110382 } from './epl/1110382/mapper'
export { mapDocument1110383 } from './epl/1110383/mapper'
export { mapDocument1110384 } from './epl/1110384/mapper'
