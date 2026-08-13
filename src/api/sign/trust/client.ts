import type { ISabyTransport, TListResult } from "../../types";
import type { TTrust, TTrustInput, TTrustListFilter } from "./types";
import { formatTrust, formatTrustListFilter } from "./format";
import { parseTrust } from "./parse";

/**
 * Работа с доверием на использование электронной подписи.
 */
export class TrustApi {
    public constructor(private readonly _client: ISabyTransport) {}

    /** Добавляет или обновляет доверие на использование ЭП. */
    public async write(input: TTrustInput): Promise<TTrust> {
        const result = await this._client.request<{ "Доверие"?: Record<string, unknown> }>(
            "СБИС.ЗаписатьДоверие",
            { "Параметр": { "Доверие": formatTrust(input) } },
        );

        return parseTrust(result["Доверие"]);
    }

    /** Возвращает список оформленных доверий. */
    public async getList(filter: TTrustListFilter = {}): Promise<TListResult<TTrust>> {
        const result = await this._client.request<{ "Доверие"?: Record<string, unknown>[] }>(
            "СБИС.СписокДоверий",
            { "Параметр": formatTrustListFilter(filter) },
        );

        return { "Доверие": (result["Доверие"] ?? []).map(parseTrust) };
    }

    /** Завершает срок использованного доверия или удаляет неиспользованное. */
    public async remove(id: string): Promise<void> {
        await this._client.request("СБИС.УдалитьДоверие", {
            "Параметр": { "Доверие": { "Идентификатор": id } },
        });
    }
}
