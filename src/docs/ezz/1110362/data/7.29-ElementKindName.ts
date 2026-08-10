/**
 * Сведения о виде и наименовании адресного элемента
 * (ВидНаимТип, таб-7.29)
 */

export type TElementKindName = {
    /**
     * Вид элемента.
     * (1-50 символов)
     */
    kind: string

    /**
     * Наименование элемента.
     * (1-255 символов)
     */
    name: string
}

export function formatElementKindName(data: TElementKindName) {
    return {
        "Вид": data.kind,
        "Наим": data.name,
    }
}