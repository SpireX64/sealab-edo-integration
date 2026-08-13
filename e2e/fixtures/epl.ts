/**
 * Минимальная валидная фикстура документа ЭПЛ 1110380
 * («Путевой лист — обстоятельства и особенности рейса», титул Т1).
 *
 * Составлена по официальной структуре типов `src/docs/epl/1110380`.
 * Используется только конструктор `Document1110380`.
 */

import {
    Document1110380,
    TripStartSign,
    TransportKind,
    MessageKind,
    WaybillIssuerKind,
    IdentificationKind,
    AddressType,
    SignatureType,
    AuthorityConfirmationMethod,
    type TDocument1110380,
} from "../../src/docs/epl/1110380";

export const eplFixture: TDocument1110380 = {
    number: "ПЛ-2026-0001",
    issueDate: new Date("2026-08-13T00:00:00+03:00"),
    tripStartSign: TripStartSign.ParkingDeparture,

    content: {
        isPostTripMedicalExamRequired: false,
        transportKind: TransportKind.OwnNeeds,
        messageKind: MessageKind.Intercity,

        validity: {
            isSingleDay: true,
            singleDayDate: new Date("2026-08-13T00:00:00+03:00"),
        },

        issuer: {
            issuerKind: WaybillIssuerKind.Owner,
            identificationDetails: {
                identificationKind: IdentificationKind.LegalEntity,
                legalEntity: {
                    orgName: 'Общество с ограниченной ответственностью "ОСНОва"',
                    inn: "2145492416",
                    kpp: "214501001",
                    ogrn: "1908097524685",
                },
            },
            address: {
                addressType: AddressType.RussianAddress,
                russianAddress: {
                    postalCode: "150000",
                    regionCode: "76",
                    city: "Ярославль",
                    street: "ул. Угличская",
                    house: "36",
                },
            },
            contacts: {
                phones: ["+7 (4852) 22-22-22"],
            },
        },

        vehicle: {
            vehicle: {
                type: "Седельный тягач",
                brand: "Volvo FH 16.540",
                model: "Volvo FH 16.540",
                registrationNumber: "п879ка78",
            },
        },

        drivers: [
            {
                inn: "727247929907",
                fullName: { lastName: "Быстров", firstName: "Олег", middleName: "Юрьевич" },
            },
        ],
    },

    signer: {
        position: "Генеральный директор",
        signatureType: SignatureType.QualifiedDigital,
        authorityConfirmationMethod: AuthorityConfirmationMethod.SignatureData,
        fullName: { lastName: "Иванов", firstName: "Иван", middleName: "Иванович" },
    },
};

export { Document1110380 };
