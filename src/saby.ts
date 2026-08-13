/**
 * Маппинг типов документов и словари действий для JSON-RPC API СБИС Тензор.
 *
 * Эти значения — «данные», отличающие документы ЭТрН / ЭЗЗ / ЭПЛ между собой.
 * Структура вызовов при этом одинакова, поэтому они вынесены в отдельные
 * справочники, а не в доменные сервисы.
 */

import { DocumentType } from "./docs/shared";

// ─── Тип документа в карточке Saby ───────────────────────────────────────────

/**
 * Маппинг `DocumentType` (тип вложения) → параметры записи документа.
 *
 * Единый источник истины: `Документ.Тип` (`type`) и
 * `Документ.Регламент.Название` (`regulationName`) выводятся отсюда.
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

// ─── Действия ЭТрН ───────────────────────────────────────────────────────────

/**
 * Действия ЭТрН (`Этап.Действие.Название`).
 * @see how-to.md — порядок титулов Т1–Т9.
 */
export const EtRnAction = Object.freeze({
    /** Т1 — грузоотправитель: «Погружен» */
    Loaded: "Погружен",
    /** Т2 — перевозчик: «Принят» */
    Accepted: "Принят",
    /** Т3 — грузополучатель: «Получен» */
    Received: "Получен",
    /** Т4 — перевозчик: «Выдан» */
    Issued: "Выдан",
    /** Т5 — перевозчик (изменение стоимости): «Согласовать» */
    Approve: "Согласовать",
    /** Т6 — грузоотправитель (согласование): «Согласовано» */
    Approved: "Согласовано",
    /** Т7 — переадресовка: «Переадресован» */
    Readdressed: "Переадресован",
    /** Т8 — замена водителя/ТС: «Замена водителей/ТС» */
    ReplacedVehicle: "Замена водителей/ТС",
    /** Т9 — уведомление о переадресовке: «Уведомить» */
    Notify: "Уведомить",
} as const);

export type TEtRnAction = (typeof EtRnAction)[keyof typeof EtRnAction];

// ─── Действия ЭЗЗ ────────────────────────────────────────────────────────────

/**
 * Действия ЭЗЗ (`Этап.Действие.Название`).
 * @see how-to.md — порядок титулов Т1–Т2.
 */
export const EzzAction = Object.freeze({
    /** Т1 — заказчик: «Отправить» */
    Send: "Отправить",
    /** Т2 — перевозчик: «Утвердить» */
    Approve: "Утвердить",
    /** Т2 — перевозчик: «Отклонить» */
    Reject: "Отклонить",
} as const);

export type TEzzAction = (typeof EzzAction)[keyof typeof EzzAction];

// ─── Действия ЭПЛ ────────────────────────────────────────────────────────────

/**
 * Действия ЭПЛ (`Этап.Действие.Название`).
 * @see how-to.md — порядок титулов Т1–Т5.
 */
export const EplAction = Object.freeze({
    /** Т1 — оформитель: «Отправить» */
    Send: "Отправить",
    /** Т2 — медосмотр: «Допущен» */
    Admitted: "Допущен",
    /** Т3/Т4 — выпуск (техосмотр/выезд): «Выпущен» */
    Released: "Выпущен",
    /** Т5 — приёмка (заезд): «Принят» */
    Accepted: "Принят",
} as const);

export type TEplAction = (typeof EplAction)[keyof typeof EplAction];

/**
 * Объединённый тип действия для {@link import("./client").SabyTmsClient#prepareAction}.
 */
export type TSabyAction = TEtRnAction | TEzzAction | TEplAction;
