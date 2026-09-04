/**
 * Конвертер вложения документа ЭЗЗ 1110361
 * («Заказ и заявка — информация грузоотправителя», титул Т1).
 *
 * Метод `СБИС.СгенерироватьВложение` формирует XML из объекта `Подстановка`,
 * ключи которого — **семантические имена полей**, а не XML-теги спецификации.
 * Конструктор {@link Document1110361} выдаёт в `Подстановка` XML-теги
 * (`СодИнфГО`, `СвГО`, …), которые сервер игнорирует. Данный конвертер приводит
 * их к семантическим ключам (формат из Postman-коллекции «Заказ на перевозку»):
 *
 *   { "Документ", "УсловияПеревозки", "Грузоотправитель", "Грузоперевозчик",
 *     "Маршрут", "Груз", "ПараметрыТС", "Файл" }
 *
 * Применение:
 *   generateAttachment(mapDocument1110361(Document1110361(data)))
 */

import { DocumentType, type TDocumentAttachment } from '../../shared';
import type { XmlNode } from '../../../helpers';

type Substitution = Record<string, unknown>;

// ─── Формы XML-тегов, которые выдаёт конструктор (для чтения) ───────────────

type TPersonFullNameXml = { "Фамилия": string; "Имя": string; "Отчество"?: string };

type TLegalEntityXml = { "НаимОрг"?: string; "ИННЮЛ"?: string; "КПП"?: string };

type TIndividualEntrepreneurXml = { "ИННФЛ"?: string; "ОГРНИП"?: string; "ФИО"?: TPersonFullNameXml };

type TIndividualXml = { "ИННФЛ"?: string; "ФИО"?: TPersonFullNameXml };

