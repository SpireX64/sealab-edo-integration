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
 * Содержимое лежит в `Подстановка.Документ` (как и у 1110380–1110383).
 */

import { DocumentType, type TDocumentAttachment } from '../../shared';
import type { XmlNode } from '../../../helpers';

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

export function mapDocument1110384(node: XmlNode): TDocumentAttachment {
    const file = (node["Файл"] ?? {}) as Record<string, unknown>;
    const doc = (file["Документ"] ?? {}) as TDocumentXml;

    const content = doc["СодИнфЗаезд"];
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
                    "ВерсияФормата": "5.01",
                    "Тип": DocumentType.EPL,
                    "Подтип": "1110384",
                    "Подстановка": substitution,
                },
            ],
        },
    };
}
