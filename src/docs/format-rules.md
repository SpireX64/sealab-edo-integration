# Rules for Formatting TypeScript Types to XML

## 1. Naming Convention

### 1.1 Types
- **Format**: `T` + PascalCase English name (e.g., `TCargoDescription`, `TVehicleSpecs`)
- **Files**: One file per document subtype
- **Location**: `src/docs/`

### 1.2 Format Functions
- **Naming**: `format` + TypeName (e.g., `formatCargoDescription`, `formatVehicleSpecs`)
- **Signature**: `(data: TType)` → plain object with Russian XML tags
- **Placement**: Immediately after the type definition

### 1.3 Enums
- **String enums**: value = key (e.g., `Value = "Value"`)
- **Numeric enums**: integer values (e.g., `OptionA = 1`)
- **Mapper**: `format` + EnumName (e.g., `formatMyEnum`) for string enums that map to Russian text

### 1.4 Field Naming

Имена полей должны описывать **смысл значения**, а не его тип:

```ts
// ❌ Плохо: имя описывает тип, а не смысл
dateTime: Date        // какая дата?
string: string        // какая строка?
array: TItem[]        // какой массив?
number: number        // какое число?

// ✅ Хорошо: имя отражает смысл
createdAt: Date       // дата формирования
compilerName: string  // наименование составителя
items: TItem[]        // элементы
correctionNumber: number  // номер исправления
```

**Для полей типа `Date`** дополнительно:
- Одиночная дата-время события использует суффикс `At`: `createdAt`, `sentAt`, `signedAt`, `notedAt`
- Если событие уже описано составным префиксом, добавляется суффикс `DateTime`: `plannedArrivalDateTime`, `actualDepartureDateTime`

### 1.5 Imports

**Типы и runtime-сущности объединяются в одном импорте.** Если из одного модуля импортируется и тип, и функция — используется один `import` со встроенным `type`:

```ts
// ✅ Правильно: один импорт для типа и runtime
import { formatFoo, type TFoo } from './Foo'

// ✅ Правильно: import type когда импортируются ТОЛЬКО типы
import type { TFoo, TBar } from './types'

// ❌ Неправильно: два отдельных импорта из одного модуля
import { formatFoo } from './Foo'
import type { TFoo } from './Foo'
```

Это уменьшает размер блока импортов и использует `import type` по назначению — для гарантии что импорт будет удалён из скомпилированного JS.

### 1.6 XML Tags
- Russian tag names, matching the specification tables exactly
- Example: `"НаимГр"` — exact spec tag, not `"cargoName"`

---

## 2. Field Formatting by Type

### 2.1 `string`
Pass through as-is. Optional strings produce `undefined` in output (and thus absent in the final JSON/XML).

### 2.2 `number` → `string`
Numeric precision is specified as `(Число, X.Y)` in the spec, where:
- `X` = total integer digits
- `Y` = decimal digits

| Precision spec | Format | Notes |
|---|---|---|
| `(Число, K)` | `String(value)` | Integer only, no `.toFixed()` |
| `(Число, K.2)` | `value.toFixed(2)` | 2 decimal places |
| `(Число, K.3)` | `value.toFixed(3)` | 3 decimal places |
| `(Число, K.4)` | `value.toFixed(4)` | 4 decimal places |

**Pattern**: `data.field?.toFixed(N)` for optional, `data.field.toFixed(N)` for required.

### 2.3 `boolean` → `"0"` / `"1"` (со сдвигом)
Use `formatFlag(value, shift?)` from `helpers.ts`. Returns `undefined` if value is `undefined`.

```ts
// Standard: false→"0", true→"1"
"XmlTag": formatFlag(data.isSomething)

// With shift=1: false→"1", true→"2"
"XmlTag": formatFlag(data.isSomething, 1)
```

### 2.4 `Date`
| Format function | Output | When |
|---|---|---|
| `formatDate(date)` | `"DD.MM.YYYY"` | Date only |
| `formatTime(date)` | `"HH:MM:SS"` | Time only |
| `formatDateTimeUTC(date)` | `"DD.MM.YYYYTHH:MM:SS±HH:MM"` | DateTime with UTC offset |
| `formatDateTimeWithUtc(date)` | `{ dateTime: "…", utc: "0"\|"1" }` | DateTime + UTC flag pair |

### 2.4.1 Слияние даты и времени

Если спецификация содержит два отдельных XML-тега — дату и время одного и того же события (например, `<ДатИнфГО>` + `<ВрИнфГО>`) — в типе это **одно поле** `Date`, а в форматтере — два вызова `formatDate` и `formatTime` от одного значения:

```ts
// Тип: одно поле
dateTime: Date

// Форматтер: два XML-тега от одного Date
"ДатИнфГО": formatDate(data.dateTime),
"ВрИнфГО": formatTime(data.dateTime),
```

