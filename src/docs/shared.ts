export enum DocumentType {
    /** ЭТрН - Транспортная накладная */
    ETRN = "ЭТрН",
    /** ЭЗЗ - Заказ заявка на перевозку */
    EZZ = "ЗаказЗаявка",
    /** ЭПЛ - Путевой лист */
    EPL = "ЭПЛ"
}

export type TDocumentMeta<TSubtype extends string = string> = {
    version?: string;
    type: DocumentType;
    subtype: TSubtype;
}

/**
 * Структура вложения (титула) документа, формируемая
 * конструктором {@link Document}.
 *
 * @typeParam TSubstitution - тип содержимого «Подстановка».
 */
export type TDocumentAttachment<TSubstitution = Record<string, unknown>> = {
    "Документ": {
        "Вложение": {
            "ВерсияФормата": string;
            "Тип": DocumentType;
            "Подтип": string;
            "Подстановка": TSubstitution;
        };
    };
};

export function Document<TContent extends object, const TSubtype extends string>(
    {
        type,
        subtype,
        version = "5.01",
    }: TDocumentMeta<TSubtype>,
    content: TContent,
): TDocumentAttachment<Record<TSubtype, TContent>> {
    const substitution = { [subtype]: content } as Record<TSubtype, TContent>

    return {
        "Документ": {
            "Вложение": {
                "ВерсияФормата": version,
                "Тип": type,
                "Подтип": subtype,
                "Подстановка": substitution,
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