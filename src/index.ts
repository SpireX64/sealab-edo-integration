/**
 * Публичное API пакета saby-tms-client.
 *
 * Содержит только ре-экспорты: клиент, документы и их типы.
 */

// Клиент
export { SabyEnv, SabyTmsClient } from "./client";

// Справочники и фабрики
export { organization } from "./organization";
export type {
    TEntrepreneurOrganization,
    TIndividualOrganization,
    TLegalOrganization,
    TOrganization,
    TOrganizationInput,
} from "./organization";

export { DOCUMENT_TYPE_TO_SABY, EtRnAction, EplAction, EzzAction } from "./saby";
export type {
    SabyDocumentType,
    TEplAction,
    TEtRnAction,
    TEzzAction,
    TSabyAction,
} from "./saby";

// Типы клиента
export type {
    TCertificateRef,
    TDocumentCard,
    TDocumentCardAttachment,
    TDocumentState,
    TExecuteActionOptions,
    TListChangesOptions,
    TLoginCredentials,
    TPrepareActionOptions,
    TWriteAttachmentOptions,
    TWriteDocumentOptions,
} from "./types";

// Саб-клиенты (сотрудники, ТС, подпись)
export * from "./api";

// Генерация XML
export { toXml, formatFileDate, encodeWindows1251, toBase64Xml } from "./helpers";
export type { XmlNode, TXmlOptions } from "./helpers";

// Документы и их типы
export * from "./docs";
