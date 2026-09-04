/**
 * Конвертер вложения документа ЭПЛ 1110382
 * («Путевой лист — результат контроля технического состояния и выпуск ТС»).
 *
 * Приводит XML-теги конструктора {@link Document1110382} к семантическим
 * ключам, принимаемым `СБИС.СгенерироватьВложение` (формат Postman-коллекции):
 *
 *   { "Техосмотр": { "Результат", "ВыпускНаЛинию", "Ответственный" } }
 */

import { DocumentType, type TDocumentAttachment } from '../../shared';
import type { XmlNode } from '../../../helpers';

type Substitution = Record<string, unknown>;

type TPersonFullNameXml = { "Фамилия": string; "Имя": string; "Отчество"?: string };

type TResponsibleXml = { "Должн"?: string; "ФИО"?: TPersonFullNameXml };

type TVehicleXml = {
    "Тип"?: string;
    "Марка"?: string;
    "Модель"?: string;
    "РегНомер"?: string;
    "ИнвНомер"?: string;
};

type TTrailerXml = { "Марка"?: string; "Модель"?: string; "РегНомер"?: string };

type TVehicleInfoXml = { "ТС"?: TVehicleXml; "Прицеп"?: TTrailerXml[] };

type TContentXml = {
    "УИД_ПЛ"?: string;
    "ДатВрКонтТехСост"?: string;
    "НалКоорТочВрКонтТехСост"?: string;
    "ОтметКонтТехСост"?: string;
    "ДатВрВыпНаЛин"?: string;
    "НалКоорТочВрВыпНаЛин"?: string;
    "СвОтвЛиц"?: TResponsibleXml;
    "СвТС"?: TVehicleInfoXml;
};

type TSignerXml = { "ТипПодпис"?: string; "СпосПодтПолном"?: string };

type TDocumentXml = {
    "ИдИнфСоб"?: Record<string, unknown>;
    "СодИнфТехСост"?: TContentXml;
    "ПодпИнфТехСост"?: TSignerXml;
};


function mapResponsible(person: TResponsibleXml | undefined): Record<string, unknown> | undefined {
    if (!person) return undefined;

    const result: Record<string, unknown> = { "Должность": person["Должн"] };
    if (person["ФИО"]) {
        result["Фамилия"] = person["ФИО"]["Фамилия"];
        result["Имя"] = person["ФИО"]["Имя"];
        if (person["ФИО"]["Отчество"]) result["Отчество"] = person["ФИО"]["Отчество"];
    }
    return result;
}

/** Транспортное средство (`СвТС`) → семантический `ТранспортноеСредство`. */
function mapVehicle(info: TVehicleInfoXml | undefined): Record<string, unknown> | undefined {
    const vehicle = info?.["ТС"];
    if (!vehicle) return undefined;

    const result: Record<string, unknown> = {
        "Тип": vehicle["Тип"],
        "Марка": vehicle["Марка"],
        "Модель": vehicle["Модель"],
        "РегНомер": vehicle["РегНомер"],
        "ИнвентарныйНомер": vehicle["ИнвНомер"],
    };

    if (info["Прицеп"]?.length) {
        result["Прицеп"] = info["Прицеп"].map((t) => ({
            "РегНомер": t["РегНомер"],
            "Марка": t["Марка"],
            "Модель": t["Модель"],
        }));
    }

    return result;
}

export function mapDocument1110382(node: XmlNode): TDocumentAttachment {
    const file = (node["Файл"] ?? {}) as Record<string, unknown>;
    const doc = (file["Документ"] ?? {}) as TDocumentXml;
    const content = doc["СодИнфТехСост"];

    const substitution: Substitution = {
        "Техосмотр": {
            "Результат": {
                "ДатаВремя": content?.["ДатВрКонтТехСост"],
                "КоордВремя": content?.["НалКоорТочВрКонтТехСост"],
                "Решение": content?.["ОтметКонтТехСост"],
            },
            "ВыпускНаЛинию": {
                "ДатаВремя": content?.["ДатВрВыпНаЛин"],
                "КоордВремя": content?.["НалКоорТочВрВыпНаЛин"],
            },
            "Ответственный": mapResponsible(content?.["СвОтвЛиц"]),
        },
        "ТранспортноеСредство": mapVehicle(content?.["СвТС"]),
    };

    const signer = doc["ПодпИнфТехСост"];
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
                    "Подтип": "1110382",
                    "Подстановка": substitution,
                },
            ],
        },
    };
}
