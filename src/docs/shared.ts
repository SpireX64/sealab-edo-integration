import { v4 as uuidv4 } from "uuid";

import { encodeWindows1251, formatFileDate, toXml, type XmlNode } from "../helpers";

export enum DocumentType {
    /** ЭТрН - Транспортная накладная */
    ETRN = "ЭТрН",
    /** ЭЗЗ - Заказ заявка на перевозку */
    EZZ = "ЗаказЗаявка",
    /** ЭПЛ - Путевой лист */
    EPL = "ЭПЛ"
}

/**
 * Метаданные для формирования имени файла обмена (`ИдФайл`) и `ВерсПрог`
 * при локальной сборке XML-файла конструкторами `Document*`.
 */
export type TFileXmlMeta = {
    /** Краткое имя и версия программы, сформировавшей файл (`ВерсПрог`). */
    programTag?: string;
    /** Идентификатор отправителя (`ИдОЭДО` + код) для позиции «О» имени файла. */
    senderId?: string;
    /** GUID файла обмена (`N`). Если не передан — генерируется UUIDv4. */
    documentId?: string;
    /** Дата/время создания документа. По умолчанию — текущий момент. */
    documentCreatedAt?: Date;
};

/**
 * Префиксы имён файлов обмена (`ИдФайл`) по подтипу документа.
 * Формат ФНС (ГИС ЭПД): `ON_<кодВидаФайла>_…_0_<ГГГГММДД>_<GUID>`.
 */
const FILE_ID_PREFIX: Readonly<Record<string, string>> = {
    // ЭТрН
    "1110339": "ON_TRNACLGROT",  // Т1 — информация грузоотправителя
    "1110340": "ON_TRNACLGRPO",  // Т2 — информация перевозчика о приёме груза
    "1110341": "ON_TRNACLPPRIN", // Т3 — информация грузополучателя
    // ЭЗЗ
    "1110361": "ON_ZAKZVGO",     // Т1 — информация грузоотправителя
    "1110362": "ON_ZAKZVPER",    // Т2 — информация перевозчика
    // ЭПЛ
    "1110380": "ON_PTLSSOBTS",   // Т1 — обстоятельства и особенности рейса
    "1110381": "ON_PTLSPRMO",    // Т2 — предрейсовый медосмотр
    "1110382": "ON_PTLSVIPTS",   // Т3 — техсостояние и выпуск ТС
    "1110383": "ON_PTLSODVZD",   // Т4 — одометр при выезде
    "1110384": "ON_PTLSODPARK",  // Т5 — одометр при заезде
};

/**
 * Собирает XML-узел файла обмена ФНС (ГИС ЭПД, версия 5.01):
 *
 *   <Файл ВерсФорм="5.01" ИдФайл="ON_<код>…" [ВерсПрог="…"]>
 *       <Документ КНД="<подтип>" …>…</Документ>
 *   </Файл>
 *
 * Используется конструкторами `Document*` (кроме `Document1110380`, который
 * уже возвращает XmlNode) — их результат готов к сериализации через
 * {@link toXml}.
 *
 * @example
 * const xml = toXml(Document1110361(data));
 */
export function fileNode(
    subtype: string,
    version: string,
    content: Record<string, unknown>,
    meta: TFileXmlMeta = {},
): XmlNode {
    const documentCreatedAt = meta.documentCreatedAt ?? new Date();
    const documentId = meta.documentId ?? uuidv4();
    const prefix = FILE_ID_PREFIX[subtype] ?? `ON_${subtype}`;

    return {
        "Файл": {
            "ВерсФорм": version,
            "ИдФайл": `${prefix}____${meta.senderId ?? ""}_0_${formatFileDate(documentCreatedAt)}_${documentId}`,
            "ВерсПрог": meta.programTag,
            "Документ": {
                "КНД": subtype,
                ...content,
            },
        },
    };
}

/**
 * Маппинг «подтип документа (КНД) → семейство документа».
 * Используется {@link toAttachment} для вывода `Тип` вложения.
 */
const SUBTYPE_TO_DOCUMENT_TYPE: Readonly<Record<string, DocumentType>> = {
    // ЭТрН
    "1110339": DocumentType.ETRN,
    "1110340": DocumentType.ETRN,
    "1110341": DocumentType.ETRN,
    // ЭЗЗ
    "1110361": DocumentType.EZZ,
    "1110362": DocumentType.EZZ,
    // ЭПЛ
    "1110380": DocumentType.EPL,
    "1110381": DocumentType.EPL,
    "1110382": DocumentType.EPL,
    "1110383": DocumentType.EPL,
    "1110384": DocumentType.EPL,
};

