/**
 * Организация-инициатор документооборота (НашаОрганизация).
 */

/** Организация — юридическое лицо (СвЮЛ). */
export type TLegalOrganization = {
    "СвЮЛ": {
        "ИНН": string;
        "КПП"?: string;
    };
};

/** Организация — физическое лицо (СвФЛ). */
export type TIndividualOrganization = {
    "СвФЛ": {
        "ИНН": string;
    };
};

/** Организация — индивидуальный предприниматель (СвИП). */
export type TEntrepreneurOrganization = {
    "СвИП": {
        "ИНН": string;
        "ОГРНИП"?: string;
    };
};

/**
 * Реквизиты организации-инициатора, передаваемые в `НашаОрганизация`.
 * Передаётся только идентифицирующая часть (СвЮЛ / СвФЛ / СвИП).
 */
export type TOrganization =
    | TLegalOrganization
    | TIndividualOrganization
    | TEntrepreneurOrganization;

/** Входные данные фабрики {@link organization}. */
export type TOrganizationInput = {
    /**
     * ИНН организации.
     * 10 цифр — юридическое лицо, 12 цифр — физ. лицо / ИП.
     */
    inn: string;

    /** КПП юридического лица (необязательно). */
    kpp?: string;

    /** ОГРНИП индивидуального предпринимателя (необязательно). */
    ogrnip?: string;
};

/**
 * Создаёт реквизиты организации по её ИНН.
 *
 * Форма организации (СвЮЛ / СвФЛ / СвИП) определяется автоматически
 * по длине ИНН, поэтому разработчику не нужно выбирать её вручную.
 *
 * @example
 * organization({ inn: "2145492416", kpp: "214501001" })   // → СвЮЛ
 * organization({ inn: "931563254629" })                   // → СвФЛ
 * organization({ inn: "931563254629", ogrnip: "302147692459774" }) // → СвИП
 */
export function organization(input: TOrganizationInput): TOrganization {
    const inn = input.inn.trim();

    if (inn.length === 10) {
        const legal: TLegalOrganization["СвЮЛ"] = { "ИНН": inn };
        if (input.kpp) {
            legal["КПП"] = input.kpp;
        }
        return { "СвЮЛ": legal };
    }

    if (inn.length === 12) {
        if (input.ogrnip) {
            return { "СвИП": { "ИНН": inn, "ОГРНИП": input.ogrnip } };
        }
        return { "СвФЛ": { "ИНН": inn } };
    }

    throw new TypeError(
        `Некорректная длина ИНН "${inn}" (${inn.length} симв.). ` +
        `Ожидается 10 (юридическое лицо) или 12 (физ. лицо / ИП) цифр.`,
    );
}
