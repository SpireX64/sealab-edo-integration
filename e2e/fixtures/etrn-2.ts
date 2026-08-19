/**
 * Фикстуры документов ЭТрН 1110340 (Т2) и 1110341 (Т3).
 */

import {
    Document1110340,
    CarrierSignerStatus,
    type TDocument1110340,
} from "../../src/docs/etrn/1110340";

import {
    Document1110341,
    ConsigneeSignerStatus,
    MassDeterminationMethod,
    type TDocument1110341,
} from "../../src/docs/etrn/1110341";

export const etrn1110340Fixture: TDocument1110340 = {
    documentDateTime: new Date("2026-08-13T13:00:00+03:00"),
    shipperFileId: {
        fileId: "ON_TRNACLGROT____0_20260813_",
        createdAt: new Date("2026-08-13T10:00:00+03:00"),
        signBase64: "BASE64_SIGNATURE",
    },
    carrierInfo: {
        waybillId: "1",
    },
    signer: {
        status: CarrierSignerStatus.CarrierWithoutPOA,
        position: "Генеральный директор",
        fullName: { lastName: "Алексеев", firstName: "Иван", middleName: "Иванович" },
    },
};

export const etrn1110341Fixture: TDocument1110341 = {
    compilerName: 'Общество с ограниченной ответственностью "Получатель"',
    carrierAcceptanceFileId: {
        fileId: "ON_TRNACLGRT_____0_20260813_",
        createdAt: new Date("2026-08-13T12:00:00+03:00"),
        signBase64: "BASE64_SIGNATURE",
    },
    createdAt: new Date("2026-08-13T14:00:00+03:00"),
    consigneeInfo: {
        waybillId: "1",
        accepted: true,
        acceptance: {
            actualArrivalDateTime: new Date("2026-08-13T13:30:00+03:00"),
            actualDepartureDateTime: new Date("2026-08-13T15:00:00+03:00"),
            plannedArrivalDateTime: new Date("2026-08-13T14:00:00+03:00"),
            massDeterminationMethod: MassDeterminationMethod.TotalWeight,
            packageCount: 1,
            cargoCondition: "Груз принят без замечаний",
            grossWeight: 500,
            unloadingAddress: {
                addressType: "russian",
                russianAddress: {
                    postalCode: "190000",
                    regionCode: "78",
                    city: "Санкт-Петербург",
                    street: "наб. Обводного канала",
                    house: "10",
                },
            },
        },
    },
    signer: {
        status: ConsigneeSignerStatus.ConsigneeWithoutPOA,
        position: "Генеральный директор",
        fullName: { lastName: "Петров", firstName: "Пётр", middleName: "Петрович" },
    },
};
