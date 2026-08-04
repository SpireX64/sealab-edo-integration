/**
 * Сведения о типе и наименовании адресного элемента
 * (ТипНаимТип, таб-5.32)
 */

export type TElementTypeName = {
    /**
     * Тип элемента.
     * (1-50 символов)
     */
    elementType: string

    /**
     * Наименование элемента.
     * (1-255 символов)
     */
    name: string
}

export function formatElementTypeName(data: TElementTypeName) {
    return {
        "Тип": data.elementType,
        "Наим": data.name,
    }
}
