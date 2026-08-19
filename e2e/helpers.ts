/**
 * Общие утилиты и учётные данные для e2e-тестов.
 *
 * Тесты выполняются против тестового окружения Saby (`SabyEnv.Test`).
 * Учётные данные по умолчанию — demo-аккаунты из официальных
 * Postman-коллекций; их можно переопределить через переменные окружения.
 */

import { SabyEnv, SabyTmsClient, organization } from "../src/index";
import type { TLoginCredentials } from "../src/index";

export type TCredentials = TLoginCredentials;

function env(name: string, fallback: string): string {
    const value = process.env[name];
    return value && value.length > 0 ? value : fallback;
}

/** Создаёт клиент для тестового окружения Saby. */
export function createClient(): SabyTmsClient {
    return new SabyTmsClient(SabyEnv.Test);
}

const credentials = '@demo42346363'

// ─── ЭТрН (1110339) ─────────────────────────────────────────────────────────

export const ETRN_CREDENTIALS: TCredentials = {
    login: env("SABY_ETRN_LOGIN", credentials),
    password: env("SABY_ETRN_PASSWORD", credentials),
    organization: organization({ inn: "931563254629" }),
};

// ─── ЭПЛ (1110380) ─────────────────────────────────────────────────────────

export const EPL_CREDENTIALS: TCredentials = {
    login: env("SABY_EPL_LOGIN", credentials),
    password: env("SABY_EPL_PASSWORD", credentials),
    organization: organization({ inn: "2145492416", kpp: "214501001" }),
};

// ─── ЭЗЗ (1110361) ─────────────────────────────────────────────────────────

export const EZZ_CREDENTIALS: TCredentials = {
    login: env("SABY_EZZ_LOGIN", credentials),
    password: env("SABY_EZZ_PASSWORD", credentials),
    organization: organization({ inn: "931563254629" }),
};

/**
 * Отпечаток сертификата КЭП для подготовки подписи.
 * По умолчанию — demo-сертификат из Postman-коллекций.
 * Переопределяется через `SABY_CERT_THUMBPRINT`.
 */
export const CERT_THUMBPRINT = env("SABY_CERT_THUMBPRINT", "961A25F64E749882994B491757E3F88C95DD0A04");
