import { validateInstructionNode } from "../validation/validate";
import { schema1110487 } from "../validation/schemas.generated";
/** Поручение экспедитору: информация экспедитора, 1110487. */
import { formatDate, formatTime } from "../../../helpers";
import { fileNode, type TFileXmlMeta } from "../../shared";
import { formatSigner, type TSigner } from "../1110486/data/Signer";
import {
    formatClientFileId,
    formatForwarderContent,
    type TClientFileId,
    type TForwarderContent,
} from "./data/Content";
export type TDocument1110487 = {
    createdAt: Date;
    otherRecipientIds?: string[];
    clientFileId: TClientFileId;
    content: TForwarderContent;
    signer: TSigner;
};
export function Document1110487(
    data: TDocument1110487,
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
        "1110487",
        "5.01",
        {
            НаимДок:
                "электронное поручение экспедитору, информация экспедитора",
            ДатИнфЭксп: formatDate(data.createdAt),
            ВрИнфЭксп: formatTime(data.createdAt),
            ИдИнфКлнт: formatClientFileId(data.clientFileId),
            СодИнфЭксп: formatForwarderContent(data.content),
            ПодпИнфЭксп: formatSigner(data.signer),
        },
        {
            ...meta,
            documentCreatedAt: meta.documentCreatedAt ?? data.createdAt,
        },
    );
    const { Документ, ...file } = node.Файл as Record<string, unknown>;
    return validateInstructionNode(
        { Файл: { ...file, ИдПолИной: data.otherRecipientIds, Документ } },
        schema1110487,
    );
}
