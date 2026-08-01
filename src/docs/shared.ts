
export type TDocumentMeta = {
    version?: string;
    type: string;
    subtype: string;
}

export function Document<T extends object>({
    type,
    subtype,
    version = "5.01",
}: TDocumentMeta, content: T) {
    return {
        "Документ": {
            "Вложение": {
                "ВерсияФормата": version,
                "Тип": type,
                "Подтип": subtype,
                "Подстановка": { 
                    [subtype]: { "Файл": content },
                }
            }
        }
    }
}

/** 
 * Класс заглушка для типов и значений
 * @example
 * { "НеизвЗнач": TODO }
 * @example
 * type TSomeType = {
 *   unknown: TODO;
 * }
 */
export class TODO {
    constructor() {
        throw new Error("TODO: Not implemented type")
    }
}