Критерии слияния:
- Оба поля относятся к одному и тому же событию/файлу
- В описании полей совпадает объект (например, «Дата формирования **файла обмена информации грузоотправителя**» и «Время формирования **файла обмена информации грузоотправителя**»)
- Поля всегда идут парой в XML

**Pattern for DateTime + UTC flag pairs:** use `formatDateTimeWithUtc` — it returns both values in one call, detecting UTC from the Date's timezone offset.
```ts
const dt = formatDateTimeWithUtc(data.someDateTime)
"ДатВр": dt.dateTime,
"НалКоорТочВр": dt.utc,
```

### 2.5 `Array<T>`
Empty arrays are not allowed — at least one element is required. Always use `mapArrayIfNotEmpty(arr, formatFn)`. It returns `undefined` for empty arrays (omitting the XML tag) and for `undefined` arrays.
```ts
// Universal pattern for all arrays:
"XmlArr": mapArrayIfNotEmpty(data.items, formatItem)
```

For required arrays where an empty array is a programming error, throw explicitly before formatting:
```ts
if (data.items.length === 0) {
    throw new TypeError("Требуется хотя бы один элемент")
}
"XmlArr": data.items.map(formatItem)
```

### 2.6 Nested Objects
Call the corresponding format function:
```ts
"XmlObj": formatMyType(data.nested)
```

For optional nested objects:
```ts
"XmlObj": data.nested && formatMyType(data.nested)
```

---

## 3. Optional Fields with Default Values

If the specification says "При отсутствии указывается XXX":
1. Field is `?:` (optional) in the type definition
2. Formatter uses `?? "default"`

```ts
// Type
someField?: string  // При отсутствии указывается "default value"

// Formatter
"XmlTag": data.someField ?? "default value"
```

---

## 4. Enums with Russian Text Mapping

### 4.1 String Enums (key = value)
```ts
export enum MyEnum {
    Value = "Value",
}

function formatMyEnum(value: MyEnum | string): string {
    switch (value) {
        case MyEnum.Value:
            return "Русский текст"
        default:
            return value  // free text fallback
    }
}
```

### 4.2 Numeric Enums
Passed to XML as number directly (no mapper needed unless spec requires string representation):
```ts
export enum MyNumEnum {
    Option1 = 1,
    Option2 = 2,
}
// "XmlTag": data.value  →  1 or 2
```

If the spec requires a string mapping for numeric enums, use a format function with `switch`.

---

## 5. Conditional Validation in Formatters

### 5.1 Mutually Required Fields
When field A is required if field B is absent (and vice versa):
```ts
if (!data.fieldA && !data.fieldB) {
    throw new TypeError("Требуется указать fieldA или fieldB")
}
```

When multiple fields must be provided together if an alternative is absent:
```ts
if (!data.id && (!data.name || !data.date)) {
    throw new TypeError("Требуется указать id или name + date")
}
```

### 5.2 Conditional Required
When a field is required only under a specific condition:
```ts
if (data.type === SomeEnum.SpecificValue && !data.extraDoc) {
    throw new TypeError("Требуется указать extraDoc при type = SpecificValue")
}
```

### 5.3 Consistency Checks
When two fields must be consistent with each other:
```ts
if (data.items.length !== data.expectedCount) {
    throw new TypeError("Количество элементов не совпадает с заявленным")
}
```

### 5.4 Forbidden Combinations
When a specific combination of values is not allowed:
```ts
for (const item of data.docs) {
    for (const detail of item.details) {
        if (detail.type === SomeEnum.ForbiddenType) {
            throw new TypeError("Тип ForbiddenType не может быть указан")
        }
    }
}
```

---

## 6. Discriminated Unions

### 6.1 Boolean Discriminator
```ts
export type TMyRoute =
    | { isTextFormat: true;  text: string }
    | { isTextFormat: false; binaryData: string }

function formatMyRoute(data: TMyRoute) {
    return data.isTextFormat
        ? { "ТекстФормат": data.text }
        : { "БинДанные": data.binaryData }
}
```

### 6.2 Enum Discriminator
```ts
export type TIdentification =
    | { type: EntityType.Legal; name: string; inn: string }
    | { type: EntityType.Person; name: string; passport: string }

function formatIdentification(data: TIdentification) {
    switch (data.type) {
        case EntityType.Legal:
            return { "ЮрЛицо": { "Наим": data.name, "ИНН": data.inn } }
        case EntityType.Person:
            return { "ФизЛицо": { "ФИО": data.name, "Паспорт": data.passport } }
    }
}
```

### 6.3 Runtime Discriminated (for union of structurally different types)
```ts
export type TAddress = TStructuredAddress | TFreeTextAddress | string

function formatAddress(address: TAddress) {
    if (typeof address === "string") {
        return { "Код": address }
    }
    if ("countryCode" in address) {
        return { "КодСтр": address.countryCode, "АдрТекст": address.addressText }
    }
    // TStructuredAddress
    return { "Индекс": address.postalCode /* ... */ }
}
```

