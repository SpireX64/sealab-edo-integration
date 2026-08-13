/**
 * Саб-клиент подписания документов.
 * Объединяет Госключ, МЧД и доверие.
 */

import type { ISabyTransport } from "../types";
import { GoskeyApi } from "./goskey";
import { MchdApi } from "./mchd";
import { TrustApi } from "./trust";

export { GoskeyApi, GoskeySignatureKind } from "./goskey";
export type {
    TGoskeyOperation,
    TGoskeyOperationInput,
    TGoskeyProvider,
    TGoskeySignedFile,
    TLinkedProvider,
} from "./goskey";

export { MchdApi, MchdStatus } from "./mchd";
export type { TMchd, TMchdRegistrationStatus } from "./mchd";

export { TrustApi, PermissionFlag, PermissionValue } from "./trust";
export type {
    TTrust,
    TTrustInput,
    TTrustListFilter,
    TTrustParty,
    TTrustPermission,
} from "./trust";

/**
 * Подписание документов: Госключ, МЧД и доверие.
 *
 * @example
 * client.sign.goskey.createOperation(...)
 * client.sign.mchd.sendRegistration(...)
 * client.sign.trust.write(...)
 */
export class SignApi {
    public readonly goskey: GoskeyApi;
    public readonly mchd: MchdApi;
    public readonly trust: TrustApi;

    public constructor(client: ISabyTransport) {
        this.goskey = new GoskeyApi(client);
        this.mchd = new MchdApi(client);
        this.trust = new TrustApi(client);
    }
}
