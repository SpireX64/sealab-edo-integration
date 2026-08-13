import type { GoskeySignatureKind } from "./consts";

/** Внешний провайдер привязки (соцсеть/ЕСИА). */
export type TGoskeyProvider = {
    /** Имя провайдера (Yandex, Esia, ...). */
    name: string;

    /** Ссылка для завершения привязки. */
    url?: string;
};

/** Привязанный внешний провайдер. */
export type TLinkedProvider = {
    /** Идентификатор профиля. */
    profileId?: string;

    /** Имя провайдера. */
    providerName?: string;
};

/** Входные данные создания криптооперации подписания. */
export type TGoskeyOperationInput = {
    /** Вид подписи. */
    signatureKind: GoskeySignatureKind;

    /** Идентификатор документа (из `СписокИзменений`). */
    documentId: string;

    /** Файлы вложения для подписания. */
    files: { attachmentId: string }[];

    /** ОГРН юридического лица (для КЭПЮЛ). */
    ogrn?: string;

    /** ОГРНИП индивидуального предпринимателя (для КЭПЮЛ). */
    ogrnip?: string;

    /** СНИЛС руководителя ЮЛ (для КЭПЮЛ). */
    headSnils?: string;

    /** Операция. По умолчанию "createDetachedSign". */
    operation?: string;

    /** Тип сертификата. По умолчанию "Госключ". */
    certificateType?: string;
};

/** Подписанный файл в результате операции. */
export type TGoskeySignedFile = {
    /** Идентификатор вложения. */
    attachmentId?: string;

    /** Внутренний идентификатор файла. */
    id?: string;

    /** Имя файла. */
    name?: string;

    /** Подписанные данные (base64). */
    result?: string;
};

/** Криптооперация подписания. */
export type TGoskeyOperation = {
    /** Имя операции. */
    operation?: string;

    /** Идентификатор операции (для getStatus). */
    operationId?: string;

    /** Время старта. */
    operationStarted?: string;

    /** Время завершения. */
    operationCompleted?: string;

    /** Статус операции (Registered / Received / ...). */
    operationStatus?: string;

    /** Идентификатор документа. */
    documentId?: string;

    /** Подписанные файлы (заполняются после завершения). */
    files?: TGoskeySignedFile[];
};
