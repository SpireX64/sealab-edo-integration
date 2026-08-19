/**
 * Конвертер вложения документа ЭЗЗ 1110362
 * («Заказ и заявка — информация перевозчика», титул Т2).
 *
 * Приводит XML-теги конструктора {@link Document1110362} к семантическим
 * ключам, принимаемым `СБИС.СгенерироватьВложение` (формат Postman-коллекции):
 *
 *   { "Грузоперевозчик", "Водители", "ТранспортноеСредство",
 *     "СтоимостьПеревозки", "Подписант" }
 *
 * Применение:
 *   generateAttachment(mapDocument1110362(Document1110362(data)))
 */

import { DocumentType, type TDocumentAttachment } from '../../shared';

type Substitution = Record<string, unknown>;

// ─── Формы XML-тегов, которые выдаёт конструктор (для чтения) ───────────────

type TPersonFullNameXml = { "Фамилия": string; "Имя": string; "Отчество"?: string };

type TCarrierOrgPersonXml = { "Тлф"?: string[]; "ФИО"?: TPersonFullNameXml };

type TDriverXml = {
    "НомВУ"?: string;
    "СерВУ"?: string;
    "ДатаВыдВУ"?: string;
    "ИННФЛ"?: string;
    "Тлф"?: string[];
    "ФИО"?: TPersonFullNameXml;
};

type TVehicleParamsXml = { "Тип"?: string; "Марка"?: string; "Грузопод"?: string; "Вместим"?: string };

type TVehicleXml = {
    "НомСТС"?: string;
    "НомерВИН"?: string;
    "РегНомер"?: string;
    "ТипВлад"?: string;
    "ПарТС"?: TVehicleParamsXml;
    "ОснАрЛиз"?: Record<string, unknown>[];
};

type TPaymentXml = {
    "СтТовБезНДС"?: string;
    "НалСт"?: string;
    "СтТовУчНал"?: string;
};

type TContentXml = {
    "СодОпер"?: string;
    "ПричОтк"?: string;
    "СвЛицОргПрвз"?: TCarrierOrgPersonXml;
    "СвВодит"?: TDriverXml[];
    "СвТС"?: { "ТС"?: TVehicleXml };
    "РазмПлатРасчет"?: TPaymentXml;
};

type TSignerXml = { "ТипПодпис"?: string; "СпосПодтПолном"?: string };

type TDocumentXml = {
    "СодИнфПрв"?: TContentXml;
    "ПодпИнфПрв"?: TSignerXml;
};

type TAttachmentList = {
    "ВерсияФормата": string;
    "Тип": DocumentType;
    "Подтип": string;
    "Подстановка": { "Документ": TDocumentXml };
};

// ─── Вспомогательные конвертеры ─────────────────────────────────────────────

/** ФИО (объект) → плоские `Фамилия`/`Имя`/`Отчество`. */
function mapFullName(name: TPersonFullNameXml | undefined): Record<string, unknown> | undefined {
    if (!name) return undefined;

    const result: Record<string, unknown> = {
        "Фамилия": name["Фамилия"],
        "Имя": name["Имя"],
    };
    if (name["Отчество"]) result["Отчество"] = name["Отчество"];

    return result;
}

/** Телефоны (`Тлф[]`) → `Телефон[{Значение}]`. */
function mapPhones(phones: string[] | undefined): Record<string, unknown>[] | undefined {
    if (!phones?.length) return undefined;
    return phones.map((value) => ({ "Значение": value }));
}

/** Документ-основание (`ОснАрЛиз[]`) → `ОснованиеВладения[]`. */
function mapOwnershipDocs(docs: Record<string, unknown>[] | undefined): Record<string, unknown>[] | undefined {
    if (!docs?.length) return undefined;

    return docs.map((doc) => {
        const sides = Array.isArray(doc["ИдРекСост"])
            ? doc["ИдРекСост"].map((r) => {
                const inn = (r as Record<string, unknown>)["ИННЮЛ"];
                return inn ? { "ЮЛ": { "ИНН": inn } } : undefined;
            }).filter(Boolean)
            : undefined;

        return {
            "Наименование": doc["НаимДок"],
            "Номер": doc["НомерДок"],
            "Дата": doc["ДатаДок"],
            "Стороны": sides,
        };
    });
}

// ─── Основной конвертер ─────────────────────────────────────────────────────

/**
 * Конвертирует вложение ЭЗЗ 1110362 из XML-тегов в семантические ключи,
 * принимаемые `СБИС.СгенерироватьВложение`.
 */
export function mapDocument1110362(attachment: TDocumentAttachment): TDocumentAttachment {
    const list = attachment["Документ"]["Вложение"];
    const source = (Array.isArray(list) ? list[0] : list) as TAttachmentList;

    const doc = source["Подстановка"]["Документ"];
    const content = doc["СодИнфПрв"];

    // Ответственное лицо перевозчика.
    const orgPerson = content?.["СвЛицОргПрвз"];
    const carrier: Record<string, unknown> = {};
    if (orgPerson) {
        carrier["Ответственный"] = {
            ...mapFullName(orgPerson["ФИО"]),
            "Телефон": mapPhones(orgPerson["Тлф"]),
        };
    }

    // Водители.
    const drivers: Record<string, unknown> = {};
    if (content?.["СвВодит"]?.length) {
        drivers["Водитель"] = content["СвВодит"].map((driver) => ({
            ...mapFullName(driver["ФИО"]),
            "ИНН": driver["ИННФЛ"],
            "ВУ": {
                "ДатаВыдачи": driver["ДатаВыдВУ"],
                "Номер": driver["НомВУ"],
                "Серия": driver["СерВУ"],
            },
            "Телефон": mapPhones(driver["Тлф"]),
        }));
    }

    // Транспортное средство.
    const vehicle = content?.["СвТС"]?.["ТС"];
    const vehicleSemantic: Record<string, unknown> | undefined = vehicle
        ? {
            "Тип": vehicle["ПарТС"]?.["Тип"],
            "Марка": vehicle["ПарТС"]?.["Марка"],
            "Грузоподъемность": vehicle["ПарТС"]?.["Грузопод"],
            "Вместимость": vehicle["ПарТС"]?.["Вместим"],
            "НомерСТС": vehicle["НомСТС"],
            "VIN": vehicle["НомерВИН"],
            "РегНомер": vehicle["РегНомер"],
            "ТипВладения": vehicle["ТипВлад"],
            "ОснованиеВладения": mapOwnershipDocs(vehicle["ОснАрЛиз"]),
        }
        : undefined;

    // Стоимость перевозки.
    const payment = content?.["РазмПлатРасчет"];
    const cost: Record<string, unknown> | undefined = payment
        ? {
            "БезНДС": payment["СтТовБезНДС"],
            "ВключаяНДС": payment["СтТовУчНал"],
            "Налог": payment["НалСт"] ? { "Ставка": payment["НалСт"] } : undefined,
        }
        : undefined;

    // Подписант (только способ подтверждения полномочий и тип подписи,
    // как и в 1110380/1110361 — ФИО/должность из сертификата).
    const signer = doc["ПодпИнфПрв"];

    const substitution: Substitution = {
        "Грузоперевозчик": carrier,
        "Водители": drivers,
        "ТранспортноеСредство": vehicleSemantic,
        "СтоимостьПеревозки": cost,
        "Подписант": signer
            ? {
                "СпособПодтвержденияПолномочий": signer["СпосПодтПолном"],
                "ТипПодписи": signer["ТипПодпис"],
            }
            : undefined,
    };

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
