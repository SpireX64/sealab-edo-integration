import iconv from "iconv-lite";
import type { XmlNode } from "../../../helpers";
import type { Particle, Schema, SchemaType } from "./schema-types";

/** Обязательные поля файла, наличие которых подтверждено валидатором. */
export type InstructionXmlNode = {
    Файл: {
        ИдФайл: string;
        ВерсФорм: string;
        ВерсПрог: string;
        Документ: Record<string, unknown>;
    };
};

function fail(path: string, rule: string): never {
    // Значения полей (в том числе подпись и персональные данные) не раскрываются.
    throw new TypeError(`${path}: ${rule}`);
}

function record(value: unknown, path: string): Record<string, unknown> {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
        fail(path, "ожидается XML-узел");
    }
    return value as Record<string, unknown>;
}

function count(value: unknown): number {
    return value == null ? 0 : Array.isArray(value) ? value.length : 1;
}

function names(particle: Particle): string[] {
    return particle.kind === "element"
        ? [particle.name]
        : particle.children.flatMap(names);
}

function scalar(
    value: unknown,
    type: Extract<SchemaType, { kind: "simple" }>,
    path: string,
) {
    if (typeof value !== "string" && typeof value !== "number")
        fail(path, "ожидается строка или число");
    const text = String(value);
    if (
        Array.from(text).some(char => {
            const code = char.codePointAt(0) ?? 0;
            return !(
                code === 9 ||
                code === 10 ||
                code === 13 ||
                (code >= 32 && code <= 0xd7ff) ||
                (code >= 0xe000 && code <= 0xfffd) ||
                (code >= 0x10000 && code <= 0x10ffff)
            );
        })
    )
        fail(path, "недопустимый символ XML 1.0");
    if (iconv.decode(iconv.encode(text, "win1251"), "win1251") !== text)
        fail(path, "символ не представим в windows-1251");
    const f = type.facets;
    const length = Array.from(text).length;
    if (f.length !== undefined && length !== f.length)
        fail(path, `длина должна быть ${f.length}`);
    if (f.minLength !== undefined && length < f.minLength)
        fail(path, `минимальная длина ${f.minLength}`);
    if (f.maxLength !== undefined && length > f.maxLength)
        fail(path, `максимальная длина ${f.maxLength}`);
    if (f.enumeration && !f.enumeration.includes(text))
        fail(path, "значение отсутствует в перечислении XSD");
    if (
        f.pattern &&
        !f.pattern.some(
            pattern =>
                new RegExp(`^(?:${pattern})$`, "u").exec(text)?.[0] === text,
        )
    )
        fail(path, "значение не соответствует шаблону XSD");
    if (type.base !== "string") {
        const lexical = text.trim();
        const pattern =
            type.base === "integer"
                ? /^[+-]?\d+$/u
                : /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/u;
        if (!pattern.test(lexical)) fail(path, `ожидается ${type.base}`);
        const [whole = "", fraction = ""] = lexical
            .replace(/^[+-]/u, "")
            .split(".");
        const integral = whole.replace(/^0+/u, "");
        const fractional = fraction.replace(/0+$/u, "");
        const digits = Math.max(
            1,
            (integral + fractional).replace(/^0+/u, "").length,
        );
        if (f.totalDigits !== undefined && digits > f.totalDigits)
            fail(path, `не более ${f.totalDigits} значащих цифр`);
        if (
            f.fractionDigits !== undefined &&
            fractional.length > f.fractionDigits
        )
            fail(path, `не более ${f.fractionDigits} знаков после запятой`);
        if (f.minInclusive !== undefined && Number(lexical) < f.minInclusive)
            fail(path, `минимум ${f.minInclusive}`);
        if (f.maxInclusive !== undefined && Number(lexical) > f.maxInclusive)
            fail(path, `максимум ${f.maxInclusive}`);
    }
}

/** Проверяет именно профиль трёх закреплённых XSD, не универсальный XSD-процессор. */
export function validateInstructionNode<T extends XmlNode>(
    node: T,
    schema: Schema,
): T & InstructionXmlNode {
    function visit(value: unknown, index: number, path: string): void {
        const type = schema.types[index];
        if (!type) fail(path, "неизвестный тип схемы");
        if (type.kind === "simple") return scalar(value, type, path);
        const data = record(value, path);
        const allowed = new Set([
            ...Object.keys(type.attributes),
            ...type.model.flatMap(names),
        ]);
        for (const key of Object.keys(data)) {
            if (data[key] != null && !allowed.has(key))
                fail(`${path}/${key}`, "поле отсутствует в XSD");
        }
        for (const [name, attribute] of Object.entries(type.attributes)) {
            if (data[name] == null) {
                if (attribute.required)
                    fail(
                        `${path}/@${name}`,
                        "обязательный атрибут отсутствует",
                    );
            } else visit(data[name], attribute.type, `${path}/@${name}`);
        }
        const expectedOrder: string[] = [];
        function particle(rule: Particle): void {
            if (rule.kind !== "element") {
                if (rule.kind === "sequence") {
                    rule.children.forEach(particle);
                } else {
                    const selected = rule.children.filter(child =>
                        names(child).some(name => count(data[name]) > 0),
                    );
                    if (selected.length > 1)
                        fail(path, "допускается только одна ветвь xs:choice");
                    if (selected[0]) particle(selected[0]);
                    else if (!rule.children.some(child => nullable(child)))
                        fail(path, "обязательная ветвь xs:choice отсутствует");
                }
                return;
            }
            const size = count(data[rule.name]);
            const childPath = `${path}/${rule.name}`;
            if (size < rule.min || (rule.max !== null && size > rule.max))
                fail(
                    childPath,
                    `число элементов вне диапазона ${rule.min}–${rule.max ?? "∞"}`,
                );
            if (size === 0) return;
            expectedOrder.push(rule.name);
            const values = Array.isArray(data[rule.name])
                ? (data[rule.name] as unknown[])
                : [data[rule.name]];
            // Примитив без массива сериализуется как атрибут, а не текстовый тег.
            if (
                schema.types[rule.type]?.kind === "simple" &&
                !Array.isArray(data[rule.name])
            )
                fail(childPath, "текстовый элемент должен быть массивом");
            values.forEach((item, i) =>
                visit(item, rule.type, `${childPath}[${i + 1}]`),
            );
        }
        type.model.forEach(particle);
        const actualOrder = Object.keys(data).filter(
            key => !(key in type.attributes) && count(data[key]) > 0,
        );
        if (actualOrder.join("|") !== expectedOrder.join("|"))
            fail(path, "нарушен порядок элементов xs:sequence");
    }
    visit(node.Файл, schema.root, "Файл");
    return node as T & InstructionXmlNode;
}

function nullable(rule: Particle): boolean {
    if (rule.kind === "element") return rule.min === 0;
    return rule.kind === "choice"
        ? rule.children.some(nullable)
        : rule.children.every(nullable);
}
