/**
 * Конвертер вложения документа ЭПЛ 1110380
 * («Путевой лист — обстоятельства и особенности рейса», титул Т1).
 *
 * Метод `СБИС.СгенерироватьВложение` формирует XML из объекта `Подстановка`,
 * ключи которого — **семантические имена полей** (формат «ключ-значение»),
 * а не XML-теги спецификации. Формат ключей приведён в официальной документации
 * Saby TMS:
 *   https://online.sbis.ru/page/knowledge_base/162c298b-8baf-4c3d-bf79-f493afadc048?folderId=7e471112-c0d7-48a6-a273-9fddd13d8b28
 *   (формат: https://formats.saby.ru/edo/trucking/133776)
 *
 * Конструктор {@link Document1110380} выдаёт в `Подстановка` XML-теги
 * (`НомерПЛ`, `СодИнфСоб`, …), которые сервер игнорирует. Данный конвертер
 * приводит их к семантическим ключам:
 *
 *   { "Документ": {…}, "Маршрут": {…}, "Маршрут.Грузоотправитель": […],
 *     "ТранспортноеСредство": {…}, "Водители": {…}, "Подписант": {…} }
 *
 * Применение:
 *   generateAttachment(mapDocument1110380(Document1110380(data)))
 */

import { DocumentType, type TDocumentAttachment } from '../../shared';
import type { XmlNode } from '../../../helpers';

type Substitution = Record<string, unknown>;

// ─── Формы XML-тегов, которые выдаёт конструктор (для чтения) ───────────────

type TPersonFullNameXml = {
    "Фамилия": string;
    "Имя": string;
    "Отчество"?: string;
};

type TLegalEntityXml = {
    "НаимОрг": string;
    "ИННЮЛ"?: string;
    "КПП"?: string;
    "ОГРН": string;
};

type TIndividualEntrepreneurXml = {
    "ИНН"?: string;
    "ОГРНИП": string;
    "ФИО": TPersonFullNameXml;
};

type TIdentificationXml = {
    "СвЮЛУч"?: TLegalEntityXml;
    "СвИП"?: TIndividualEntrepreneurXml;
};

type TRussianAddressXml = {
    "Индекс"?: string;
    "КодРегион"?: string;
    "Район"?: string;
    "Город"?: string;
    "НаселПункт"?: string;
    "Улица"?: string;
    "Дом"?: string;
    "Корпус"?: string;
    "Кварт"?: string;
    "ИныеСвед"?: string;
};

type TForeignAddressXml = {
    "КодСтр"?: string;
    "АдрТекст"?: string;
};

type TAddressXml = {
    "АдрРФ"?: TRussianAddressXml;
    "АдрФИАС"?: Record<string, unknown>;
    "АдрИнф"?: TForeignAddressXml;
};

type TContactsXml = {
    "Тлф"?: string[];
    "ЭлПочта"?: string[];
    "ИнКонт"?: string;
};

type TIssuerXml = {
    "ЛицоОфПЛ"?: string;
    "ИдСв"?: TIdentificationXml;
    "Адрес"?: TAddressXml;
    "Контакт"?: TContactsXml;
};

type TVehicleXml = {
    "Тип"?: string;
    "Марка"?: string;
    "Модель"?: string;
    "РегНомер"?: string;
    "ИнвНомер"?: string;
};

type TTrailerXml = {
    "Марка"?: string;
    "Модель"?: string;
    "РегНомер"?: string;
};

type TDriverLicenseXml = {
    "НомВУ"?: string;
    "СерВУ"?: string;
    "ДатаВыдВУ"?: string;
};

type TDriverXml = {
    "ИННФЛ"?: string;
    "ВодитУд"?: TDriverLicenseXml;
    "ФИО"?: TPersonFullNameXml;
};

type TValidityXml = {
    "ПЛДень"?: string;
    "ДатаИспПЛ"?: string;
    "ДатаНачИспПЛ"?: string;
    "ДатаКонИспПЛ"?: string;
};

type TDeparturePointXml = {
    "Адрес"?: TAddressXml;
};

type TShipperXml = {
    "ИдСв"?: {
        "СвЮЛУч"?: TLegalEntityXml;
        "СвИП"?: TIndividualEntrepreneurXml;
    };
};

type TContentXml = {
    "УИД_ПЛ"?: string;
    "ОбМедОсмПосле"?: string;
    "ВидПрв"?: string;
    "ВидКП"?: string;
    "ВидСообщ"?: string;
    "МестОтпр"?: TDeparturePointXml[];
    "СрокПЛ"?: TValidityXml;
    "СвЛицПЛ"?: TIssuerXml;
    "СвГО"?: TShipperXml[];
    "СвТС"?: { "ТС"?: TVehicleXml; "Прицеп"?: TTrailerXml[] };
    "СвВодит"?: TDriverXml[];
};

