import { JSONRPCClient, type JSONRPCRequest, type SendRequest } from "json-rpc-2.0";
import { v4 as uuid } from "uuid";
import type {
    TDocumentAttachment,
    TExecuteActionParams,
    TListChangesParams,
    TPrepareActionParams,
    TWriteAttachmentParams,
    TWriteDocumentParams,
} from "./types";

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
type SabyJrpcClient = JSONRPCClient<SabyClientParams>

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
    private readonly _rpc: SabyJrpcClient;

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

    /**
     * Генерирует XML-вложение (титул документа) из структуры документа.
     *
     * @param attachment - Результат вызова конструктора документа из `src/docs/`
     *   (например, `Document1110380(data)`).
     * @returns Сгенерированное вложение (XML в base64) для передачи в
     *   {@link SabyTmsClient#writeDocument} или {@link SabyTmsClient#writeAttachment}.
     *
     * @see СБИС.СгенерироватьВложение
     */
    public generateAttachment(attachment: TDocumentAttachment): Promise<unknown> {
        return this._serviceRequest("СБИС.СгенерироватьВложение", attachment)
    }

    /**
     * Создаёт новый документ (титул Т1).
     *
     * @see СБИС.ЗаписатьДокумент
     */
    public writeDocument(params: TWriteDocumentParams): Promise<unknown> {
        return this._serviceRequest("СБИС.ЗаписатьДокумент", {
            "НашаОрганизация": params.organization,
            "Вложение": params.attachment,
            "Регламент": { "Название": params.regulationName },
            "Тип": params.documentType,
        })
    }

    /**
     * Добавляет титул (Т2+) к существующему документу.
     *
     * @see СБИС.ЗаписатьВложение
     */
    public writeAttachment(params: TWriteAttachmentParams): Promise<unknown> {
        return this._serviceRequest("СБИС.ЗаписатьВложение", {
            "Идентификатор": params.identifier,
            "Вложение": params.attachment,
        })
    }

    /**
     * Подготавливает действие (подпись) и возвращает хеш для подписания.
     *
     * @see СБИС.ПодготовитьДействие
     */
    public prepareAction(params: TPrepareActionParams): Promise<unknown> {
        return this._serviceRequest("СБИС.ПодготовитьДействие", {
            "Идентификатор": params.identifier,
            "Действие": params.action,
            "Этап": params.stage,
            "ОтпечатокПодписи": params.certificateThumbprint,
            "Комментарий": params.comment,
        })
    }

    /**
     * Выполняет действие (подписание и отправка) после клиентской подписи.
     *
     * @see СБИС.ВыполнитьДействие
     */
    public executeAction(params: TExecuteActionParams): Promise<unknown> {
        return this._serviceRequest("СБИС.ВыполнитьДействие", {
            "Идентификатор": params.identifier,
            "Действие": params.action,
            "Этап": params.stage,
            "Ключ": params.keyType ? { "Тип": params.keyType } : undefined,
        })
    }

    /**
     * Получает список изменений/статусов документов (или входящих документов).
     *
     * @see СБИС.СписокИзменений
     */
    public listChanges(params: TListChangesParams = {}): Promise<unknown> {
        return this._serviceRequest("СБИС.СписокИзменений", params)
    }

    /**
     * Читает карточку документа.
     *
     * @see СБИС.ПрочитатьДокумент
     */
    public readDocument(identifier: string): Promise<unknown> {
        return this._serviceRequest("СБИС.ПрочитатьДокумент", {
            "Идентификатор": identifier,
        })
    }

    public dispose(): void {
        this._rpc.rejectAllPendingRequests("Disposed");
        this._sessionToken = undefined;
    }

    private _serviceRequest<T = unknown>(method: string, params: object): Promise<T> {
        return this._rpc.request(method, sabyParams(params), { api: 'service' }) as Promise<T>
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
