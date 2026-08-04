/**
 * Метод определения массы груза
 * (МетОпрМасс, общий enum для документов ЭТрН)
 *
 * Формат XML: "01", "02", "03".
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
