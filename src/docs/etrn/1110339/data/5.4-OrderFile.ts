/**
 * Идентификация файла обмена заказа/заявки
 * (таб-5.4)
 */

import { formatDate, formatTime } from '../../../../helpers'

export type TOrderFile = {
    /** 
     * Идентификатор файла обмена заказа (заявки)
     * Содержит (повторяет) имя файла обмена заказа (заявки) без расширения.
     */
    name: string;
    /** Дата/время формирования файла обмена заказа (заявки) */
    createdAt: Date;
    /** Электронная подпись файла обмена заказа (заявки) */
    signBase64: string;
}

export function formatOrderFile({
    name,
    createdAt,
    signBase64,
}: TOrderFile) {
    return {
        "ИдФайлЗак": name,
        "ДатФайлЗак": formatDate(createdAt),
        "ВрФайлЗак": formatTime(createdAt),
        "ЭП": signBase64,
    }
}

export type TOrderFileId = {
    /**
     * Идентификатор файла обмена заказа/заявки
     * (1-255 символов)
     */
    fileId: string

    /**
     * Дата формирования файла обмена заказа/заявки
     */
    date: Date

    /**
     * Время формирования файла обмена заказа/заявки
     */
    time: Date

    /**
     * Электронная подпись
     */
    signBase64: string
}
