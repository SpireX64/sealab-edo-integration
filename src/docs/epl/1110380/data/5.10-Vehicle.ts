/**
 * Транспортное средство
 * (ТС, таб-5.10)
 */

export type TVehicle = {
    /**
     * Тип транспортного средства согласно паспорту
     * транспортного средства.
     * (1-1000 символов)
     */
    type: string

    /**
     * Марка транспортного средства согласно паспорту
     * транспортного средства.
     * (1-1000 символов)
     */
    brand: string

    /**
     * Модель транспортного средства согласно паспорту
     * транспортного средства.
     * (1-1000 символов)
     */
    model: string

    /**
     * Государственный регистрационный номер транспортного средства.
     * Обязателен при отсутствии {inventoryNumber}.
     * (1-9 символов)
     */
    registrationNumber?: string

    /**
     * Инвентарный номер.
     * Заполняется для троллейбусов и трамваев.
     * Обязателен при отсутствии {registrationNumber}.
     * (1-60 символов)
     */
    inventoryNumber?: string
}

export function formatVehicle(data: TVehicle) {
    if (!data.registrationNumber && !data.inventoryNumber) {
        throw new TypeError(
            "Требуется указать registrationNumber или inventoryNumber"
        )
    }

    return {
        "Тип": data.type,
        "Марка": data.brand,
        "Модель": data.model,
        "РегНомер": data.registrationNumber,
        "ИнвНомер": data.inventoryNumber,
    }
}