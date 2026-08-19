/**
 * Конвертер вложения документа ЭТрН 1110339
 * («Транспортная накладная — информация грузоотправителя», титул Т1).
 *
 * В отличие от ЭПЛ/ЭЗЗ, для ЭТрН метод `СБИС.СгенерироватьВложение` уже
 * принимает **XML-теги** спецификации, завёрнутые в File-структуру:
 *
 *   Подстановка: { "1110339": { "ВерсФорм": "5.01", "Файл": { "Документ": … } } }
 *
 * Конструктор {@link Document111339} формирует эту структуру корректно, однако
 * часть значений использует «упрощённые» форматы, которые сервер молча
 * игнорирует (или трактует как пустые). Данный конвертер приводит их к формату,
 * который сервер разворачивает в полноценный XML:
 *
 *   1. `ФИО` — строка «Фамилия Имя Отчество» → объект `{Фамилия, Имя, Отчество}`.
 *   2. `Тлф` / `ЭлПочта` — массив строк → массив объектов `{ value }`.
 *   3. Адрес — плоские поля `{Индекс, КодРегион, …}` → `{АдресРФ: {…}}`;
 *      `{КодСтр, АдрТекст}` → `{АдресИнф: {…}}`; `{КодГАР}` остаётся как есть.
 *   4. `СвГруз` — массив → одиночный объект (объединение `ОпГруз`).
 *   5. `СвПА.Контакт` → `СвПА.КонтПА` (в элементе «Сведения о переадресовке»
 *      контакты называются `КонтПА`, а не `Контакт`).
 *
 * Применение:
 *   generateAttachment(mapDocument1110339(Document111339(data)))
 */

import { DocumentType, type TDocumentAttachment } from '../../shared';

// ─── Формы значений, которые выдаёт конструктор (для чтения) ────────────────

type Substitution = Record<string, unknown>;

/** Поля адреса РФ (АдрРФТип), выдаваемые `formatAddress`/`formatConcreteAddress`. */
const RUSSIAN_ADDRESS_KEYS = [
    "Индекс",
    "КодРегион",
    "Район",
    "Город",
    "НаселПункт",
    "Улица",
    "Дом",
    "Корпус",
    "Кварт",
] as const;

// ─── Вспомогательные конвертеры ─────────────────────────────────────────────

/** «Фамилия Имя Отчество» → объект ФИО. */
function splitFullName(value: string): Record<string, unknown> {
    const parts = value.trim().split(/\s+/).filter(Boolean);

    if (parts.length >= 3) {
        return {
            "Фамилия": parts[0],
            "Имя": parts[1],
            "Отчество": parts.slice(2).join(" "),
        };
    }

    if (parts.length === 2) {
        return { "Фамилия": parts[0], "Имя": parts[1] };
    }

    return { "Фамилия": parts[0] ?? value };
}

/** Массив строк? */
function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every((item) => typeof item === "string");
}

/** `СвГруз` (массив из-за `cargo.map(...)`) → одиночный объект. */
function fixCargo(list: unknown[]): unknown {
    if (list.length === 0) return undefined;

    const merged: Record<string, unknown> = {};
    const cargoDescriptions: unknown[] = [];

    for (const item of list) {
        if (!item || typeof item !== "object") continue;

        const entry = item as Record<string, unknown>;
        if (Array.isArray(entry["ОпГруз"])) {
            cargoDescriptions.push(...entry["ОпГруз"]);
        }
        for (const [key, value] of Object.entries(entry)) {
            if (key !== "ОпГруз" && !(key in merged)) {
                merged[key] = value;
            }
        }
    }

    merged["ОпГруз"] = cargoDescriptions;
    return fixNode(merged);
}

/**
 * Рекурсивно приводит значения документа к формату, принимаемому сервером:
 * ФИО-строки, телефоны/почту, адреса и `СвГруз`.
 */
function fixNode(node: unknown): unknown {
    if (Array.isArray(node)) {
        return node.map(fixNode);
    }

    if (!node || typeof node !== "object") {
        return node;
    }

    const obj = node as Record<string, unknown>;

    // 1) Иностранный адрес: {КодСтр, АдрТекст, …} → {АдресИнф: {…}, …}.
    if (typeof obj["КодСтр"] === "string" && typeof obj["АдрТекст"] === "string") {
        const rest: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(obj)) {
            if (key === "КодСтр" || key === "АдрТекст") continue;
            rest[key] = fixNode(value);
        }
        return {
            ...rest,
            "АдресИнф": { "КодСтр": obj["КодСтр"], "АдрТекст": obj["АдрТекст"] },
        };
    }

    // 2) Адрес РФ: {КодРегион, …} → {АдресРФ: {…}, …}.
    if (typeof obj["КодРегион"] === "string") {
        const russian: Record<string, unknown> = {};
        const rest: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(obj)) {
            if ((RUSSIAN_ADDRESS_KEYS as readonly string[]).includes(key)) {
                russian[key] = value;
            } else {
                rest[key] = fixNode(value);
            }
        }
        return { ...rest, "АдресРФ": russian };
    }

    // 3) Обычный объект — рекурсивная обработка полей.
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
        if (key === "ФИО" && typeof value === "string") {
            result[key] = splitFullName(value);
        } else if ((key === "Тлф" || key === "ЭлПочта") && isStringArray(value)) {
            result[key] = value.map((item) => ({ "value": item }));
        } else if (key === "СвГруз" && Array.isArray(value)) {
            result[key] = fixCargo(value);
        } else {
            result[key] = fixNode(value);
        }
    }
    return result;
}

// ─── Основной конвертер ─────────────────────────────────────────────────────

/**
 * Конвертирует вложение ЭТрН 1110339 в форму, полностью разворачиваемую
 * `СБИС.СгенерироватьВложение`, не изменяя типы и конструкторы.
 */
export function mapDocument1110339(attachment: TDocumentAttachment): TDocumentAttachment {
    const source = attachment["Документ"]["Вложение"] as {
        "ВерсияФормата": string;
        "Тип": DocumentType;
        "Подтип": string;
        "Подстановка": Substitution;
    };

    const subtype = Object.keys(source["Подстановка"])[0] ?? source["Подтип"];
    const file = source["Подстановка"][subtype] as {
        "ВерсФорм": string;
        "Файл": { "Документ": Record<string, unknown> };
    };

    const document = fixNode(file["Файл"]["Документ"]) as Record<string, unknown>;

    // Точечная правка: контакты в «Сведениях о переадресовке» называются КонтПА.
    const instructions = document["СодИнфГО"] as Record<string, unknown> | undefined;
    const readdressing = instructions?.["УказГО"] as Record<string, unknown> | undefined;
    const pa = readdressing?.["СвПА"] as Record<string, unknown> | undefined;
    if (pa && "Контакт" in pa) {
        pa["КонтПА"] = pa["Контакт"];
        delete pa["Контакт"];
    }

    return {
        "Документ": {
            "Вложение": {
                "ВерсияФормата": source["ВерсияФормата"],
                "Тип": source["Тип"],
                "Подтип": source["Подтип"],
                "Подстановка": {
                    [subtype]: {
                        "ВерсФорм": file["ВерсФорм"],
                        "Файл": { "Документ": document },
                    },
                },
            },
        },
    };
}
