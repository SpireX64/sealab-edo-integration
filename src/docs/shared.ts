export enum DocumentType {
    /** ЭТрН - Транспортная накладная */
    ETRN = "ЭТрН",
    /** ЭЗЗ - Заказ заявка на перевозку */
    EZZ = "ЗаказЗаявка",
    /** ЭПЛ - Путевой лист */
    EPL = "ЭПЛ"
}

export enum DocumentStructure {
    File = "File",
    List = 'Array',
}

export type TDocumentMeta<TSubtype extends string = string> = {
    version?: string;
    type: DocumentType;
    subtype: TSubtype;
    structure?: DocumentStructure
}

export type TDocumentContent<TSubstitution = Record<string, unknown>> = {
    "ВерсияФормата": string;
    "Тип": DocumentType;
    "Подтип": string;
    "Подстановка": TSubstitution;
}

/**
 * Структура вложения (титула) документа, формируемая
 * конструктором {@link Document}.
 *
 * @typeParam TSubstitution - тип содержимого «Подстановка».
 */
export type TDocumentAttachment<TSubstitution = Record<string, unknown>> = {
    "Документ": {
        "Вложение": TDocumentContent<TSubstitution> | TDocumentContent<TSubstitution>[];
    };
};

export function Document<TContent extends object, const TSubtype extends string>(
    {
        type,
        subtype,
        version = "5.01",
        structure = DocumentStructure.List,
    }: TDocumentMeta<TSubtype>,
    content: TContent,
): TDocumentAttachment<unknown> {
    switch (structure) {
        case DocumentStructure.File:
            return {
                "Документ": {
                    "Вложение": {
                        "ВерсияФормата": version,
                        "Тип": type,
                        "Подтип": subtype,
                        "Подстановка": {
                            [subtype]: {
                                "ВерсФорм": version,
                                "Файл": content,
                            },
                        },
                    },
                },
            };


        case DocumentStructure.List:
            return {
                "Документ": {
                    "Вложение": [
                        {
                            "ВерсияФормата": version,
                            "Тип": type,
                            "Подтип": subtype,
                            // @ts-ignore
                            "Подстановка": content,
                        }
                    ]
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