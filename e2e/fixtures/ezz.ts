/**
 * Минимальная валидная фикстура документа ЭЗЗ 1110361
 * («Заказ и заявка — информация грузоотправителя», титул Т1).
 *
 * Составлена по официальной структуре типов `src/docs/ezz/1110361`.
 * Используется только конструктор `Document1110361`.
 */

import {
    Document1110361,
    DocumentFunction,
    Authority,
    OperationType,
    MassDeterminationMethod,
    SignatureType,
    AuthorityConfirmationMethod,
    IssuerType,
    type TDocument1110361,
} from "../../src/docs/ezz/1110361";

export const ezzFixture: TDocument1110361 = {
    documentFunction: DocumentFunction.Order,
    createdAt: new Date('2026-08-13T08:00:00Z'),
    compilerName: 'Общество с ограниченной ответственностью "Ромашка"',

    content: {
        orderNumber: "З-2026-000123",
        orderDate: new Date("2026-08-13T00:00:00+03:00"),
        regulatoryInstructions: "Отсутствуют",
        foodTransportInfo: "Отсутствуют",

        shipperInfo: {
            identificationDetails: {
                legalEntity: {
                    orgName: 'Общество с ограниченной ответственностью "Ромашка"',
                    inn: "7701234567",
                    kpp: "770101001",
                },
            },
            contacts: {
                phones: ["+7 (495) 123-45-67"],
            },
        },

        carrierInfo: {
            identificationDetails: {
                legalEntity: {
                    orgName: 'Общество с ограниченной ответственностью "ТрансЛогистик"',
                    inn: "7707654321",
                    kpp: "770701001",
                },
            },
            contacts: {
                phones: ["+7 (495) 765-43-21"],
            },
        },

        authorizedPersons: {
            authority: Authority.FillAndSign,
            authorityDocument: {
                name: "Доверенность",
                documentNumber: "12/2026",
                documentDate: new Date("2026-01-10T00:00:00+03:00"),
                issuerRequisites: [
                    {
                        issuerType: IssuerType.LegalEntity,
                        inn: "7701234567",
                    },
                ],
            },
            personDetails: {
                identificationDetails: {
                    individual: {
                        inn: "773456789012",
                        fullName: {
                            lastName: "Иванов",
                            firstName: "Иван",
                            middleName: "Иванович",
                        },
                    },
                },
                contacts: {
                    phones: ["+7 (926) 111-22-33"],
                },
            },
        },

        vehicleSubmissionPoint: {
            submittedAt: new Date("2026-08-14T09:00:00+03:00"),
            address: {
                addressInfo: {
                    russianAddress: {
                        postalCode: "117042",
                        regionCode: "77",
                        city: "Москва",
                        street: "ул. Складская",
                        house: "2",
                    },
                },
            },
        },

        loadingUnloadingAddresses: [
            {
                operation: OperationType.Loading,
                sequenceNumber: 1,
                operatedAt: new Date("2026-08-14T10:00:00+03:00"),
                address: {
                    addressInfo: {
                        russianAddress: {
                            postalCode: "117042",
                            regionCode: "77",
                            city: "Москва",
                            street: "ул. Складская",
                            house: "2",
                        },
                    },
                },
                infraOwner: {
                    name: 'Общество с ограниченной ответственностью "Склад-Сервис"',
                    inn: "7712345678",
                },
            },
            {
                operation: OperationType.Unloading,
                sequenceNumber: 2,
                operatedAt: new Date("2026-08-15T09:00:00+03:00"),
                address: {
                    addressInfo: {
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
        ],

        cargoDescriptions: [
            {
                name: "Мебель в разобранном виде",
                condition: "Упакован в картонные коробки",
                containerType: "00",
                packageCount: 24,
                massDeterminationMethod: MassDeterminationMethod.TotalWeight,
                volume: 12.5,
                cannotDistribute: false,
                divisible: true,
                cargoWeight: {
                    grossWeight: 1500,
                    netWeight: 1450,
                },
                dimensions: {
                    height: 2.0,
                    length: 6.0,
                    width: 2.5,
                },
            },
        ],

        vehicleRequirements: {
            vehicleType: "Тентованный",
            capacityTons: 5,
            capacityCubicMeters: 30,
            loadingType: "Задняя",
            bodyType: "Тент",
        },
    },

    signer: {
        position: "Генеральный директор",
        signatureType: SignatureType.QualifiedDigital,
        authorityConfirmationMethod: AuthorityConfirmationMethod.SignatureData,
        fullName: { lastName: "Петров", firstName: "Пётр", middleName: "Петрович" },
    },
};

export { Document1110361 };
