/**
 * Конвертер вложения документа ЭПЛ 1110381
 * («Путевой лист — информация о результате предсменного/предрейсового
 * медицинского осмотра», титул Т2).
 *
 * Метод `СБИС.СгенерироватьВложение` формирует XML из объекта `Подстановка`,
 * ключи которого — **семантические имена полей**, а не XML-теги спецификации.
 * Конструктор {@link Document1110381} выдаёт в `Подстановка` XML-теги
 * (`СодИнфМО`, `СвМедРаб`, …), которые сервер игнорирует. Данный конвертер
 * приводит их к семантическим ключам (формат из Postman-коллекции ЭПЛ):
 *
 *   { "Медосмотр": { "Вид", "Ответственный", "Водитель", "Результат" } }
 *
 * Применение:
 *   generateAttachment(mapDocument1110381(Document1110381(data)))
 */

import { DocumentType, type TDocumentAttachment } from '../../shared';

type Substitution = Record<string, unknown>;

// ─── Формы XML-тегов, которые выдаёт конструктор (для чтения) ───────────────

type TPersonFullNameXml = {
    "Фамилия": string;
    "Имя": string;
    "Отчество"?: string;
};

type TMedicalLicenseXml = {
    "Сер"?: string;
    "Ном"?: string;
    "ДатВыд"?: string;
    "Срок"?: string;
};

type TMedicalWorkerStaffXml = {
    "Должн"?: string;
    "ФИО"?: TPersonFullNameXml;
    "ЛицензМО"?: TMedicalLicenseXml;
};

type TMedicalWorkerOrgXml = TMedicalWorkerStaffXml & {
    "НаимМедОрг"?: string;
};

type TDriverLicenseXml = {
    "НомВУ"?: string;
    "СерВУ"?: string;
    "ДатаВыдВУ"?: string;
};

type TDriverExamXml = {
    "ИННФЛ"?: string;
    "ВодитУд"?: TDriverLicenseXml;
    "ФИО"?: TPersonFullNameXml;
};

type TMedicalExamPassXml = {
    "ДатВрПрМО"?: string;
    "НалКоорТочВрПрМО"?: string;
    "ОтметМОПред"?: string;
    "СвВодит"?: TDriverExamXml;
};

type TMedicalExamContentXml = {
    "УИД_ПЛ"?: string;
    "ВидМО"?: string;
    "СвМедРаб"?: TMedicalWorkerStaffXml;
    "СвМедОрг"?: TMedicalWorkerOrgXml;
    "СвМОПред"?: TMedicalExamPassXml;
};

type TSignerXml = {
    "ТипПодпис"?: string;
    "СпосПодтПолном"?: string;
    "Должн"?: string;
    "ФИО"?: TPersonFullNameXml;
};

type TDocumentXml = {
    "ИдИнфСоб"?: Record<string, unknown>;
    "СодИнфМО"?: TMedicalExamContentXml;
    "ПодпИнфМО"?: TSignerXml;
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

/** Лицензия (`ЛицензМО`) → семантическая `Лицензия`. */
function mapLicense(license: TMedicalLicenseXml | undefined): Record<string, unknown> | undefined {
    if (!license) return undefined;

    return {
        "Серия": license["Сер"],
        "Номер": license["Ном"],
        "ДатаВыдачи": license["ДатВыд"],
        "Срок": license["Срок"],
    };
}

/** Ответственный (`СвМедРаб`/`СвМедОрг`) → семантический `Ответственный`. */
function mapResponsible(
    staff: TMedicalWorkerStaffXml | undefined,
    org: TMedicalWorkerOrgXml | undefined,
): Record<string, unknown> | undefined {
    const source = staff ?? org;
    if (!source) return undefined;

    const result: Record<string, unknown> = {
        "Должность": source["Должн"],
        ...mapFullName(source["ФИО"]),
        "Лицензия": mapLicense(source["ЛицензМО"]),
    };

    if (org?.["НаимМедОрг"]) {
        result["Организация"] = org["НаимМедОрг"];
    }

    return result;
}

/** Водитель (`СвВодит`) → семантический `Водитель`. */
function mapDriver(driver: TDriverExamXml | undefined): Record<string, unknown> | undefined {
    if (!driver) return undefined;

    // ФИО водителя задаётся плоскими ключами (как у `Ответственный`),
    // а не вложенным объектом `ФИО` — это подтверждено эмпирически.
    const result: Record<string, unknown> = {
        "ИНН": driver["ИННФЛ"],
        ...mapFullName(driver["ФИО"]),
    };

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

// ─── Основной конвертер ─────────────────────────────────────────────────────

/**
 * Конвертирует вложение ЭПЛ 1110381 из XML-тегов в семантические ключи,
 * принимаемые `СБИС.СгенерироватьВложение`.
 */
export function mapDocument1110381(attachment: TDocumentAttachment): TDocumentAttachment {
    const list = attachment["Документ"]["Вложение"];
    const source = (Array.isArray(list) ? list[0] : list) as TAttachmentList;

    const doc = source["Подстановка"]["Документ"];
    const content = doc["СодИнфМО"];

    const substitution: Substitution = {
        "Медосмотр": {
            "Вид": content?.["ВидМО"],
            "Ответственный": mapResponsible(content?.["СвМедРаб"], content?.["СвМедОрг"]),
            "Водитель": mapDriver(content?.["СвМОПред"]?.["СвВодит"]),
            "Результат": {
                "ДатаВремя": content?.["СвМОПред"]?.["ДатВрПрМО"],
                "КоордВремя": content?.["СвМОПред"]?.["НалКоорТочВрПрМО"],
                "Решение": content?.["СвМОПред"]?.["ОтметМОПред"],
            },
        },
    };

    // Подписант: как и в 1110380, через `Подстановка` передаются только
    // способ подтверждения полномочий и тип подписи; ФИО/должность берутся
    // из сертификата на этапе подписания (`СБИС.ПодготовитьДействие`).
    const signer = doc["ПодпИнфМО"];
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
