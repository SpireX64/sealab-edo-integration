/**
 * Сведения об иностранном лице, не состоящем на учете в налоговых органах
 * в качестве налогоплательщика
 * (СвИнНеУчТрНТип, общий тип для документов ЭТрН)
 *
 * Используется в таб-5.27 (1110339) и таб-7.10 (1110340).
 */

import { formatForeignPersonIdDocument } from './ForeignPersonIdDocument'
import type { TForeignPersonIdDocument } from './ForeignPersonIdDocument'

export type TForeignEntityNotRegistered =
    | {
        /** Является юридическим лицом */
        legalEntity: true

        /**
         * Страна.
         * (1-255 символов)
         */
        country: string

        /**
         * Наименование юридического лица полное.
         * Обязателен при отсутствии {id} и {extra}.
         * (1-1000 символов)
         */
        name?: string

        /**
         * Идентификатор иностранного лица.
         * Обязателен при отсутствии {name} и {extra}.
         * (1-255 символов)
         */
        id?: string

        /**
         * Иные сведения, идентифицирующие иностранное лицо.
         * Обязателен при отсутствии {name} и {id}.
         * (1-255 символов)
         */
        extra?: string
    }
    | {
        /** Является физическим лицом */
        legalEntity: false

        /**
         * Фамилия, имя, отчество (при наличии) физического лица.
         * (1-1000 символов)
         */
        name: string

        /**
         * Данные документа, удостоверяющего личность
         * иностранного физического лица.
         */
        idDocument: TForeignPersonIdDocument
    }

/**
 * Форматирует данные иностранного лица в плоскую структуру (без обёртки «СвИнНеУч»).
 * Обёртка добавляется на уровне потребителя (таб-5.27), если нужна.
 */
export function formatForeignEntityNotRegistered(data: TForeignEntityNotRegistered) {
    if (data.legalEntity) {
        if (!data.name && !data.id && !data.extra) {
            throw new TypeError(
                "Требуется указать наименование (name), идентификатор (id) " +
                "или иные сведения (extra) для иностранного юридического лица"
            )
        }

        return {
            "ИдСтат": "ЮЛ",
            "Идентиф": data.id,
            "Стран": data.country,
            "Наим": data.name,
            "ИныеСвед": data.extra,
        }
    }

    return {
        "ИдСтат": "ФЛ",
        "Наим": data.name,
        "УдЛичнИнФЛ": formatForeignPersonIdDocument(data.idDocument),
    }
}
