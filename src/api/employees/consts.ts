/** Роли сотрудника (`Права.Роль.Название`). */
export enum EmployeeRole {
    /** Диспетчер */
    Dispatcher = "Диспетчер",
    /** Водитель */
    Driver = "Водитель",
    /** Механик */
    Mechanic = "Механик",
    /** Администратор системы */
    SystemAdministrator = "Администратор системы",
}

/** Пол сотрудника (`Сотрудник.Пол`: "0" — мужской, "1" — женский). */
export enum EmployeeGender {
    Male = "0",
    Female = "1",
}

/** Категории водительского удостоверения. */
export enum DriverLicenseCategory {
    A = "A",
    B = "B",
    BE = "BE",
    C = "C",
}

