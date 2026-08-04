/**
 * Сведения о доверенности в машиночитаемом виде,
 * используемой для подтверждения полномочий
 * (СвДоверЭл, таб-5.14)
 */

import { formatDate } from '../../../../helpers'

export type TElectronicPOA = {
    /**
     * Номер доверенности.
     * Уникальный идентификатор доверенности в виде 36-разрядного GUID
     * из имени файла (единый регистрационный номер доверенности).
     * (36 символов)
     */
    number: string

    /**
     * Дата совершения доверенности.
     */
    issueDate: Date

    /**
     * Внутренний регистрационный номер доверенности.
     * (1-50 символов)
     */
    internalNumber?: string

    /**
     * Дата внутренней регистрации доверенности.
     */
    internalRegistrationDate?: Date

    /**
     * Идентифицирующая информация об информационной системе,
     * в которой осуществляется хранение доверенности,
     * необходимая для запроса информации из такой системы.
     * (1-500 символов)
     */
    storageSystemInfo: string
}

export function formatElectronicPOA(data: TElectronicPOA) {
    return {
        "НомДовер": data.number,
        "ДатаДовер": formatDate(data.issueDate),
        "ВнНомДовер": data.internalNumber,
        "ДатаВнРегДовер": data.internalRegistrationDate && formatDate(data.internalRegistrationDate),
        "ИдСистХран": data.storageSystemInfo,
    }
}
