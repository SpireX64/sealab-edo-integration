import { describe, expect, it } from "vitest";
import { Document111339, etrnFixture } from "./fixtures/etrn";
import { Document1110380, eplFixture } from "./fixtures/epl";
import { Document1110361, ezzFixture } from "./fixtures/ezz";

/**
 * Офлайн-проверка формирования документов.
 * Не требует сети и учётных данных: проверяет, что конструкторы
 * документов из `docs` выдают корректную структуру вложения
 * (Тип / Подтип / Подстановка), совпадающую с интерфейсом
 * `СБИС.СгенерироватьВложение`.
 */
describe("Формирование документов (офлайн)", () => {
    it("ЭТрН 1110339 формирует вложение типа ЭТрН", () => {
        const att = Document111339(etrnFixture);

        expect(att.Документ.Вложение.Тип).toBe("ЭТрН");
        expect(att.Документ.Вложение.Подтип).toBe("1110339");
        expect(att.Документ.Вложение.ВерсияФормата).toBe("5.01");

        const content = att.Документ.Вложение.Подстановка["1110339"];
        expect(content.Файл.Документ).toBeDefined();
        expect(content.Файл.Документ.СодИнфГО).toBeDefined();
        expect(content.Файл.Документ.Подписант).toBeDefined();
    });

    it("ЭПЛ 1110380 формирует вложение типа ЭПЛ", () => {
        const att = Document1110380(eplFixture);

        expect(att.Документ.Вложение.Тип).toBe("ЭПЛ");
        expect(att.Документ.Вложение.Подтип).toBe("1110380");

        const content = att.Документ.Вложение.Подстановка["1110380"];
        expect(content.Файл.Документ.СодИнфСоб).toBeDefined();
        expect(content.Файл.Документ.ПодпИнфСоб).toBeDefined();
    });

    it("ЭЗЗ 1110361 формирует вложение типа ЗаказЗаявка", () => {
        const att = Document1110361(ezzFixture);

        expect(att.Документ.Вложение.Тип).toBe("ЗаказЗаявка");
        expect(att.Документ.Вложение.Подтип).toBe("1110361");

        const content = att.Документ.Вложение.Подстановка["1110361"];
        expect(content.Файл.Документ.СодИнфГО).toBeDefined();
        expect(content.Файл.Документ.ПодпИнфГО).toBeDefined();
    });
});
