/**
 * Фикстуры документов ЭПЛ 1110381–1110384 (титулы Т2–Т5).
 *
 * Составлены по структуре типов `src/docs/epl/1110381`…`1110384`.
 */

import {
    Document1110381,
    MedicalExamKind,
    MedicalWorkerSourceKind,
    SignatureType,
    AuthorityConfirmationMethod,
    type TDocument1110381,
} from "../../src/docs/epl/1110381";

export const epl1110381Fixture: TDocument1110381 = {
    shipperFileId: {
        fileId: "ON_PTLMOPREP_____0_20260813_",
        fileDateTime: new Date("2026-08-13T10:00:00+03:00"),
        signature: "BASE64_SIGNATURE",
    },
    content: {
        waybillId: "ПЛ-2026-0001",
        examKind: MedicalExamKind.PreTrip,
        workerSource: MedicalWorkerSourceKind.Staff,
        medicalWorkerStaff: {
            position: "Врач",
            fullName: { lastName: "Меньшикова", firstName: "Мария", middleName: "Васильевна" },
            license: {
                series: "7808",
                number: "85123654",
                issueDate: new Date("2021-01-01T00:00:00+03:00"),
                expiryDate: new Date("2099-01-01T00:00:00+03:00"),
            },
        },
        examPassInfo: {
            examDateTime: new Date("2026-08-13T10:00:00+03:00"),
            driver: {
                inn: "727247929907",
                driverLicense: {
                    number: "654321",
                    series: "7458",
                    issueDate: new Date("2023-06-15T00:00:00+03:00"),
                },
                fullName: { lastName: "Быстров", firstName: "Олег", middleName: "Юрьевич" },
            },
        },
    },
    signer: {
        position: "Врач",
        signatureType: SignatureType.QualifiedDigital,
        authorityConfirmationMethod: AuthorityConfirmationMethod.SignatureData,
        fullName: { lastName: "Меньшикова", firstName: "Мария", middleName: "Васильевна" },
    },
};
