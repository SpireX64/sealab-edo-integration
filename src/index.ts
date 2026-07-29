import { JSONRPCClient, type JSONRPCRequest, type SendRequest } from "json-rpc-2.0";
import { v4 as uuid } from "uuid";

export enum SabyEnv {
    /** Работа в боевой среде */
    Prod = 'Prod',
    /** Работа в тестовой среде */
    Test = 'Test',
}

type SabyApiTarget = 'auth' | 'service'

type TSabyApiUrls = Readonly<Record<SabyApiTarget, string>>;

const apiMap: Record<SabyEnv, TSabyApiUrls> = {
    [SabyEnv.Prod]: {
        auth: "https://tms.saby.ru/auth/service/",
        service: "https://tms.saby.ru/service/",
    },
    [SabyEnv.Test]: {
        auth: "https://tms.sabyd.ru/auth/service/",
        service: "https://tms.sabyd.ru/auth/service/",
    },
}

type SabyClientParams = { api: SabyApiTarget }

function getHeaders(token: string | undefined) {
    const headers: Record<string, string> = {
        "Content-Type": "application/json-rpc;charset=utf-8;",
    }

    if (typeof token === "string" && token.length > 0) {
        headers["X-SBISSessionID"] = token;
    }

    return headers;
}

const getSabyApiUrl = (env: SabyEnv, target: SabyApiTarget) => apiMap[env][target]
const sabyParams = (params: object) => ({ "Параметр": params })

export class SabyTmsClient {
    private readonly _rpc: JSONRPCClient<SabyClientParams>;

    private _sessionToken: string | undefined

    public constructor(
        private readonly _env: SabyEnv,
    ) {
        this._rpc = new JSONRPCClient(
            this._sendRequest.bind(this) as SendRequest<any>,
            uuid,
        )
    }

    /**
     * Идентификатор сессии в формате UUIDv4.
     * Доступен после успешной аутентификации.
     * @example 000b8ee4-000b8ee5-00ba-a40615cd1a61453a
     * @see SabyTmsClient#login
     */
    public get sessionId(): string | undefined {
        return this._sessionToken;
    }

    /**
     * Выполняет аутентификацию по логину и паролю. 
     * @param login - Логин от личного кабинета Saby
     * @param password - Пароль от личного кабинета Saby
     * @returns - Идентификатор сессии
     * 
     * {@link https://online.saby.ru/page/kbase_entity/162c298b-8baf-4c3d-bf79-f493afadc048?folderId=10473c4c-66ac-4a24-a8e9-f1be0d44f901 Saby API: Авторизация и доступ}
     */
    public async login(login: string, password: string): Promise<string> {
        const token: string = await this._rpc.request("СБИС.Аутентифицировать", sabyParams({
            "Логин": login,
            "Пароль": password,
        }), { api: 'auth' })

        this._sessionToken = token;

        return token
    }

    public dispose(): void {
        this._rpc.rejectAllPendingRequests("Disposed");
        this._sessionToken = undefined;
    }

    private async _sendRequest(req: JSONRPCRequest, params: SabyClientParams) {
        const resp = await fetch(getSabyApiUrl(this._env, params.api), {
            method: 'POST',
            headers: getHeaders(this._sessionToken),
            body: JSON.stringify(req),
        });

        if (!resp.ok) {
            return Promise.reject(new Error(resp.statusText));
        }

        const json = await resp.json();
        this._rpc.receive(json);
        return json;
    }
}
