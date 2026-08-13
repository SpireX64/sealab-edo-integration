/**
 * Публичное API саб-клиента сотрудников.
 */

export { EmployeesApi } from "./client";
export { DriverLicenseCategory, EmployeeGender, EmployeeRole } from "./consts";

export type {
    TDriverLicense,
    TEmployee,
    TEmployeeInput,
    TEmployeeInvite,
    TEmployeeListFilter,
    TEmployeeListOrganization,
    TEmployeeLookup,
    TEmployeePosition,
    TEmployeeWriteOptions,
    TPassport,
} from "./types";
