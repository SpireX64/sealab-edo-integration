import type { VehicleType } from "./consts";

/** Входные данные для создания ТС/прицепа. */
export type TVehicleInput = {
    /** Инвентарный номер. В wire допускается число или строка. */
    garageNumber: number | string;

    /** Тип ТС по ПТС. */
    passportTypeName: string;

    /** Номер СТС. */
    regCertNumber: string;

    /** Регистрационный номер. */
    regNumber: string;

    /** VIN-номер. */
    vin: string;

    /** Тип: автомобиль (0) / прицеп (1). */
    type: VehicleType;
};

/** Карточка транспортного средства (ответ API). */
export type TVehicle = {
    /** UUID, присвоенный при создании. */
    uuid: string;

    /** Инвентарный номер. */
    garageNumber?: string;

    /** Тип ТС по ПТС. */
    passportTypeName?: string;

    /** Номер СТС. */
    regCertNumber?: string;

    /** Регистрационный номер. */
    regNumber?: string;

    /** VIN-номер. */
    vin?: string;

    /** Тип (0/1). */
    type?: VehicleType;

    /** Модель. */
    model?: string;
};

/** Патч для обновления ТС (все поля опциональны). */
export type TVehiclePatch = Partial<Omit<TVehicleInput, "type">> & {
    /** Тип: автомобиль (0) / прицеп (1). */
    type?: VehicleType;
};

/** Wire-представление ТС (внутренний тип для parse). */
export type TVehicleWire = {
    UUID?: string;
    GarageNumber?: number | string;
    PassportTypeName?: string;
    RegCertNumber?: string;
    RegNumber?: string;
    VIN?: string;
    Type?: VehicleType;
    Model?: string;
};
