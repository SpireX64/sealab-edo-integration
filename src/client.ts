import { JSONRPCClient, type JSONRPCRequest, type JSONRPCResponse, type SendRequest } from "json-rpc-2.0";
import { v4 as uuid } from "uuid";
import { DOCUMENT_TYPE_TO_SABY } from "./saby";
import type { TOrganization } from "./organization";
import { EmployeesApi } from "./api/employees";
import { VehiclesApi } from "./api/vehicles";
import { SignApi } from "./api/sign";
import type { ISabyTransport } from "./api/types";
import type {
    TDocumentCard,
    TExecuteActionOptions,
    TListChangesOptions,
    TLoginCredentials,
    TPrepareActionOptions,
    TReadyAttachment,
    TWriteAttachmentOptions,
    TWriteDocumentOptions,
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

export class SabyTmsClient implements ISabyTransport {
    private readonly _rpc: SabyJrpcClient;

    private _sessionToken: string | undefined

    /** Организация-инициатор, заданная при авторизации. */
    private _organization: TOrganization | undefined

    /** Саб-клиент работы с сотрудниками. */
    public readonly employees: EmployeesApi;

    /** Саб-клиент работы с транспортными средствами. */
    public readonly vehicles: VehiclesApi;

    /** Саб-клиент подписания документов (Госключ / МЧД / доверие). */
    public readonly sign: SignApi;

    public constructor(
        private readonly _env: SabyEnv,
    ) {
        this._rpc = new JSONRPCClient(
            this._sendRequest.bind(this) as SendRequest<any>,
            uuid,
        )

        this.employees = new EmployeesApi(this);
        this.vehicles = new VehiclesApi(this);
        this.sign = new SignApi(this);
    }

    /**
     * Организация-инициатор, заданная при {@link SabyTmsClient#login}.
     * Реализует {@link ISabyTransport.organization} для саб-клиентов.
     */
    public get organization(): TOrganization | undefined {
        return this._organization;
    }

    /**
     * Выполняет JSON-RPC запрос к сервисному эндпоинту.
     * Реализует {@link ISabyTransport.request} — единственный «шов»,
     * который саб-клиенты используют для своих запросов.
     */
    public request<T = unknown>(method: string, params: object): Promise<T> {
        return this._serviceRequest<T>(method, params);
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
     * Выполняет аутентификацию по логину и паролю и запоминает организацию,
     * от имени которой дальше выполняется документооборот.
     *
     * @param credentials - Логин/пароль и организация (см. {@link organization}).
     * @returns Идентификатор сессии.
     *
     * {@link https://online.saby.ru/page/kbase_entity/162c298b-8baf-4c3d-bf79-f493afadc048?folderId=10473c4c-66ac-4a24-a8e9-f1be0d44f901 Saby API: Авторизация и доступ}
     */
    public async login(credentials: TLoginCredentials): Promise<string> {
        const token: string = await this._rpc.request("СБИС.Аутентифицировать", sabyParams({
            "Логин": credentials.login,
            "Пароль": credentials.password,
        }), { api: 'auth' })

        this._sessionToken = token;
        this._organization = credentials.organization;

        return token
    }

    /**
     * Создаёт новый документ (титул Т1).
     *
     * Тело документа (`Вложение` / `Регламент` / `Тип`) уже собрано фабрикой
     * {@link toAttachment} — здесь добавляется только `НашаОрганизация`
     * (реквизиты организации из {@link SabyTmsClient#login}).
     *
     * @param document - Готовое тело документа — результат `toAttachment(Document*(...))`.
     * @param options - Семантические и дополнительные поля документа (обычно не нужны).
     * @returns Карточка созданного документа (передавайте её в последующие методы).
     *
     * @see СБИС.ЗаписатьДокумент
     */
    public writeDocument(document: TReadyAttachment, options: TWriteDocumentOptions = {}): Promise<TDocumentCard> {
        if (!this._organization) {
            throw new Error("Организация не задана — вызовите login(...) с полем organization.");
        }

        return this._serviceRequest("СБИС.ЗаписатьДокумент", {
            "Документ": {
                "НашаОрганизация": this._organization,
                ...document,
                ...options.extra,
            },
        })
    }

    /**
     * Добавляет титул (Т2+) к существующему документу.
     *
     * Вложение титула собрано фабрикой {@link toAttachment} — здесь берётся
     * только его `Вложение` (файл обмена в base64) и прикрепляется к
     * `Идентификатору` родительского документа.
     *
     * @param document - Входящий документ (карточка из {@link SabyTmsClient#listChanges}
     *   или результат {@link SabyTmsClient#writeDocument}).
     * @param attachment - Готовое вложение — результат `toAttachment(Document*(...))`.
     * @param options - Семантические и дополнительные поля титула (обычно не нужны).
     *
     * @see СБИС.ЗаписатьВложение
     */
    public writeAttachment(
        document: TDocumentCard,
        attachment: TReadyAttachment,
        options: TWriteAttachmentOptions = {},
    ): Promise<TDocumentCard> {
        return this._serviceRequest("СБИС.ЗаписатьВложение", {
            "Документ": {
                "Идентификатор": document.Идентификатор,
                "Вложение": attachment.Вложение,
                ...options.extra,
            },
        })
    }

    /**
     * Подготавливает действие (подпись) и возвращает хеш для подписания.
     *
     * Сертификат подписанта можно указать любым способом — отпечатком
     * (`certificateThumbprint` / `certificate.Отпечаток`) или реквизитами
     * `ФИО` / `Должность` / `ИНН` (`certificate`). Если ничего не указать,
     * сервер подставит доступный сертификат самостоятельно и вернёт его в ответе.
     *
     * @param document - Карточка документа (результат {@link SabyTmsClient#writeDocument}).
     * @param options - Действие (`@see EtRnAction`/`EzzAction`/`EplAction`) и
     *   реквизиты сертификата КЭП подписанта.
     *
     * @see СБИС.ПодготовитьДействие
     */
    public prepareAction(document: TDocumentCard, options: TPrepareActionOptions): Promise<unknown> {
        const certificate: Record<string, unknown> = { ...options.certificate };
        if (options.certificateThumbprint !== undefined) {
            certificate["Отпечаток"] = options.certificateThumbprint;
        }

        const action: Record<string, unknown> = {
            "Название": options.action,
        }
        // Сертификат опускаем, если реквизиты не заданы: сервер выберет его сам.
        if (Object.keys(certificate).length > 0) {
            action["Сертификат"] = certificate;
        }
        if (options.comment !== undefined) {
            action["Комментарий"] = options.comment
        }

        const stage: Record<string, unknown> = { "Действие": action }
        if (options.stageName !== undefined) {
            stage["Название"] = options.stageName
        }

        return this._serviceRequest("СБИС.ПодготовитьДействие", {
            "Документ": {
                "Идентификатор": document.Идентификатор,
                "Этап": stage,
            },
        })
    }

    /**
     * Выполняет действие (подписание и отправка) после клиентской подписи.
     *
     * @param document - Карточка документа.
     * @param options - Этап с подписанными данными и тип ключа.
     *
     * @see СБИС.ВыполнитьДействие
     */
    public executeAction(document: TDocumentCard, options: TExecuteActionOptions): Promise<unknown> {
        return this._serviceRequest("СБИС.ВыполнитьДействие", {
            "Документ": {
                "Идентификатор": document.Идентификатор,
                "Этап": options.stage,
                "Ключ": options.keyType ? { "Тип": options.keyType } : undefined,
            },
        })
    }

    /**
     * Получает список изменений/статусов документов (или входящих документов).
     *
     * Если передана карточка документа, `Тип` и `ИдентификаторДокумента`
     * выводятся из неё автоматически. Для поиска без карточки используйте
     * `options.documentType` / `options.direction`.
     *
     * @param document - Карточка документа (результат {@link SabyTmsClient#writeDocument}).
     * @param options - Дополнительные параметры фильтра.
     *
     * @see СБИС.СписокИзменений
     */
    public listChanges(document?: TDocumentCard, options: TListChangesOptions = {}): Promise<unknown> {
        const filter: Record<string, unknown> = {};

        if (document?.Идентификатор) {
            filter["ИдентификаторДокумента"] = document.Идентификатор;
        }
        if (document?.Тип) {
            filter["Тип"] = document.Тип;
        } else if (options.documentType) {
            filter["Тип"] = DOCUMENT_TYPE_TO_SABY[options.documentType].type;
        }
        if (options.direction !== undefined) {
            filter["Направление"] = options.direction;
        }
        if (options.since !== undefined) {
            filter["ДатаВремяС"] = options.since;
        }
        if (options.extraFields !== undefined) {
            filter["ДопПоля"] = options.extraFields;
        }
        if (options.pageSize !== undefined) {
            filter["Навигация"] = { "РазмерСтраницы": options.pageSize };
        }

        return this._serviceRequest("СБИС.СписокИзменений", { "Фильтр": filter })
    }

    /**
     * Читает карточку документа.
     *
     * @param document - Карточка документа (результат {@link SabyTmsClient#writeDocument}).
     * @param extraFields - Дополнительные поля, например "Расширение,ЭПД".
     *
     * @see СБИС.ПрочитатьДокумент
     */
    public readDocument(document: TDocumentCard, extraFields?: string): Promise<TDocumentCard> {
        const payload: Record<string, unknown> = { "Идентификатор": document.Идентификатор }
        if (extraFields !== undefined) {
            payload["ДопПоля"] = extraFields
        }

        return this._serviceRequest("СБИС.ПрочитатьДокумент", { "Документ": payload })
    }

    public dispose(): void {
        this._rpc.rejectAllPendingRequests("Disposed");
        this._sessionToken = undefined;
        this._organization = undefined;
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

        // 401 — сессия отсутствует или истекла. Без авторизации не выполнится
        // ни один запрос, поэтому отклоняем все ожидающие (включая текущий).
        if (resp.status === 401) {
            const message = "Не выполнена авторизация";
            this._rpc.rejectAllPendingRequests(message);
            throw new Error(message);
        }

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
