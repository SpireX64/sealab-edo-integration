import type { ISabyTransport } from "../types";
import type { TVehicle, TVehicleInput, TVehiclePatch, TVehicleWire } from "./types";
import { parseVehicle } from "./parse";

/**
 * Работа с транспортными средствами Saby.
 */
export class VehiclesApi {
    public constructor(private readonly _client: ISabyTransport) {}

    /** Создаёт ТС или прицеп. Возвращает карточку с UUID. */
    public async create(input: TVehicleInput): Promise<TVehicle> {
        const result = await this._client.request<TVehicleWire>(
            "sabyVehicle.Create",
            {
                vehicle: {
                    GarageNumber: input.garageNumber,
                    PassportTypeName: input.passportTypeName,
                    RegCertNumber: input.regCertNumber,
                    RegNumber: input.regNumber,
                    VIN: input.vin,
                    Type: input.type,
                },
            },
        );

        return parseVehicle(result);
    }

    /** Возвращает данные ТС по UUID. */
    public async get(uuid: string): Promise<TVehicle> {
        const result = await this._client.request<TVehicleWire>(
            "sabyVehicle.Read",
            { "UUID": uuid },
        );

        return parseVehicle(result);
    }

    /** Обновляет сведения по ТС/прицепу. */
    public async update(uuid: string, patch: TVehiclePatch): Promise<boolean> {
        return this._client.request<boolean>("sabyVehicle.Update", {
            vehicle: {
                UUID: uuid,
                GarageNumber: patch.garageNumber,
                PassportTypeName: patch.passportTypeName,
                RegCertNumber: patch.regCertNumber,
                RegNumber: patch.regNumber,
                VIN: patch.vin,
                Type: patch.type,
            },
        });
    }
}
