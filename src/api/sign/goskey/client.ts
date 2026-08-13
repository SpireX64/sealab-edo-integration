import type { ISabyTransport } from "../../types";
import type {
    TGoskeyOperation,
    TGoskeyOperationInput,
    TGoskeyProvider,
    TLinkedProvider,
} from "./types";
import { formatGoskeyOperationInput } from "./format";

/**
 * Подписание документов через «Госключ».
 */
export class GoskeyApi {
    public constructor(private readonly _client: ISabyTransport) {}

    /** Возвращает ссылки для привязки внешних провайдеров (соцсети/ЕСИА). */
    public async getProviders(): Promise<TGoskeyProvider[]> {
        const result = await this._client.request<{
            "Пользователь"?: { "ВнешнийПровайдер"?: { "Имя": string; "Ссылка": string }[] };
        }>(
            "СБИС.ИнформацияОТекущемПользователе",
            { "Параметр": { "ДопПоля": "СписокВнешнихПровайдеров" } },
        );

        return (result["Пользователь"]?.["ВнешнийПровайдер"] ?? []).map((p) => ({
            name: p["Имя"],
            url: p["Ссылка"],
        }));
    }

    /** Возвращает список привязанных внешних провайдеров. */
    public async getLinkedProviders(): Promise<TLinkedProvider[]> {
        const result = await this._client.request<{
            "Пользователь"?: { "ПривязанныеВнешниеПровайдеры"?: { "ProfileId"?: string; "ProviderName"?: string }[] };
        }>(
            "СБИС.ИнформацияОТекущемПользователе",
            { "Параметр": { "ДопПоля": "СписокПривязанныхВнешнихПровайдеров" } },
        );

        return (result["Пользователь"]?.["ПривязанныеВнешниеПровайдеры"] ?? []).map((p) => ({
            ...(p["ProfileId"] && { profileId: p["ProfileId"] }),
            ...(p["ProviderName"] && { providerName: p["ProviderName"] }),
        }));
    }

    /** Отправляет документ в «Госключ» для подписания. */
    public async createOperation(input: TGoskeyOperationInput): Promise<TGoskeyOperation> {
        return this._client.request<TGoskeyOperation>(
            "sabyCryptoOperation.Create",
            { "Params": formatGoskeyOperationInput(input) },
        );
    }

    /** Проверяет статус подписи; возвращает подписанные данные после завершения. */
    public async getStatus(operationId: string): Promise<TGoskeyOperation> {
        return this._client.request<TGoskeyOperation>(
            "sabyCryptoOperation.GetStatus",
            { "OperationID": operationId },
        );
    }
}
