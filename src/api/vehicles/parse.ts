import type { TVehicle, TVehicleWire } from "./types";

/** Преобразует wire-карточку ТС в camelCase-представление. */
export function parseVehicle(wire: TVehicleWire): TVehicle {
    return {
        uuid: String(wire.UUID ?? ""),
        ...(wire.GarageNumber != null && { garageNumber: String(wire.GarageNumber) }),
        ...(wire.PassportTypeName && { passportTypeName: wire.PassportTypeName }),
        ...(wire.RegCertNumber && { regCertNumber: wire.RegCertNumber }),
        ...(wire.RegNumber && { regNumber: wire.RegNumber }),
        ...(wire.VIN && { vin: wire.VIN }),
        ...(wire.Type !== undefined && { type: wire.Type }),
        ...(wire.Model && { model: wire.Model }),
    };
}
