/**
 * Фикстуры документов ЭПЛ 1110382 (Т3), 1110383 (Т4), 1110384 (Т5).
 */

import {
    Document1110382,
    SignatureType,
    AuthorityConfirmationMethod,
    type TDocument1110382,
} from "../../src/docs/epl/1110382";

import {
    Document1110383,
    TripStartSign,
    type TDocument1110383,
} from "../../src/docs/epl/1110383";

import {
    Document1110384,
    TripEndSign,
    type TDocument1110384,
} from "../../src/docs/epl/1110384";

export const epl1110382Fixture: TDocument1110382 = {
    fileIdentification: {
        fileId: "ON_PTLTECHCHECK__0_20260813_",
        fileDateTime: new Date("2026-08-13T08:00:00+03:00"),
        signature: "BASE64_SIGNATURE",
    },
    content: {
        waybillId: "ПЛ-2026-0001",
        checkDateTime: new Date("2026-08-13T08:30:00+03:00"),
        isReleaseAllowed: true,
        releaseDateTime: new Date("2026-08-13T09:00:00+03:00"),
        responsiblePerson: {
            position: "Механик",
            fullName: { lastName: "Сидоров", firstName: "Сергей", middleName: "Сергеевич" },
        },
        vehicle: {
            vehicle: {
                type: "Грузовой фургон",
                brand: "КАМАЗ",
                model: "КАМАЗ-5320",
                registrationNumber: "А123ВС77",
            },
        },
    },
    signer: {
        position: "Механик",
        authorityConfirmationMethod: AuthorityConfirmationMethod.SignatureData,
        fullName: { lastName: "Сидоров", firstName: "Сергей", middleName: "Сергеевич" },
    },
};

export const epl1110383Fixture: TDocument1110383 = {
    technicalCheckFileId: {
        fileId: "ON_PTLTECHCHECK__0_20260813_",
        fileDateTime: new Date("2026-08-13T08:00:00+03:00"),
        signature: "BASE64_SIGNATURE",
    },
    content: {
        waybillId: "ПЛ-2026-0001",
        tripStartSign: TripStartSign.ParkingDeparture,
        odometerDeparture: {
            departureDateTime: new Date("2026-08-13T09:00:00+03:00"),
            odometerReading: 124122,
        },
        authorizedPerson: {
            position: "Диспетчер",
            fullName: { lastName: "Окнов", firstName: "Андрей", middleName: "Петрович" },
        },
    },
    signer: {
        position: "Диспетчер",
        authorityConfirmationMethod: AuthorityConfirmationMethod.SignatureData,
        fullName: { lastName: "Окнов", firstName: "Андрей", middleName: "Петрович" },
    },
};

export const epl1110384Fixture: TDocument1110384 = {
    departureFileId: {
        fileId: "ON_PTLODOMDEP_____0_20260813_",
        fileDateTime: new Date("2026-08-13T09:00:00+03:00"),
        signature: "BASE64_SIGNATURE",
    },
    content: {
        waybillId: "ПЛ-2026-0001",
        tripEndSign: TripEndSign.ParkingArrival,
        odometerArrival: {
            arrivalDateTime: new Date("2026-08-13T18:00:00+03:00"),
            odometerReading: 124500,
        },
        authorizedPerson: {
            position: "Диспетчер",
            fullName: { lastName: "Окнов", firstName: "Андрей", middleName: "Петрович" },
        },
    },
    signer: {
        position: "Диспетчер",
        authorityConfirmationMethod: AuthorityConfirmationMethod.SignatureData,
        fullName: { lastName: "Окнов", firstName: "Андрей", middleName: "Петрович" },
    },
};