type TSignerXml = {
    "ТипПодпис"?: string;
    "СпосПодтПолном"?: string;
    "Должн"?: string;
    "ФИО"?: TPersonFullNameXml;
};

type TDocumentXml = {
    "НомерПЛ"?: string;
    "ДатаПЛ"?: string;
    "ПризнНачРейс"?: string;
    "УИДПЛПред"?: string;
    "СодИнфСоб"?: TContentXml;
    "ПодпИнфСоб"?: TSignerXml;
};


// ─── Вспомогательные конвертеры ─────────────────────────────────────────────

/** Склеивает структурированный адрес РФ (ЕГРЮЛ) в свободный текст. */
function buildRussianAddressText(addr: TRussianAddressXml): string {
    const parts: string[] = [];

    if (addr["Индекс"]) parts.push(addr["Индекс"]);
    const locality = addr["Город"] || addr["НаселПункт"];
    if (locality) parts.push(locality);
    if (addr["Район"]) parts.push(addr["Район"]);
    if (addr["Улица"]) parts.push(addr["Улица"]);
    if (addr["Дом"]) parts.push(addr["Дом"]);
    if (addr["Корпус"]) parts.push(addr["Корпус"]);
    if (addr["Кварт"]) parts.push(addr["Кварт"]);
    if (addr["ИныеСвед"]) parts.push(addr["ИныеСвед"]);

    return parts.join(", ");
}

/** Адрес → семантическая пара `{КодСтраны, АдресТекст}`. */
function mapAddressToPair(addr: TAddressXml | undefined): Record<string, unknown> | undefined {
    if (!addr) return undefined;

    if (addr["АдрИнф"]) {
        return {
            "КодСтраны": addr["АдрИнф"]["КодСтр"],
            "АдресТекст": addr["АдрИнф"]["АдрТекст"],
        };
    }

    if (addr["АдрРФ"]) {
        return {
            "КодСтраны": "643",
            "АдресТекст": buildRussianAddressText(addr["АдрРФ"]),
        };
    }

    if (addr["АдрФИАС"]) {
        return {
            "КодСтраны": "643",
            "АдресТекст": Object.values(addr["АдрФИАС"]).filter(Boolean).join(", "),
        };
    }

    return undefined;
}

/** Реквизиты (`ИдСв`) → семантический `Реквизиты.{ЮЛ|ИП}`. */
function mapRequisites(ident: TIdentificationXml | undefined): Record<string, unknown> | undefined {
    if (!ident) return undefined;

    if (ident["СвЮЛУч"]) {
        const org = ident["СвЮЛУч"];
        return {
            "ЮЛ": {
                "ИНН": org["ИННЮЛ"],
                "КПП": org["КПП"],
                "Название": org["НаимОрг"],
                "ОГРН": org["ОГРН"],
            },
        };
    }

    if (ident["СвИП"]) {
        const ip = ident["СвИП"];
        return {
            "ИП": {
                "ИНН": ip["ИНН"],
                "ОГРНИП": ip["ОГРНИП"],
                "Фамилия": ip["ФИО"]["Фамилия"],
                "Имя": ip["ФИО"]["Имя"],
                "Отчество": ip["ФИО"]["Отчество"],
            },
        };
    }

    return undefined;
}

/** Контакты (`Контакт`) → семантический `Контакты`. */
function mapContacts(contacts: TContactsXml | undefined): Record<string, unknown> | undefined {
    if (!contacts) return undefined;

    const result: Record<string, unknown> = {};

    if (contacts["Тлф"]?.length) {
        result["Телефон"] = contacts["Тлф"].map((value) => ({ "Значение": value }));
    }
    if (contacts["ЭлПочта"]?.length) {
        result["ЭлектроннаяПочта"] = contacts["ЭлПочта"].map((value) => ({ "Значение": value }));
    }
    if (contacts["ИнКонт"]) {
        result["ИнКонт"] = contacts["ИнКонт"];
    }

    return Object.keys(result).length > 0 ? result : undefined;
}

/** Оформитель (`СвЛицПЛ`) → семантический `Оформитель`. */
function mapIssuer(issuer: TIssuerXml | undefined): Record<string, unknown> | undefined {
    if (!issuer) return undefined;

    return {
        "Тип": issuer["ЛицоОфПЛ"],
        "Реквизиты": mapRequisites(issuer["ИдСв"]),
        "Адрес": mapAddressToPair(issuer["Адрес"]),
        "Контакты": mapContacts(issuer["Контакт"]),
    };
}

/** Транспортное средство (`СвТС.ТС`) → семантический `ТранспортноеСредство`. */
function mapVehicle(vehicle: TVehicleXml | undefined, trailers: TTrailerXml[] | undefined): Record<string, unknown> | undefined {
    if (!vehicle) return undefined;

    const result: Record<string, unknown> = {
        "Тип": vehicle["Тип"],
        "Марка": vehicle["Марка"],
        "Модель": vehicle["Модель"],
        "РегНомер": vehicle["РегНомер"],
        "ИнвентарныйНомер": vehicle["ИнвНомер"],
    };

    if (trailers?.length) {
        result["Прицеп"] = trailers.map((t) => ({
            "РегНомер": t["РегНомер"],
            "Марка": t["Марка"],
            "Модель": t["Модель"],
        }));
    }

    return result;
}

