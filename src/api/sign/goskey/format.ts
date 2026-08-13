import type { TGoskeyOperationInput } from "./types";

/**
 * Преобразует входные данные криптооперации в wire-представление `Params`.
 *
 * `DocumentID` и `Files` выводятся из карточки документа автоматически.
 */
export function formatGoskeyOperationInput(
    input: TGoskeyOperationInput,
): Record<string, unknown> {
    const attachmentIds =
        input.attachmentIds ??
        input.card["Вложение"]?.map((attachment) => attachment["Идентификатор"]);

    if (!attachmentIds || attachmentIds.length === 0) {
        throw new TypeError(
            "В карточке документа нет вложений для подписания. " +
            "Прочитайте карточку (readDocument) или укажите attachmentIds явно.",
        );
    }

    return {
        "Operation": input.operation ?? "createDetachedSign",
        "CertificateType": input.certificateType ?? "Госключ",
        "GoskeySignatureKind": input.signatureKind,
        "DocumentID": input.card["Идентификатор"],
        "Files": attachmentIds.map((attachmentId) => ({ "AttachmentID": attachmentId })),
        "GoskeyOgrn": input.ogrn,
        "GoskeyOgrnip": input.ogrnip,
        "GoskeyHeadSnils": input.headSnils,
    };
}
