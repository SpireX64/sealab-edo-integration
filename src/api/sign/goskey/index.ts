/**
 * Публичное API саб-клиента «Госключ».
 */

export { GoskeyApi } from "./client";
export { GoskeySignatureKind } from "./consts";

export type {
    TGoskeyOperation,
    TGoskeyOperationInput,
    TGoskeyProvider,
    TGoskeySignedFile,
    TLinkedProvider,
} from "./types";
