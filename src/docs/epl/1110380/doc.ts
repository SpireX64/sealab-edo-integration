/**
 * Путевой лист, информация об обстоятельствах и особенностях рейса
 * (ЭПЛ, 1110380) (таб-5.2)
 */

import { v4 as uuidv4 } from "uuid";
import { formatDate, formatFileDate, formatTime, type XmlNode } from '../../../helpers'
import { TripStartSign, formatTripStartSign } from './consts'
import { formatWaybillContent, type TWaybillContent } from './data/5.3-WaybillContent';
import { formatWaybillSigner, type TWaybillSigner } from './data/5.22-WaybillSigner';

export type TDocument1110380 = {
    /**
     * Номер путевого листа.
     * (1-36 символов)
     */
    number?: string

    /**
     * Дата путевого листа.
     */
    issueDate?: Date

    /**
     * Признак начала рейса.
     * 1 – выезд с парковки (парковочного места);
     * 2 – прием-сдача транспортного средства последующим водителем
     * по окончании рабочего дня (смены) предыдущего водителя
     * (в случае оформления или формирования нескольких путевых листов
     * на одно транспортное средство).
     */
    tripStartSign: TripStartSign

    /**
     * Уникальный идентификатор предыдущего путевого листа.
     * Обязателен при {tripStartSign} = VehicleHandover (2).
     * В иных случаях не заполняется.
     * (1-36 символов)
     */
    previousWaybillId?: string

    /**
     * Содержание путевого листа, информация об обстоятельствах
     * и особенностях рейса.
     * (таб-5.3)
     */
    content: TWaybillContent

    /**
     * Сведения о лице, подписывающем файл обмена информации
     * об обстоятельствах и особенностях рейса в электронной форме.
     * (таб-5.22)
     */
    signer: TWaybillSigner
}

/** Служебные параметры формирования файла обмена. */
export type TFileMeta1110380 = {
    /**
     * Краткое имя и версия программы, сформировавшей файл (`ВерсПрог`).
     * Не фиксируется библиотекой — каждое приложение задаёт своё.
     */
    programTag?: string;
    /** Идентификатор отправителя (`ИдОЭДО` + код) для позиции `О` имени файла. */
    senderId?: string;
    /**
     * GUID файла обмена (`N`) — используется только для уникальности имени файла.
     * Не путать с `УИД_ПЛ` (идентификатор документа из ГИС ЭПД) и `НомерПЛ`.
     * Если не передан — генерируется UUIDv4.
     */
    documentId?: string;
    /** Дата/время создания документа. По умолчанию — текущий момент. */
    documentCreatedAt?: Date;
};

/** Формирует имя файла обмена (без расширения `.xml`). */
function buildFileId(meta: TFileMeta1110380, documentCreatedAt: Date): string {
    const documentId = meta.documentId ?? uuidv4();
    // Позиции A/E/F (получатели Т2–Т5) для Т1 пусты → 4 подчёркивания перед «О».
    return `ON_PTLSSOBTS____${meta.senderId ?? ""}_0_${formatFileDate(documentCreatedAt)}_${documentId}`;
}

export const Document1110380 = (data: TDocument1110380, meta: TFileMeta1110380 = {}): XmlNode => {
    if (data.tripStartSign === TripStartSign.VehicleHandover && !data.previousWaybillId) {
        throw new TypeError(
            "Требуется указать previousWaybillId при tripStartSign = VehicleHandover (2)"
        )
    }

    const documentCreatedAt = meta.documentCreatedAt ?? new Date();

    return {
        "Файл": {
            "ВерсФорм": "5.01",
            "ИдФайл": buildFileId(meta, documentCreatedAt),
            "ВерсПрог": meta.programTag,
            "Документ": {
                "КНД": "1110380",
                "ДатИнфСоб": formatDate(documentCreatedAt),
                "ВрИнфСоб": formatTime(documentCreatedAt),
                "НомерПЛ": data.number,
                "ДатаПЛ": data.issueDate && formatDate(data.issueDate),
                "ПризнНачРейс": formatTripStartSign(data.tripStartSign),
                "УИДПЛПред": data.previousWaybillId,
                "СодИнфСоб": formatWaybillContent(data.content),
                "ПодпИнфСоб": formatWaybillSigner(data.signer),
            },
        },
    }
}
