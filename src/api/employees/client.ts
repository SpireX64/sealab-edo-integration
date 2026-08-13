import type { ISabyTransport, TListResult } from "../types";
import type {
    TEmployee,
    TEmployeeInput,
    TEmployeeListFilter,
    TEmployeeLookup,
    TEmployeeWire,
    TEmployeeWriteOptions,
} from "./types";
import {
    formatEmployee,
    formatEmployeeListFilter,
    formatEmployeeListOrganization,
    formatLookup,
} from "./format";
import { parseEmployee } from "./parse";

/**
 * Работа с сотрудниками Saby.
 */
export class EmployeesApi {
    public constructor(private readonly _client: ISabyTransport) {}

    /** Создаёт или обновляет карточку сотрудника. */
    public async write(input: TEmployeeInput, options?: TEmployeeWriteOptions): Promise<TEmployee> {
        const result = await this._client.request<{ "Сотрудник": TEmployeeWire }>(
            "СБИС.ЗаписатьСотрудника",
            {
                "Параметр": {
                    "Сотрудник": formatEmployee(input),
                    "НашаОрганизация": formatEmployeeListOrganization(options?.organization),
                },
            },
        );

        return parseEmployee(result["Сотрудник"]);
    }

    /** Возвращает подробную информацию о сотруднике. */
    public async get(lookup: TEmployeeLookup): Promise<TEmployee> {
        const result = await this._client.request<{ "Сотрудник": TEmployeeWire }>(
            "СБИС.ПрочитатьСотрудника",
            { "Параметр": { "Сотрудник": formatLookup(lookup) } },
        );

        return parseEmployee(result["Сотрудник"]);
    }

    /** Возвращает список сотрудников. */
    public async getList(filter: TEmployeeListFilter = {}): Promise<TListResult<TEmployee>> {
        const result = await this._client.request<{ "Сотрудник"?: TEmployeeWire[] }>(
            "СБИС.СписокСотрудников",
            { "Параметр": formatEmployeeListFilter(filter) },
        );

        const items = (result["Сотрудник"] ?? []).map(parseEmployee);
        return { "Сотрудник": items };
    }
}
