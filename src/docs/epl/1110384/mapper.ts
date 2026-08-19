/**
 * Конвертер вложения документа ЭПЛ 1110384
 * («Путевой лист — показания одометра при заезде/сдаче ТС»).
 *
 * Приводит XML-теги конструктора {@link Document1110384} к семантическим
 * ключам, принимаемым `СБИС.СгенерироватьВложение` (формат Postman-коллекции):
 *
 *   { "Документ": { "ПризнакОкончанияРейса" },
 *     "Приемка": { "Заезд", "Ответственный" } }
 *
 * Внимание: конструктор 1110384 кладёт содержимое в `Подстановка.Файл.Документ`
 * (в отличие от 1110380–1110383, где `Подстановка.Документ`), поэтому конвертер
 * читает источник из обоих вариантов.
 */

import { DocumentType, type TDocumentAttachment } from '../../shared';

type Substitution = Record<string, unknown>;

type TPersonFullNameXml = { "Фамилия": string; "Имя": string; "Отчество"?: string };

type TAuthorizedPersonXml = { "Должн"?: string; "ФИО"?: TPersonFullNameXml };

type TContentXml = {
    "УИД_ПЛ"?: string;
    "ПризнКонцРейс"?: string;
    "СвОдомЗаезд"?: { "ДатВрЗаезд"?: string; "ОдомЗаезд"?: string; "ДатВрСдачТС"?: string; "ОдомСдачТС"?: string };
    "СвОдомСдачТС"?: { "ДатВрЗаезд"?: string; "ОдомЗаезд"?: string; "ДатВрСдачТС"?: string; "ОдомСдачТС"?: string };
    "СвУплЛиц"?: TAuthorizedPersonXml;
};

type TSignerXml = { "ТипПодпис"?: string; "СпосПодтПолном"?: string };

type TDocumentXml = {
    "СодИнфЗаезд"?: TContentXml;
    "ПодпИнфЗаезд"?: TSignerXml;
};

type TAttachmentList = {
    "ВерсияФормата": string;
    "Тип": DocumentType;
    "Подтип": string;
    "Подстановка": { "Документ"?: TDocumentXml; "Файл"?: { "Документ"?: TDocumentXml } };
};

function mapResponsible(person: TAuthorizedPersonXml | undefined): Record<string, unknown> | undefined {
    if (!person) return undefined;

    const result: Record<string, unknown> = {};
    if (person["ФИО"]) {
        result["Фамилия"] = person["ФИО"]["Фамилия"];
        result["Имя"] = person["ФИО"]["Имя"];
        if (person["ФИО"]["Отчество"]) result["Отчество"] = person["ФИО"]["Отчество"];
    }
    return result;
}

export function mapDocument1110384(attachment: TDocumentAttachment): TDocumentAttachment {
    const list = attachment["Документ"]["Вложение"];
    const source = (Array.isArray(list) ? list[0] : list) as TAttachmentList;

    const doc = source["Подстановка"]["Документ"]
        ?? source["Подстановка"]["Файл"]?.["Документ"];

    const content = doc?.["СодИнфЗаезд"];
    const odometer = content?.["СвОдомЗаезд"] ?? content?.["СвОдомСдачТС"];

    const substitution: Substitution = {
        "Документ": {
            "ПризнакОкончанияРейса": content?.["ПризнКонцРейс"],
        },
        "Приемка": {
            "Заезд": {
                "ДатаВремя": odometer?.["ДатВрЗаезд"] ?? odometer?.["ДатВрСдачТС"],
                "Одометр": odometer?.["ОдомЗаезд"] ?? odometer?.["ОдомСдачТС"],
            },
            "Ответственный": mapResponsible(content?.["СвУплЛиц"]),
        },
    };

    const signer = doc?.["ПодпИнфЗаезд"];
    if (signer) {
        substitution["Подписант"] = {
            "СпособПодтвержденияПолномочий": signer["СпосПодтПолном"],
            "ТипПодписи": signer["ТипПодпис"],
        };
    }

    return {
        "Документ": {
            "Вложение": [
                {
                    "ВерсияФормата": source["ВерсияФормата"],
                    "Тип": source["Тип"],
                    "Подтип": source["Подтип"],
                    "Подстановка": substitution,
                },
            ],
        },
    };
}
