import { describe, expect, it } from "vitest";

import { etrnFixture } from "./fixtures/etrn";
import { eplFixture } from "./fixtures/epl";
import { epl1110381Fixture } from "./fixtures/epl-2";
import {
    epl1110382Fixture,
    epl1110383Fixture,
    epl1110384Fixture,
} from "./fixtures/epl-3";
import { ezzFixture } from "./fixtures/ezz";
import { ezz1110362Fixture } from "./fixtures/ezz-2";
import { etrn1110340Fixture, etrn1110341Fixture } from "./fixtures/etrn-2";

import {
    Document111339,
    Document1110340,
    Document1110341,
    Document1110361,
    Document1110362,
    Document1110380,
    Document1110381,
    Document1110382,
    Document1110383,
    Document1110384,
    mapDocument1110339,
    mapDocument1110361,
    mapDocument1110362,
    mapDocument1110380,
    mapDocument1110381,
    mapDocument1110382,
    mapDocument1110383,
    mapDocument1110384,
    type TDocumentAttachment,
} from "../src/index";

type TAttachmentContent = {
    "ВерсияФормата": string;
    "Тип": string;
    "Подтип": string;
    "Подстановка": Record<string, unknown>;
};

/** Достаёт единственный элемент `Вложение` (массив или одиночный объект). */
function singleAttachment(att: TDocumentAttachment): TAttachmentContent {
    const list = att["Документ"]["Вложение"];
    return (Array.isArray(list) ? list[0] : list) as TAttachmentContent;
}

/**
 * Офлайн-проверка конвертеров (мапперов) для `СБИС.СгенерироватьВложение`.
 * Не требует сети и учётных данных: проверяет, что конструкторы документов
 * в связке с мапперами выдают корректную структуру вложения
 * (Тип / Подтип / семантические ключи `Подстановка`).
 */
