/**
 * Сведения о доверенности, используемой для подтверждения полномочий
 * в электронной форме
 * (СвДовер, таб-13.10)
 *
 * Отличается от common/PowerOfAttorney типом поля number (string vs number).
 */

import { formatDate } from '../../../../helpers'

export type TConsigneePowerOfAttorney = {
    /**
     * Дата совершения доверенности.
     */
    date: Date

    /**
     * Номер доверенности: порядковый.
     * (1-100 символов)
     */
    number?: string

    /**
     * Номер доверенности: идентификатор файла доверенности.
     * Содержит (повторяет) имя сформированного файла доверенности (без расширения).
     * (1-255 символов)
     */
    fileId: string

    /**
     * Идентифицирующие сведения об информационной системе,
     * которая предоставляет техническую возможность получения информации
     * о досрочном прекращении действия доверенности.
     * Унифицированный указатель (URL).
     * (1-500 символов)
     */
    revocationSystemUrl?: string
}

export function formatConsigneePowerOfAttorney({ date, number, fileId, revocationSystemUrl }: TConsigneePowerOfAttorney) {
    return {
        "ДатаДовер": formatDate(date),
        "НомерДовер": number,
        "ИдентДовер": fileId,
        "СведСистОтм": revocationSystemUrl,
    }
}