/** Водитель (`СвВодит[]`) → семантический `Водители.Водитель[]`. */
function mapDriver(driver: TDriverXml): Record<string, unknown> {
    // Семантический ключ `ИНН` маппится на XML-атрибут `СвВодит.ИННФЛ`.
    const result: Record<string, unknown> = {
        "ИНН": driver["ИННФЛ"],
    };

    const name = driver["ФИО"];
    if (name) {
        result["Фамилия"] = name["Фамилия"];
        result["Имя"] = name["Имя"];
        if (name["Отчество"]) result["Отчество"] = name["Отчество"];
    }

    const license = driver["ВодитУд"];
    if (license) {
        result["ВУ"] = {
            "ДатаВыдачи": license["ДатаВыдВУ"],
            "Номер": license["НомВУ"],
            "Серия": license["СерВУ"],
        };
    }

    return result;
}

/** Грузоотправитель (`СвГО[]`) → семантический `Маршрут.Грузоотправитель[]`. */
function mapShipper(shipper: TShipperXml): Record<string, unknown> {
    const ident = shipper["ИдСв"];
    const requisites: Record<string, unknown> = {};

    if (ident?.["СвЮЛУч"]?.["ИННЮЛ"]) {
        requisites["ЮЛ.ИНН"] = ident["СвЮЛУч"]["ИННЮЛ"];
    } else if (ident?.["СвИП"]?.["ИНН"]) {
        requisites["ИП.ИНН"] = ident["СвИП"]["ИНН"];
    }

    return { "Реквизиты": requisites };
}

/** Подписант (`ПодпИнфСоб`) → семантический `Подписант`. */
function mapSigner(signer: TSignerXml | undefined): Record<string, unknown> | undefined {
    if (!signer) return undefined;

    return {
        "СпособПодтвержденияПолномочий": signer["СпосПодтПолном"],
        "ТипПодписи": signer["ТипПодпис"],
    };
}

// ─── Основной конвертер ─────────────────────────────────────────────────────

/**
 * Конвертирует вложение ЭПЛ 1110380 из XML-тегов в семантические ключи,
 * принимаемые `СБИС.СгенерироватьВложение`.
 */
export function mapDocument1110380(node: XmlNode): TDocumentAttachment {
    const file = (node["Файл"] ?? {}) as Record<string, unknown>;
    const doc = (file["Документ"] ?? {}) as TDocumentXml;
    const content = doc["СодИнфСоб"];
    const validity = content?.["СрокПЛ"];

    const departurePoints = content?.["МестОтпр"] ?? [];
    const route: Record<string, unknown> = {};

    if (departurePoints.length > 0) {
        route["Отправление"] = mapAddressToPair(departurePoints[0]?.["Адрес"]);
    }
    if (departurePoints.length > 1) {
        route["Пункт"] = departurePoints
            .slice(1)
            .map((p) => mapAddressToPair(p["Адрес"]))
            .filter(Boolean);
    }

    const substitution: Substitution = {
        "Документ": {
            "Номер": doc["НомерПЛ"],
            "ПризнакНачалаРейса": doc["ПризнНачРейс"],
            "ВидПеревозки": content?.["ВидПрв"],
            "ВидКоммерческойПеревозки": content?.["ВидКП"],
            "ВидСообщения": content?.["ВидСообщ"],
            "ПослерейсовыйМедосмотр": content?.["ОбМедОсмПосле"],
            "Длительность": validity?.["ПЛДень"],
            "ДатаИсполнения": validity?.["ДатаИспПЛ"],
            "ДатаНачалаИсполнение": validity?.["ДатаНачИспПЛ"],
            "ДатаКонцаИсполнение": validity?.["ДатаКонИспПЛ"],
            "Оформитель": mapIssuer(content?.["СвЛицПЛ"]),
        },
        "Маршрут": route,
        "Маршрут.Грузоотправитель": content?.["СвГО"]?.length
            ? content["СвГО"].map(mapShipper)
            : undefined,
        "ТранспортноеСредство": mapVehicle(content?.["СвТС"]?.["ТС"], content?.["СвТС"]?.["Прицеп"]),
        "Водители": content?.["СвВодит"]?.length
            ? { "Водитель": content["СвВодит"].map(mapDriver) }
            : undefined,
        "Подписант": mapSigner(doc["ПодпИнфСоб"]),
    };

    return {
        "Документ": {
            "Вложение": [
                {
                    "ВерсияФормата": "5.01",
                    "Тип": DocumentType.EPL,
                    "Подтип": "1110380",
                    "Подстановка": substitution,
                },
            ],
        },
    };
}
