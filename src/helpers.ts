import XMLBuilder from "fast-xml-builder";
import iconv from "iconv-lite";

function padZero2(v: string | number): string {
    return v.toString().padStart(2, '0')
}

/**
 * Кодирует строку в windows-1251 (CP1251) и возвращает байты.
 *
 * Файлы обмена ФНС (ГИС ЭПД) должны передаваться в кодировке windows-1251 —
 * именно её требует сервер при загрузке `Вложение.Файл.ДвоичныеДанные`.
 *
 * @example encodeWindows1251(xml).toString("base64")
 */
export function encodeWindows1251(text: string): Buffer {
    return iconv.encode(text, "win1251");
}

/**
 * Сериализует XML-строку в windows-1251 и сразу кодирует в base64 —
 * готовое значение для `Вложение.Файл.ДвоичныеДанные`.
 *
 * @example toBase64Xml(toXml(node))
 */
export function toBase64Xml(xml: string): string {
    return encodeWindows1251(xml).toString("base64");
}

/** Представление даты в виде строки "ДД.ММ.ГГГГ" */
export function formatDate(date: Date) {
    const dd = padZero2(date.getDate());
    const mm = padZero2(date.getMonth() + 1);
    const yyyy = date.getFullYear();
    return [dd, mm, yyyy].join('.')
}

export function formatTime(date: Date) {
    const hh = padZero2(date.getHours());
    const mm = padZero2(date.getMinutes());
    const ss = padZero2(date.getSeconds());
    return [hh, mm, ss].join(':');
}

/**
 * Форматирует дату/время в виде строки "ДД.ММ.ГГГГ ЧЧ:ММ:СС".
 * Используется для полей вида «ПериодС» / «ПериодПо» (доверие подписи).
 */
export function formatDateTime(date: Date): string {
    return `${formatDate(date)} ${formatTime(date)}`;
}

export function mapArrayIfNotEmpty<T, R>(
    arr: readonly T[] | undefined,
    mapItem: (item: T) => R,
): R[] | undefined {
    return arr && arr.length > 0
        ? arr.map(it => mapItem(it))
        : undefined
}

/**
 * Форматирует булево значение в строку "0" или "1" (со сдвигом).
 * Если передан undefined — возвращает undefined.
 *
 * @param value - Булево значение.
 * @param shift - Сдвиг результата. По умолчанию 0: false→"0", true→"1".
 *                При shift=1: false→"1", true→"2".
 *
 * @example formatFlag(true) → "1", formatFlag(false) → "0", formatFlag(undefined) → undefined
 * @example formatFlag(true, 1) → "2", formatFlag(false, 1) → "1"
 */
export function formatFlag(value: boolean | undefined, shift: number = 0): string | undefined {
    return value != null ? String(Number(value) + shift) : undefined
}

/**
 * Форматирует дату/время в формате ISO с UTC-смещением:
 * ДД.ММ.ГГГГТЧЧ:ММ:СС±ЧЧ:ММ
 * @example formatDateTimeUTC(new Date()) → "01.08.2026T14:30:00+03:00"
 */
export function formatDateTimeUTC(date: Date): string {
    const dd = padZero2(date.getDate())
    const mm = padZero2(date.getMonth() + 1)
    const yyyy = date.getFullYear()
    const hh = padZero2(date.getHours())
    const min = padZero2(date.getMinutes())
    const ss = padZero2(date.getSeconds())

    const tzOffset = -date.getTimezoneOffset()
    const tzSign = tzOffset >= 0 ? '+' : '-'
    const tzAbs = Math.abs(tzOffset)
    const tzH = padZero2(Math.floor(tzAbs / 60))
    const tzM = padZero2(tzAbs % 60)

    return `${dd}.${mm}.${yyyy}T${hh}:${min}:${ss}${tzSign}${tzH}:${tzM}`
}

/**
 * Форматирует дату/время с флагом наличия UTC.
 * Возвращает { dateTime: строка ДД.ММ.ГГГГТЧЧ:ММ:СС±ЧЧ:ММ, utc: "1" }.
 * Флаг означает наличие указанного UTC-смещения, а не равенство смещения нулю.
 * formatDateTimeUTC всегда указывает смещение, в том числе +00:00.
 */
export function formatDateTimeWithUtc(date: Date) {
    return {
        dateTime: formatDateTimeUTC(date),
        utc: "1",
    }
}

/**
 * Форматирует дату в компактный вид «ГГГГММДД».
 * Используется в имени файла обмена (`ИдФайл`).
 *
 * @example formatFileDate(new Date(2026, 0, 9)) → "20260109"
 */
export function formatFileDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = padZero2(date.getMonth() + 1);
    const dd = padZero2(date.getDate());
    return `${yyyy}${mm}${dd}`;
}

/** Узел XML в нотации «объект/массив = тег, примитив = атрибут». */
export type XmlNode = Record<string, unknown>;

/** Опции сериализации XML. */
export type TXmlOptions = {
    /** Версия XML. По умолчанию "1.0". */
    version?: string;
    /** Кодировка. По умолчанию "windows-1251". */
    encoding?: string;
};

// Сборщик XML. Префикс `@_` у атрибутов — внутренняя деталь fast-xml-builder:
// в «чистых» объектах документов атрибуты задаются примитивами без префикса.
const xmlBuilder = new XMLBuilder({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    format: true,
    indentBy: "  ",
    suppressEmptyNode: true,
});

/**
 * Сериализует объект в XML-строку с декларацией.
 *
 * Соглашение (сверено со схемами ФНС версии 5.01):
 * - значение-объект → вложенный тег;
 * - значение-массив → повторяющиеся теги: объекты — сложные теги,
 *   примитивы — текстовое содержимое;
 * - значение-примитив (строка/число) → атрибут;
 * - текстовое содержимое тега задаётся массивом примитивов
 *   (для одиночного текста — массив из одного элемента);
 * - `undefined` / `null` — пропускаются.
 *
 * @example
 * toXml({ "Файл": { "ВерсФорм": "5.01", "Документ": { "КНД": "1110380" } } })
 */
export function toXml(root: XmlNode, options: TXmlOptions = {}): string {
    const { version = "1.0", encoding = "windows-1251" } = options;
    const converted = toBuilderJson(root) as Record<string, unknown>;

    return xmlBuilder.build({
        "?xml": { "@_version": version, "@_encoding": encoding },
        ...converted,
    });
}

/**
 * Приводит «чистый» узел к нотации fast-xml-builder:
 * примитивы становятся атрибутами (`@_ключ`), объекты и массивы — тегами.
 */
function toBuilderJson(node: unknown): unknown {
    if (Array.isArray(node)) {
        return node.map(toBuilderJson);
    }

    if (node !== null && typeof node === "object") {
        const result: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
            if (value === undefined || value === null) {
                continue;
            }
            if (Array.isArray(value)) {
                result[key] = value.map(toBuilderJson);
            } else if (typeof value === "object") {
                result[key] = toBuilderJson(value);
            } else {
                result[`@_${key}`] = value;
            }
        }
        return result;
    }

    return node;
}