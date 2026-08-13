import type { ISabyTransport } from "../../types";
import type { TMchd, TMchdRegistrationStatus } from "./types";

/**
 * Работа с МЧД (доверенностями) в ЦПРР ФНС.
 */
export class MchdApi {
    public constructor(private readonly _client: ISabyTransport) {}

    /** Регистрирует МЧД в ЦПРР ФНС. */
    public async sendRegistration(documentId: string): Promise<TMchdRegistrationStatus> {
        const result = await this._client.request<{
            "MchdStatus"?: TMchdRegistrationStatus;
        }>(
            "sabyMchd.SendRegistration",
            { "DocumentID": documentId },
        );

        return result["MchdStatus"] ?? {};
    }

    /** Возвращает статус и краткие данные МЧД из реестра ФНС. */
    public async getStatus(mchdNumber: string): Promise<TMchd> {
        const result = await this._client.request<{ "Mchd"?: TMchd }>(
            "sabyMchd.GetStatus",
            { "MchdNumber": mchdNumber },
        );

        return result["Mchd"] ?? {};
    }

    /** Получает из реестра ФНС архив с файлом МЧД и подписью. */
    public async getContent(mchdNumber: string): Promise<unknown> {
        return this._client.request("sabyMchd.GetContent", { "MchdNumber": mchdNumber });
    }

    /** Аннулирует МЧД в ЦПРР ФНС. */
    public async sendRevocation(documentId: string): Promise<unknown> {
        return this._client.request("sabyMchd.SendRevocation", { "DocumentID": documentId });
    }
}
