/**
 * Конвертер вложения документа ЭПЛ 1110383
 * («Путевой лист — показания одометра при выезде/приёме ТС»).
 *
 * Приводит XML-теги конструктора {@link Document1110383} к семантическим
 * ключам, принимаемым `СБИС.СгенерироватьВложение` (формат Postman-коллекции):
 *
 *   { "Документ": { "ПризнакНачалаРейса" },
 *     "Выпуск": { "Выезд", "Ответственный" } }
 */

import { DocumentType, type TDocumentAttachment } from '../../shared';

type Substitution = Record<string, unknown>;

type TPersonFullNameXml = { "Фамилия": string; "Имя": string; "Отчество"?: string };

type TAuthorizedPersonXml = { "Должн"?: string; "ФИО"?: TPersonFullNameXml };

type TOdometerXml = {
    "ДатВрВыезд"?: string;
    "НалКоорТочВрВыезд"?: string;
    "ОдомВыезд"?: string;
    "ДатВрПриемТС"?: string;
    "НалКоорТочВрПриемТС"?: string;
    "ОдомПриемТС"?: string;
};

type TContentXml = {
    "УИД_ПЛ"?: string;
    "ПризнНачРейс"?: string;
    "СвОдомВыезд"?: TOdometerXml;
    "СвОдомПриемТС"?: TOdometerXml;
    "СвУплЛиц"?: TAuthorizedPersonXml;
};

type TSignerXml = { "ТипПодпис"?: string; "СпосПодтПолном"?: string };

type TDocumentXml = {
    "СодИнфВыезд"?: TContentXml;
    "ПодпИнфВыезд"?: TSignerXml;
};

type TAttachmentList = {
    "ВерсияФормата": string;
    "Тип": DocumentType;
    "Подтип": string;
    "Подстановка": { "Документ": TDocumentXml };
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

export function mapDocument1110383(attachment: TDocumentAttachment): TDocumentAttachment {
    const list = attachment["Документ"]["Вложение"];
    const source = (Array.isArray(list) ? list[0] : list) as TAttachmentList;

    const doc = source["Подстановка"]["Документ"];
    const content = doc["СодИнфВыезд"];

    const odometer = content?.["СвОдомВыезд"] ?? content?.["СвОдомПриемТС"];

    const substitution: Substitution = {
        "Документ": {
            "ПризнакНачалаРейса": content?.["ПризнНачРейс"],
        },
        "Выпуск": {
            "Выезд": {
                "ДатаВремя": odometer?.["ДатВрВыезд"] ?? odometer?.["ДатВрПриемТС"],
                "Одометр": odometer?.["ОдомВыезд"] ?? odometer?.["ОдомПриемТС"],
            },
            "Ответственный": mapResponsible(content?.["СвУплЛиц"]),
        },
    };

    const signer = doc["ПодпИнфВыезд"];
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
