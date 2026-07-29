import { JSONRPCClient, type JSONRPCRequest, type SendRequest } from "json-rpc-2.0";
import { v4 as uuid } from "uuid";

/** Конфигурация SabyTMS-клиента */
export type SabyTmsClientConfig = {
    host: string;
}

function getHeaders(token: string | undefined) {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    }

    if (typeof token === "string" && token.length > 0) {
        headers["Authorization"] = `Bearer ${token}`
    }

    return headers;
}

export class SabyTmsClient {
    private readonly _rpc: JSONRPCClient;

    private _authToken: string | undefined

    public constructor(
        private readonly _config: SabyTmsClientConfig,
    ) {
        this._rpc = new JSONRPCClient(
            this._sendRequest.bind(this) as SendRequest<unknown>,
            uuid,
        )
    }

    private async _sendRequest(req: JSONRPCRequest) {
        const resp = await fetch(this._config.host, {
            method: 'POST',
            headers: getHeaders(this._authToken),
            body: JSON.stringify(req),
        });

        if (!resp.ok) {
            return Promise.reject(new Error(resp.statusText));
        }

        const json = await resp.json();
        return this._rpc.receive(json);
    }
}
