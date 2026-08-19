/**
 * Фикстура документа ЭЗЗ 1110362
 * («Заказ и заявка — информация перевозчика», титул Т2).
 */

import {
    Document1110362,
    OwnershipType,
    IssuerType,
    SignatureType,
    AuthorityConfirmationMethod,
    type TDocument1110362,
} from "../../src/docs/ezz/1110362";
import { TaxRate } from "../../src/docs/ezz/1110362/consts";

export const ezz1110362Fixture: TDocument1110362 = {
    createdAt: new Date("2026-08-13T12:00:00+03:00"),
    compilerName: 'Общество с ограниченной ответственностью "ТрансЛогистик"',

    shipperFileId: {
        fileId: "ON_ZAKZVGO___0_20260813_",
        createdAt: new Date("2026-08-13T10:00:00+03:00"),
        signatureBase64: "BASE64_SIGNATURE",
    },

    content: {
        uniqueId: "З-2026-000123",
        isAccepted: true,

        orgPerson: {
            phones: ["+7 (4852) 22-22-22"],
            fullName: { lastName: "Алексеев", firstName: "Иван", middleName: "Иванович" },
        },

        drivers: [
            {
                licenseNumber: "654321",
                licenseSeries: "7458",
                licenseIssueDate: new Date("2023-06-15T00:00:00+03:00"),
                inn: "727247929907",
                phones: ["+7 (999) 123-45-67"],
                fullName: { lastName: "Быстров", firstName: "Олег", middleName: "Юрьевич" },
            },
        ],

        vehicleInfo: {
            vehicle: {
                registrationNumber: "У528МВ76",
                ownershipType: OwnershipType.Lease,
                stsNumber: "5564454287",
                vin: "58972669853777854",
                vehicleParams: {
                    type: "автомобиль легковой",
                    brand: "Ford Focus",
                    capacityTons: 1,
                    capacityCubicMeters: 10,
                },
                ownershipDocs: [
                    {
                        name: "Безвозмездный договор",
                        documentNumber: "1112",
                        documentDate: new Date("2025-12-12T00:00:00+03:00"),
                        issuerRequisites: [
                            { issuerType: IssuerType.LegalEntity, inn: "2145492416" },
                            { issuerType: IssuerType.LegalEntity, inn: "9415763430" },
                        ],
                    },
                ],
            },
        },

        paymentInfo: {
            costWithoutTax: 15000,
            taxRate: TaxRate.WithoutVAT,
            costWithTax: 15000,
        },
    },

    signer: {
        position: "Генеральный директор",
        signatureType: SignatureType.QualifiedDigital,
        authorityConfirmationMethod: AuthorityConfirmationMethod.SignatureData,
        fullName: { lastName: "Алексеев", firstName: "Иван", middleName: "Иванович" },
    },
};