---

## 7. Spread for Optional Sub-objects

When a sub-object may or may not be present, use a helper that returns `{}` for `undefined`:
```ts
function formatOptionalSub(data: TSubType | undefined) {
    if (!data) return {}
    return {
        "XmlTag1": data.field1,
        "XmlTag2": data.field2?.toFixed(2),
    }
}

// Usage: spread inline
"...formatOptionalSub(data.optionalField)"
```

---

## 8. Decomposition Rules

### 8.1 Parameter Destructuring
Types with **≤5 fields** may be destructured in the formatter's parameters:
```ts
// OK: 3 fields ≤ 5
function formatPerson({ firstName, lastName, age }: TPerson) {
    return { "Имя": firstName, "Фамилия": lastName, "Возраст": age }
}
```

Types with **>5 fields** must use `data.*` access:
```ts
// OK: Required — 8 fields > 5
function formatWaybill(data: TWaybill) {
    return {
        "Номер": data.number,
        "Дата": formatDate(data.date),
        // ...
    }
}
```

---

## 9. `class TODO {}`

A placeholder class `TODO` is defined in `src/docs/shared.ts`. Used as a marker for unfinished type references from specification tables not yet implemented.

```ts
import { TODO } from '../../../shared'

export type TSomeType = TODO
export function formatSomeType(_data: TSomeType) {
    return TODO
}
```

Replaced with the actual type when the corresponding spec table is added.

---

## 10. Общие типы (`common/`)

Типы, используемые более чем в одном документе, выносятся в `docs/etrn/common/`. Критерии выноса:

### 10.1 Условия совместимости

Типы считаются совпадающими **только при выполнении ВСЕХ** условий:

| Критерий | Пояснение |
|---|---|
| **Структура полей** | Одинаковый набор полей с теми же именами и типами (включая `?:`) |
| **XML-теги** | Одинаковые названия тегов в форматтере |
| **Требования к данным** | Совпадают ограничения на длину, точность, enum-значения |
| **Формат вывода** | Совпадает структура выходного объекта (плоский / с обёрткой) |
| **Смысл описаний** | Комментарии к полям не должны искажаться при слиянии |

### 10.2 Процедура

1. Создать файл `common/{Имя}.ts` с полной реализацией
2. В обоих документах заменить файлы в `data/` на реэкспорты
3. Потребители не должны менять пути импорта — `data/` сохраняет алиасы

### 10.3 Единое имя

Общий тип имеет одно каноническое имя, используемое всеми документами. Реэкспорт через `as` с переименованием **запрещён** — если сущность одна, то и имя одно.

```ts
// ✅ Правильно: один тип — одно имя
// common/PenaltyInfo.ts
export type TPenaltyInfo = { ... }

// data/5.22-PenaltyInfo.ts     — в 1110339
// data/7.7-PenaltyInfo.ts      — в 1110340
export { type TPenaltyInfo, formatPenaltyInfo } from '../../common/PenaltyInfo'
```

### 10.4 Обёртки на стороне потребителя

Если общий форматтер возвращает плоский объект, а одному из документов нужна обёртка (`{ "Обёртка": ... }`) — обёртка добавляется в точке вызова, а не в common:

```ts
// ✅ Правильно: обёртка в 5.35, не в common
case IssuerType.ForeignEntity:
    return { "СвИнНеУч": formatForeignEntityNotRegistered(data) }
```

### 10.5 Частичное совпадение

Если типы отличаются одним полем (например, `number` vs `string`) — они **разные** и не выносятся в common. Если структура совпадает, но один тип нуждается в дополнительном поле-дискриминаторе (`type: IssuerType.X`), используется intersection:

```ts
// data/5.27-ForeignEntityInfo.ts
export type TForeignEntityInfo = {
    type: IssuerType.ForeignEntity
} & TForeignEntityNotRegistered  // из common
```

### 10.6 Исключения из выноса

Не выносятся в common, даже при совпадении структуры:

- **Специфичные енумы документа** (`consts.ts` каждого документа)
- **Типы верхнего уровня документа** (`doc.ts`)
- **Агрегирующие типы** (объединяющие несколько таблиц одного документа, например `TIdentificationDetails`)

---

## 11. File Structure

Файлы документа организуются в папку согласно [doc-structure.md](./doc-structure.md).

Кратко:
- `docs/{тип}/{номер}/` — папка документа
- `index.ts` — публичное API (только типы, енумы, конструктор)
- `doc.ts` — конструктор документа
- `consts.ts` — енумы + мапперы
- `types.ts` — общие типы без номера таблицы (не импортирует из `data/`)
- `data/{таб}-{Имя}.ts` — тип + format-функция для каждой таблицы спецификации

Приватные детали (regexp, валидаторы) остаются без `export` в файле использования.

Каждый тип немедленно сопровождается своей `format*` функцией.