describe("Конвертеры вложений (офлайн)", () => {
    it("ЭТрН 1110339 → File-структура с исправленными полями", () => {
        const att = singleAttachment(mapDocument1110339(Document111339(etrnFixture)));

        expect(att.Тип).toBe("ЭТрН");
        expect(att.Подтип).toBe("1110339");
        expect(att.ВерсияФормата).toBe("5.01");

        const file = (att.Подстановка["1110339"] as Record<string, unknown>)["Файл"] as Record<string, unknown>;
        expect(file["Документ"]).toBeDefined();
    });

    it("ЭТрН 1110340 формирует File-структуру без конвертера", () => {
        const att = singleAttachment(Document1110340(etrn1110340Fixture));

        expect(att.Тип).toBe("ЭТрН");
        expect(att.Подтип).toBe("1110340");

        const file = (att.Подстановка["1110340"] as Record<string, unknown>)["Файл"] as Record<string, unknown>;
        expect(file["Документ"]).toBeDefined();
    });

    it("ЭТрН 1110341 формирует File-структуру без конвертера", () => {
        const att = singleAttachment(Document1110341(etrn1110341Fixture));

        expect(att.Тип).toBe("ЭТрН");
        expect(att.Подтип).toBe("1110341");

        const file = (att.Подстановка["1110341"] as Record<string, unknown>)["Файл"] as Record<string, unknown>;
        expect(file["Документ"]).toBeDefined();
    });

    it("ЭПЛ 1110380 → семантические ключи (Документ, Маршрут, ТранспортноеСредство)", () => {
        const att = singleAttachment(mapDocument1110380(Document1110380(eplFixture)));

        expect(att.Тип).toBe("ЭПЛ");
        expect(att.Подтип).toBe("1110380");

        const substitution = att.Подстановка;
        const doc = substitution["Документ"] as Record<string, unknown>;
        expect(doc["Номер"]).toBe("ПЛ-2026-0001");
        expect(substitution["ТранспортноеСредство"]).toBeDefined();
        expect(substitution["Подписант"]).toBeDefined();
    });

    it("ЭПЛ 1110381 → семантические ключи (Медосмотр, Подписант)", () => {
        const att = singleAttachment(mapDocument1110381(Document1110381(epl1110381Fixture)));

        expect(att.Тип).toBe("ЭПЛ");
        expect(att.Подтип).toBe("1110381");

        const medExam = att.Подстановка["Медосмотр"] as Record<string, unknown>;
        expect(medExam["Вид"]).toBeDefined();
        const responsible = medExam["Ответственный"] as Record<string, unknown>;
        expect(responsible["Фамилия"]).toBe("Меньшикова");
        expect(att.Подстановка["Подписант"]).toBeDefined();
    });

    it("ЭПЛ 1110382 → семантические ключи (Техосмотр, ТранспортноеСредство)", () => {
        const att = singleAttachment(mapDocument1110382(Document1110382(epl1110382Fixture)));

        expect(att.Тип).toBe("ЭПЛ");
        expect(att.Подтип).toBe("1110382");

        const techCheck = att.Подстановка["Техосмотр"] as Record<string, unknown>;
        expect(techCheck["Результат"]).toBeDefined();
        const vehicle = att.Подстановка["ТранспортноеСредство"] as Record<string, unknown>;
        expect(vehicle["Марка"]).toBe("КАМАЗ");
        expect(att.Подстановка["Подписант"]).toBeDefined();
    });

    it("ЭПЛ 1110383 → семантические ключи (Документ, Выпуск)", () => {
        const att = singleAttachment(mapDocument1110383(Document1110383(epl1110383Fixture)));

        expect(att.Тип).toBe("ЭПЛ");
        expect(att.Подтип).toBe("1110383");

        const doc = att.Подстановка["Документ"] as Record<string, unknown>;
        expect(doc["ПризнакНачалаРейса"]).toBeDefined();
        const release = att.Подстановка["Выпуск"] as Record<string, unknown>;
        expect(release["Выезд"]).toBeDefined();
        expect(att.Подстановка["Подписант"]).toBeDefined();
    });

    it("ЭПЛ 1110384 → семантические ключи (Документ, Приемка)", () => {
        const att = singleAttachment(mapDocument1110384(Document1110384(epl1110384Fixture)));

        expect(att.Тип).toBe("ЭПЛ");
        expect(att.Подтип).toBe("1110384");

        const doc = att.Подстановка["Документ"] as Record<string, unknown>;
        expect(doc["ПризнакОкончанияРейса"]).toBeDefined();
        const acceptance = att.Подстановка["Приемка"] as Record<string, unknown>;
        expect(acceptance["Заезд"]).toBeDefined();
        expect(att.Подстановка["Подписант"]).toBeDefined();
    });

    it("ЭЗЗ 1110361 → семантические ключи (Документ, Маршрут, Груз, Подписант)", () => {
        const att = singleAttachment(mapDocument1110361(Document1110361(ezzFixture)));

        expect(att.Тип).toBe("ЗаказЗаявка");
        expect(att.Подтип).toBe("1110361");

        const substitution = att.Подстановка;
        const doc = substitution["Документ"] as Record<string, unknown>;
        expect(doc["Номер"]).toBe("З-2026-000123");
        expect(substitution["Грузоотправитель"]).toBeDefined();
        expect(substitution["Грузоперевозчик"]).toBeDefined();
        expect(substitution["Маршрут"]).toBeDefined();
        expect(substitution["Груз"]).toBeDefined();
        expect(substitution["Подписант"]).toBeDefined();
    });

    it("ЭЗЗ 1110362 → семантические ключи (Водители, ТранспортноеСредство, СтоимостьПеревозки)", () => {
        const att = singleAttachment(mapDocument1110362(Document1110362(ezz1110362Fixture)));

        expect(att.Тип).toBe("ЗаказЗаявка");
        expect(att.Подтип).toBe("1110362");

        const substitution = att.Подстановка;
        const drivers = substitution["Водители"] as Record<string, unknown>;
        const driverList = drivers["Водитель"] as Record<string, unknown>[];
        expect(driverList[0]!["ИНН"]).toBe("727247929907");
        const vehicle = substitution["ТранспортноеСредство"] as Record<string, unknown>;
        expect(vehicle["РегНомер"]).toBe("У528МВ76");
        expect(substitution["СтоимостьПеревозки"]).toBeDefined();
        expect(substitution["Подписант"]).toBeDefined();
    });
});
