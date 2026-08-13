/**
 * Публичное API пакета saby-tms-client.
 *
 * Содержит только ре-экспорты: клиент, документы и их типы.
 */

// Клиент
export { SabyEnv, SabyTmsClient } from "./client";

// Типы клиента
export type {
    TAttachmentFile,
    TDocumentAttachment,
    TDocumentCard,
    TDocumentCardAttachment,
    TDocumentState,
    TExecuteActionParams,
    TGeneratedAttachment,
    TListChangesFilter,
    TOrganization,
    TPrepareActionParams,
    TWriteAttachmentParams,
    TWriteDocumentParams,
} from "./types";

// Документы и их типы
export * from "./docs";
