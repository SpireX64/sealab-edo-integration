import { validateInstructionNode } from "../validation/validate";
import { schema1110486 } from "../validation/schemas.generated";
/** Электронное поручение экспедитору: информация клиента, 1110486. */
import { formatDate, formatTime } from "../../../helpers";
import { fileNode, type TFileXmlMeta } from "../../shared";
import {
    formatDocumentRequisites,
    type TDocumentRequisites,
} from "./data/DocumentRequisites";
import {
    formatInstructionContent,
    type TInstructionContent,
} from "./data/Content";
import { formatSigner, type TSigner } from "./data/Signer";
export type TDocument1110486 = {
    createdAt: Date;
    otherRecipientIds?: string[];
    compilerName?: string;
    compilerAuthority?: TDocumentRequisites;
    content: TInstructionContent;
    signer: TSigner;
};
export function Document1110486(
    data: TDocument1110486,
    meta: TFileXmlMeta = {},
) {
    if (!meta.programTag?.trim() || meta.programTag.length > 40)
        throw new TypeError(
            "Не указана версия программы programTag (1–40 символов)",
        );
    if (
        data.compilerName !== undefined &&
        (!data.compilerName.trim() || !data.compilerAuthority)
    )
        throw new TypeError(
            "Указанному составителю нужно основание полномочий",
        );
    for (const id of data.otherRecipientIds ?? [])
        if (id.length < 4 || id.length > 46)
            throw new TypeError(
                "Идентификатор иного получателя должен содержать 4–46 символов",
            );
    const node = fileNode(
        "1110486",
        "5.01",
        {
            НаимДок: "электронное поручение экспедитору, информация клиента",
            ДатИнфКлнт: formatDate(data.createdAt),
            ВрИнфКлнт: formatTime(data.createdAt),
            НаимЭкСубСост: data.compilerName,
            ОснДовОргСост:
                data.compilerAuthority &&
                formatDocumentRequisites(data.compilerAuthority),
            СодИнфКлнт: formatInstructionContent(data.content),
            ПодпИнфКлнт: formatSigner(data.signer),
        },
        {
            ...meta,
            documentCreatedAt: meta.documentCreatedAt ?? data.createdAt,
        },
    );
    const { Документ, ...file } = node.Файл as Record<string, unknown>;
    return validateInstructionNode(
        { Файл: { ...file, ИдПолИной: data.otherRecipientIds, Документ } },
        schema1110486,
    );
}