/**
 * Маппинг `DocumentType` (тип вложения) → параметры записи документа
 * (`Документ.Тип` и `Документ.Регламент.Название`).
 *
 * Единый источник истины: `Тип` и название регламента выводятся отсюда
 * фабрикой {@link toAttachment} и методом `listChanges` клиента.
 */
export const DOCUMENT_TYPE_TO_SABY = {
    [DocumentType.ETRN]: {
        type: "ConsignmentNote",
        regulationName: "Транспортная накладная",
    },
    [DocumentType.EZZ]: {
        type: "TransportOrder",
        regulationName: "Заказ на перевозку",
    },
    [DocumentType.EPL]: {
        type: "Waybill",
        regulationName: "ЭПЛ",
    },
} as const satisfies Record<DocumentType, { type: string; regulationName: string }>;

/**
 * Тип документа в карточке Saby (`Документ.Тип` при записи).
 * Выводится из {@link DOCUMENT_TYPE_TO_SABY} — не дублирует `DocumentType`.
 */
export type SabyDocumentType = (typeof DOCUMENT_TYPE_TO_SABY)[keyof typeof DOCUMENT_TYPE_TO_SABY]["type"];

/**
 * Готовое тело документа для `СБИС.ЗаписатьДокумент` / `СБИС.ЗаписатьВложение`.
 *
 * Собирается фабрикой {@link toAttachment} из результата конструктора
 * `Document*`: XML-файл обмена (windows-1251 → base64) + `Тип`/`Регламент`
 * карточки Saby. Клиенту остаётся добавить лишь `НашаОрганизация`
 * (реквизиты аутентифицированной организации).
 */
export type TReadyAttachment = {
    /** Тип документа в карточке Saby (ConsignmentNote / TransportOrder / Waybill). */
    "Тип": SabyDocumentType;
    /** Название регламента документооборота. */
    "Регламент": { "Название": string };
    /** Файл обмена: имя `<ИдФайл>.xml` + содержимое XML в base64. */
    "Вложение": {
        "Файл": {
            "ДвоичныеДанные": string;
            "Имя": string;
        };
    }[];
};

/**
 * Собирает полностью готовое тело документа из XML-узла (результата
 * конструктора `Document*`):
 *
 *   1. сериализует узел в XML-строку через {@link toXml};
 *   2. кодирует её в windows-1251 и упаковывает в base64 (`ДвоичныеДанные`);
 *   3. берёт `Имя` = `ИдФайл` + `.xml`;
 *   4. выводит `Тип`/`Регламент` по КНД (`SUBTYPE_TO_DOCUMENT_TYPE` →
 *      {@link DOCUMENT_TYPE_TO_SABY}).
 *
 * Результат сразу передаётся в {@link import("../client").SabyTmsClient#writeDocument}
 * без дополнительных мапперов:
 *
 * @example
 * const body = toAttachment(Document1110361(data, meta));
 * const card = await client.writeDocument(body);
 */
export function toAttachment(node: XmlNode): TReadyAttachment {
    const file = node["Файл"] as Record<string, unknown> | undefined;
    if (!file || typeof file !== "object") {
        throw new Error("Ожидается XML-узел <Файл> — результат конструктора Document*.");
    }

    const document = file["Документ"] as Record<string, unknown> | undefined;
    const subtype = String(document?.["КНД"] ?? "");
    const fileId = String(file["ИдФайл"] ?? "");
    if (!subtype || !fileId) {
        throw new Error("В узле <Файл> не найдены КНД или ИдФайл.");
    }

    const type = SUBTYPE_TO_DOCUMENT_TYPE[subtype];
    if (!type) {
        throw new Error(`Неизвестный подтип документа: "${subtype}".`);
    }

    const saby = DOCUMENT_TYPE_TO_SABY[type];
    const xml = toXml(node);
    const base64 = encodeWindows1251(xml).toString("base64");

    return {
        "Тип": saby.type,
        "Регламент": { "Название": saby.regulationName },
        "Вложение": [
            {
                "Файл": {
                    "ДвоичныеДанные": base64,
                    "Имя": `${fileId}.xml`,
                },
            },
        ],
    };
}

/** 
 * Класс заглушка для типов и значений
 * @example
 * { "НеизвЗнач": TODO }
 * @example
 * type TSomeType = {
 *   unknown: TODO;
 * }
 */
export class TODO {
    constructor() {
        throw new Error("TODO: Not implemented type")
    }
}