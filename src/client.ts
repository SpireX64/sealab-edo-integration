import { JSONRPCClient, type JSONRPCRequest, type JSONRPCResponse, type SendRequest } from "json-rpc-2.0";
import { v4 as uuid } from "uuid";
import type {
    TDocumentAttachment,
    TDocumentCard,
    TExecuteActionParams,
    TGeneratedAttachment,
    TListChangesFilter,
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
        service: "https://tms.sabyd.ru/service/",
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
    public generateAttachment(attachment: TDocumentAttachment): Promise<TGeneratedAttachment> {
        return this._serviceRequest("СБИС.СгенерироватьВложение", attachment)
    }

    /**
     * Создаёт новый документ (титул Т1).
     *
     * @see СБИС.ЗаписатьДокумент
     */
    public writeDocument(params: TWriteDocumentParams): Promise<TDocumentCard> {
        return this._serviceRequest("СБИС.ЗаписатьДокумент", {
            "Документ": {
                "НашаОрганизация": params.organization,
                "Вложение": params.attachment,
                "Регламент": { "Название": params.regulationName },
                "Тип": params.documentType,
                ...params.extra,
            },
        })
    }

    /**
     * Добавляет титул (Т2+) к существующему документу.
     *
     * @see СБИС.ЗаписатьВложение
     */
    public writeAttachment(params: TWriteAttachmentParams): Promise<TDocumentCard> {
        return this._serviceRequest("СБИС.ЗаписатьВложение", {
            "Документ": {
                "Идентификатор": params.identifier,
                "Вложение": params.attachment,
            },
        })
    }

    /**
     * Подготавливает действие (подпись) и возвращает хеш для подписания.
     *
     * @see СБИС.ПодготовитьДействие
     */
    public prepareAction(params: TPrepareActionParams): Promise<unknown> {
        const action: Record<string, unknown> = {
            "Название": params.action,
        }
        if (params.comment !== undefined) {
            action["Комментарий"] = params.comment
        }
        if (params.certificateThumbprint !== undefined) {
            action["Сертификат"] = { "Отпечаток": params.certificateThumbprint }
        }

        const stage: Record<string, unknown> = { "Действие": action }
        if (params.stageName !== undefined) {
            stage["Название"] = params.stageName
        }

        return this._serviceRequest("СБИС.ПодготовитьДействие", {
            "Документ": {
                "Идентификатор": params.identifier,
                "Этап": stage,
            },
        })
    }

    /**
     * Выполняет действие (подписание и отправка) после клиентской подписи.
     *
     * @see СБИС.ВыполнитьДействие
     */
    public executeAction(params: TExecuteActionParams): Promise<unknown> {
        return this._serviceRequest("СБИС.ВыполнитьДействие", {
            "Документ": {
                "Идентификатор": params.identifier,
                "Этап": params.stage,
                "Ключ": params.keyType ? { "Тип": params.keyType } : undefined,
            },
        })
    }

    /**
     * Получает список изменений/статусов документов (или входящих документов).
     *
     * @see СБИС.СписокИзменений
     */
    public listChanges(filter: TListChangesFilter = {}): Promise<unknown> {
        return this._serviceRequest("СБИС.СписокИзменений", { "Фильтр": filter })
    }

    /**
     * Читает карточку документа.
     *
     * @see СБИС.ПрочитатьДокумент
     */
    public readDocument(identifier: string, extraFields?: string): Promise<TDocumentCard> {
        const document: Record<string, unknown> = { "Идентификатор": identifier }
        if (extraFields !== undefined) {
            document["ДопПоля"] = extraFields
        }

        return this._serviceRequest("СБИС.ПрочитатьДокумент", { "Документ": document })
    }

    public dispose(): void {
        this._rpc.rejectAllPendingRequests("Disposed");
        this._sessionToken = undefined;
    }

    private _serviceRequest<T = unknown>(method: string, params: object): Promise<T> {
        return this._rpc.request(method, params, { api: 'service' }) as Promise<T>
    }

    private async _sendRequest(req: JSONRPCRequest, params: SabyClientParams): Promise<void> {
        const resp = await fetch(getSabyApiUrl(this._env, params.api), {
            method: 'POST',
            headers: getHeaders(this._sessionToken),
            body: JSON.stringify(req),
        });

        // Saby возвращает JSON-RPC ошибку с HTTP-статусом 500.
        // Парсим тело всегда, чтобы json-rpc-2.0 доставил реальное сообщение
        // ошибки, а не обезличенный HTTP statusText.
        let json: JSONRPCResponse | JSONRPCResponse[];
        try {
            json = (await resp.json()) as JSONRPCResponse | JSONRPCResponse[];
        } catch {
            throw new Error(resp.statusText || `Ошибка запроса (HTTP ${resp.status})`);
        }

        this._rpc.receive(json);
    }
}
