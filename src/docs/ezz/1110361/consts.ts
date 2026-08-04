/**
 * Константы и перечисления документа ЭЗЗ 1110361.
 */

/**
 * Полномочия действовать в интересах грузоотправителя.
 */
export enum Authority {
    /** Заполнение и подписание заказа и заявки */
    FillAndSign = "FillAndSign",
    /** Погрузка груза в транспортное средство, заполнение и подписание транспортной накладной */
    LoadAndSignWaybill = "LoadAndSignWaybill",
    /** Осуществление платежей по договору перевозки */
    MakePayments = "MakePayments",
}

export function formatAuthority(value: Authority): string {
    switch (value) {
        case Authority.FillAndSign:
            return "1"
        case Authority.LoadAndSignWaybill:
            return "2"
        case Authority.MakePayments:
            return "3"
    }
}

/**
 * Операция погрузки/выгрузки.
 */
export enum OperationType {
    Loading = "Loading",
    Unloading = "Unloading",
}

export function formatOperationType(value: OperationType): string {
    switch (value) {
        case OperationType.Loading:
            return "Погрузка"
        case OperationType.Unloading:
            return "Выгрузка"
    }
}

/**
 * Метод определения массы груза.
 */
export enum MassDeterminationMethod {
    /** Взвешивание по общей массе */
    TotalWeight = "TotalWeight",
    /** Взвешивание поосно */
    AxleWeight = "AxleWeight",
    /** Расчетная масса груза */
    Calculated = "Calculated",
}

export function formatMassDeterminationMethod(method: MassDeterminationMethod): string {
    switch (method) {
        case MassDeterminationMethod.TotalWeight:
            return "01"
        case MassDeterminationMethod.AxleWeight:
            return "02"
        case MassDeterminationMethod.Calculated:
            return "03"
    }
}

/**
 * Тип подписи.
 */
export enum SignatureType {
    /** Усиленная квалифицированная электронная подпись */
    QualifiedDigital = "QualifiedDigital",
    /** Простая электронная подпись */
    SimpleDigital = "SimpleDigital",
    /** Усиленная неквалифицированная электронная подпись */
    UnqualifiedDigital = "UnqualifiedDigital",
}

export function formatSignatureType(value: SignatureType): string {
    switch (value) {
        case SignatureType.QualifiedDigital:
            return "1"
        case SignatureType.SimpleDigital:
            return "2"
        case SignatureType.UnqualifiedDigital:
            return "3"
    }
}

/**
 * Способ подтверждения полномочий на подписание документа.
 */
export enum AuthorityConfirmationMethod {
    /** В соответствии с данными, содержащимися в электронной подписи */
    SignatureData = "SignatureData",
    /** В соответствии с электронной доверенностью в машиночитаемой форме (включена в пакет) */
    ElectronicPOAInPackage = "ElectronicPOAInPackage",
    /** В соответствии с электронной доверенностью в машиночитаемой форме (хранение в ИС, сведения в документе) */
    ElectronicPOAInSystemByDoc = "ElectronicPOAInSystemByDoc",
    /** В соответствии с электронной доверенностью в машиночитаемой форме (хранение в ИС, сведения иным способом) */
    ElectronicPOAInSystemOther = "ElectronicPOAInSystemOther",
    /** В соответствии с доверенностью в форме документа на бумажном носителе */
    PaperPOA = "PaperPOA",
    /** Любое иное */
    Other = "Other",
}

export function formatAuthorityConfirmationMethod(value: AuthorityConfirmationMethod): string {
    switch (value) {
        case AuthorityConfirmationMethod.SignatureData:
            return "1"
        case AuthorityConfirmationMethod.ElectronicPOAInPackage:
            return "2"
        case AuthorityConfirmationMethod.ElectronicPOAInSystemByDoc:
            return "3"
        case AuthorityConfirmationMethod.ElectronicPOAInSystemOther:
            return "4"
        case AuthorityConfirmationMethod.PaperPOA:
            return "5"
        case AuthorityConfirmationMethod.Other:
            return "6"
    }
}

/**
 * Тип стороны-составителя документа.
 */
export enum IssuerType {
    /** Физическое лицо */
    Individual = "Individual",
    /** Индивидуальный предприниматель */
    SoleProprietor = "SoleProprietor",
    /** Юридическое лицо */
    LegalEntity = "LegalEntity",
    /** Иностранное лицо */
    ForeignEntity = "ForeignEntity",
    /** Орган исполнительной власти */
    ExecutiveAuthority = "ExecutiveAuthority",
}