type TIdentificationXml = {
    "СвЮЛУч"?: TLegalEntityXml;
    "СвИП"?: TIndividualEntrepreneurXml;
    "СвФЛУчаст"?: TIndividualXml;
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

type TAddressInfoXml = {
    "АдрРФ"?: TRussianAddressXml;
    "АдрФИАС"?: Record<string, unknown>;
    "АдрИнф"?: { "КодСтр"?: string; "АдрТекст"?: string };
};

type TContactsXml = { "Тлф"?: string[]; "ЭлПочта"?: string[]; "ИнКонт"?: string };

type TPartyXml = {
    "ИдСв"?: TIdentificationXml;
    "Адрес"?: TAddressInfoXml;
    "Конт"?: TContactsXml;
};

type TInfraOwnerXml = { "НаимВладИнфр"?: string; "ИННВладИнфр"?: string };

type TAddressXml = { "Адрес"?: TAddressInfoXml };

type TVehicleSubmissionPointXml = {
    "ДатВрПод"?: string;
    "ПредВрПод"?: string;
    "АдрПунктПод"?: TAddressXml;
};

type TLoadingUnloadingAddressXml = {
    "Опер"?: string;
    "ПорНомПункт"?: string;
    "ДатВрОпер"?: string;
    "ПредВрОпер"?: string;
    "АдресПункт"?: TAddressXml;
    "ОргВладИнфр"?: TInfraOwnerXml;
};

type TCargoWeightXml = { "МасНетЗнач"?: string; "МасБрутЗнач"?: string };

type TDimensionsXml = { "ВысЗнач"?: string; "ДлЗнач"?: string; "ШирЗнач"?: string };

type TCargoDescriptionXml = {
    "НаимГруз"?: string;
    "СостГруз"?: string;
    "ВидТар"?: string;
    "КолГрМест"?: string;
    "МетОпрМасс"?: string;
    "Объем"?: string;
    "РаспрГр"?: string;
    "ДелГр"?: string;
    "МасГруз"?: TCargoWeightXml;
    "РазмерГрМест"?: TDimensionsXml;
};

type TVehicleRequirementsXml = {
    "Тип"?: string;
    "Грузопод"?: string;
    "Вместим"?: string;
    "ТипПогр"?: string;
    "ТипКуз"?: string;
};

type TAuthorizedPersonXml = {
    "Полн"?: string;
    "РеквДокПолн"?: Record<string, unknown>;
    "РеквЛицГО"?: TPartyXml;
};

type TSignerXml = {
    "Должн"?: string;
    "ТипПодпис"?: string;
    "СпосПодтПолном"?: string;
    "ФИО"?: TPersonFullNameXml;
};

type TContentXml = {
    "СодОпер"?: string;
    "НомЗак"?: string;
    "ДатаЗак"?: string;
    "УкНормПрвз"?: string;
    "ПрвзПищПрод"?: string;
    "СвГО"?: TPartyXml;
    "СвПрв"?: TPartyXml;
    "СвЛицГО"?: TAuthorizedPersonXml;
    "ПунктПод"?: TVehicleSubmissionPointXml;
    "АдрПункт"?: TLoadingUnloadingAddressXml[];
    "ОпГруз"?: TCargoDescriptionXml[];
    "ПарТСПрвз"?: TVehicleRequirementsXml;
};

type TDocumentXml = {
    "НаимЭкСубСост"?: string;
    "СодИнфГО"?: TContentXml;
    "ПодпИнфГО"?: TSignerXml;
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

/** Адрес (`АдрРФ`/`АдрФИАС`/`АдрИнф`) → семантическая пара `{КодСтраны, АдресТекст}`. */
function mapAddressToPair(info: TAddressInfoXml | undefined): Record<string, unknown> | undefined {
    if (!info) return undefined;

    if (info["АдрИнф"]) {
        return {
            "КодСтраны": info["АдрИнф"]["КодСтр"],
            "АдресТекст": info["АдрИнф"]["АдрТекст"],
        };
    }

    if (info["АдрРФ"]) {
        return {
            "КодСтраны": "643",
            "АдресТекст": buildRussianAddressText(info["АдрРФ"]),
        };
    }

    if (info["АдрФИАС"]) {
        return {
            "КодСтраны": "643",
            "АдресТекст": Object.values(info["АдрФИАС"]).filter(Boolean).join(", "),
        };
    }

    return undefined;
}

/** Реквизиты (`ИдСв`) → семантический `Реквизиты.{ЮЛ|ИП|ФЛ}`. */
function mapRequisites(ident: TIdentificationXml | undefined): Record<string, unknown> | undefined {
    if (!ident) return undefined;

    if (ident["СвЮЛУч"]) {
        const org = ident["СвЮЛУч"];
        return {
            "ЮЛ": {
                "ИНН": org["ИННЮЛ"],
                "КПП": org["КПП"],
                "Наименование": org["НаимОрг"],
            },
        };
    }

    if (ident["СвИП"]) {
        const ip = ident["СвИП"];
        return {
            "ИП": {
                "ИНН": ip["ИННФЛ"],
                "ОГРНИП": ip["ОГРНИП"],
                "Фамилия": ip["ФИО"]?.["Фамилия"],
                "Имя": ip["ФИО"]?.["Имя"],
                "Отчество": ip["ФИО"]?.["Отчество"],
            },
        };
    }

    if (ident["СвФЛУчаст"]) {
        const fl = ident["СвФЛУчаст"];
        return {
            "ФЛ": {
                "ИНН": fl["ИННФЛ"],
                "Фамилия": fl["ФИО"]?.["Фамилия"],
                "Имя": fl["ФИО"]?.["Имя"],
                "Отчество": fl["ФИО"]?.["Отчество"],
            },
        };
    }

    return undefined;
}

/** Контакты (`Конт`) → семантический `Контакты`. */
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

/** Сторона (`СвГО`/`СвПрв`) → семантический `Грузоотправитель`/`Грузоперевозчик`. */
function mapParty(party: TPartyXml | undefined): Record<string, unknown> | undefined {
    if (!party) return undefined;

    return {
        "Реквизиты": mapRequisites(party["ИдСв"]),
        "Адрес": mapAddressToPair(party["Адрес"]),
        "Контакты": mapContacts(party["Конт"]),
    };
}

/** Подписант → семантический `Подписант`. */
function mapSigner(signer: TSignerXml | undefined): Record<string, unknown> | undefined {
    if (!signer) return undefined;

    // Как и в ЭПЛ 1110380, через `Подстановка` у подписанта заполняются только
    // способ подтверждения полномочий и тип подписи. ФИО/должность берутся из
    // сертификата КЭП на этапе подписания (`СБИС.ПодготовитьДействие`).
    return {
        "СпособПодтвержденияПолномочий": signer["СпосПодтПолном"],
        "ТипПодписи": signer["ТипПодпис"],
    };
}

// ─── Основной конвертер ─────────────────────────────────────────────────────

/**
 * Конвертирует вложение ЭЗЗ 1110361 из XML-тегов в семантические ключи,
 * принимаемые `СБИС.СгенерироватьВложение`.
 */
export function mapDocument1110361(node: XmlNode): TDocumentAttachment {
    const file = (node["Файл"] ?? {}) as Record<string, unknown>;
    const doc = (file["Документ"] ?? {}) as TDocumentXml;
    const content = doc["СодИнфГО"];

    // Маршрут: отправление + пункты погрузки/выгрузки.
    const route: Record<string, unknown> = {};
    const submission = content?.["ПунктПод"];
    if (submission) {
        route["Отправление"] = {
            ...mapAddressToPair(submission["АдрПунктПод"]?.["Адрес"]),
            "ПодачаТС": {
                "ДатаВремя": submission["ДатВрПод"],
                "ПредельныйИнтервалВремени": submission["ПредВрПод"],
            },
        };
    }
    if (content?.["АдрПункт"]?.length) {
        route["Пункт"] = content["АдрПункт"].map((point) => ({
            ...mapAddressToPair(point["АдресПункт"]?.["Адрес"]),
            "Операция": {
                "Тип": point["Опер"],
                "ДатаВремя": point["ДатВрОпер"],
            },
            "Организация": point["ОргВладИнфр"]
                ? {
                    "Название": point["ОргВладИнфр"]["НаимВладИнфр"],
                    "ИНН": point["ОргВладИнфр"]["ИННВладИнфр"],
                }
                : undefined,
        }));
    }

    // Груз: позиции.
    const cargo: Record<string, unknown> = {};
    if (content?.["ОпГруз"]?.length) {
        cargo["Позиция"] = content["ОпГруз"].map((item) => ({
            "Наименование": item["НаимГруз"],
            "Состояние": item["СостГруз"],
            "ТараКод": item["ВидТар"],
            "Параметры": {
                "КоличествоМест": item["КолГрМест"],
                "Объем": item["Объем"],
                "Масса": {
                    "Брутто": item["МасГруз"]?.["МасБрутЗнач"],
                    "Нетто": item["МасГруз"]?.["МасНетЗнач"],
                },
                "Высота": item["РазмерГрМест"]?.["ВысЗнач"],
                "Длина": item["РазмерГрМест"]?.["ДлЗнач"],
                "Ширина": item["РазмерГрМест"]?.["ШирЗнач"],
            },
            "МетодОпределенияМассы": item["МетОпрМасс"],
            "РаспределениеПоДлинеПлатформы": item["РаспрГр"],
            "Делимость": item["ДелГр"],
        }));
    }

    const vehicle = content?.["ПарТСПрвз"];

    const substitution: Substitution = {
        "Документ": {
            "Номер": content?.["НомЗак"],
            "Дата": content?.["ДатаЗак"],
        },
        "УсловияПеревозки": {
            "ТребованияПоПеревозкеПищевыхПродуктов": content?.["ПрвзПищПрод"],
            "УказанияНорм": content?.["УкНормПрвз"],
            "Иные": content?.["СодОпер"],
        },
        "Грузоотправитель": mapParty(content?.["СвГО"]),
        "Грузоперевозчик": mapParty(content?.["СвПрв"]),
        "Маршрут": route,
        "Груз": cargo,
        "ПараметрыТС": vehicle
            ? {
                "Тип": vehicle["Тип"],
                "Грузоподъемность": vehicle["Грузопод"],
                "Вместимость": vehicle["Вместим"],
                "ТипПогрузки": vehicle["ТипПогр"],
                "ТипКузова": vehicle["ТипКуз"],
            }
            : undefined,
        "Подписант": mapSigner(doc["ПодпИнфГО"]),
    };

    return {
        "Документ": {
            "Вложение": [
                {
                    "ВерсияФормата": "5.01",
                    "Тип": DocumentType.EZZ,
                    "Подтип": "1110361",
                    "Подстановка": substitution,
                },
            ],
        },
    };
}
