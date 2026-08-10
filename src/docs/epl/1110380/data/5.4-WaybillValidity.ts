/**
 * Сведения о сроке действия путевого листа
 * (СрокПЛ, таб-5.4)
 */

import { formatDate } from '../../../../helpers'

export type TWaybillValidity = {
    /**
     * Признак формирования путевого листа на один день.
     * true — да (1), false — нет (2).
     */
    isSingleDay: boolean

    /**
     * Дата, в течение которой путевой лист может быть использован.
     * Обязательна при {isSingleDay} = true.
     */
    singleDayDate?: Date

    /**
     * Дата начала срока использования путевого листа.
     * Обязательна при {isSingleDay} = false.
     */
    startDate?: Date

    /**
     * Дата окончания срока использования путевого листа.
     * Обязательна при {isSingleDay} = false.
     */
    endDate?: Date
}

export function formatWaybillValidity(data: TWaybillValidity) {
    if (data.isSingleDay) {
        if (!data.singleDayDate) {
            throw new TypeError(
                "Требуется указать singleDayDate при isSingleDay = true"
            )
        }
        return {
            "ПЛДень": "1",
            "ДатаИспПЛ": formatDate(data.singleDayDate),
        }
    }
    if (!data.startDate || !data.endDate) {
        throw new TypeError(
            "Требуется указать startDate и endDate при isSingleDay = false"
        )
    }
    return {
        "ПЛДень": "2",
        "ДатаНачИспПЛ": formatDate(data.startDate),
        "ДатаКонИспПЛ": formatDate(data.endDate),
    }
}