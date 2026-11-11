import { validateInstructionNode } from "../validation/validate";
import { schema1110488 } from "../validation/schemas.generated";
/** Отзыв поручения клиентом, 1110488. */
import { formatDate, formatTime } from "../../../helpers";
import { fileNode, type TFileXmlMeta } from "../../shared";
import { formatSigner, type TSigner } from "../1110486/data/Signer";
import {
    formatClientFileId,
    type TClientFileId,
} from "../1110487/data/Content";
import {
    formatWithdrawalContent,
    type TWithdrawalContent,
} from "./data/Content";
export type TDocument1110488 = {
    createdAt: Date;
    otherRecipientIds?: string[];
    clientFileId: TClientFileId;
    content: TWithdrawalContent;
    signer: TSigner;
};
export function Document1110488(
    data: TDocument1110488,
    meta: TFileXmlMeta = {},
) {
    if (!meta.programTag?.trim() || meta.programTag.length > 40)
        throw new TypeError(
            "Не указана версия программы programTag (1–40 символов)",
        );
    for (const id of data.otherRecipientIds ?? [])
        if (id.length < 4 || id.length > 46)
            throw new TypeError(
                "Идентификатор иного получателя должен содержать 4–46 символов",
            );
    const node = fileNode(
        "1110488",
        "5.01",
        {
            НаимДок:
                "электронное поручение экспедитору, информация клиента об отзыве поручения экспедитору",
            ДатИнфОтз: formatDate(data.createdAt),
            ВрИнфОтз: formatTime(data.createdAt),
            ИдИнфКлнт: formatClientFileId(data.clientFileId),
            СодИнфОтз: formatWithdrawalContent(data.content),
            ПодпИнфОтз: formatSigner(data.signer),
        },
        {
            ...meta,
            documentCreatedAt: meta.documentCreatedAt ?? data.createdAt,
        },
    );
    const { Документ, ...file } = node.Файл as Record<string, unknown>;
    return validateInstructionNode(
        { Файл: { ...file, ИдПолИной: data.otherRecipientIds, Документ } },
        schema1110488,
    );
}
