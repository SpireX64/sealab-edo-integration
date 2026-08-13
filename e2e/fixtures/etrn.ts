/**
 * Минимальная валидная фикстура документа ЭТрН 1110339
 * («Транспортная накладная — информация грузоотправителя», титул Т1).
 *
 * Составлена по официальной структуре типов `src/docs/etrn/1110339`.
 * Используется только конструктор `Document111339`.
 */

import {
    Document111339,
    IssuerType,
    VehicleOwnershipType,
    MassDeterminationMethod,
    ReaddressingAuthority,
    ShipperSignerStatus,
    InfraOwnerMatchesShipper,
    type TDocument111339,
} from "../../src/docs/etrn/1110339";

export const etrnFixture: TDocument111339 = {
    issuer: 'Общество с ограниченной ответственностью "ОСНОва"',

    signer: {
        status: ShipperSignerStatus.ShipperWithoutPOA,
        position: "Генеральный директор",
        fullName: { lastName: "Иванов", firstName: "Иван", middleName: "Иванович" },
    },

    waybill: {
        number: 1,
        date: new Date("2026-08-13T00:00:00+03:00"),
    },

    order: {
        number: 1,
        date: new Date("2026-08-13T00:00:00+03:00"),
    },

    shipper: {
        ident: {
            partyId: {
                type: IssuerType.LegalEntity,
                name: 'Общество с ограниченной ответственностью "ОСНОва"',
                inn: "7700123456",
                kpp: "770101001",
            },
            contacts: { phones: ["+7 495 000-00-00"] },
        },
    },

    consignee: {
        ident: {
            partyId: {
                type: IssuerType.LegalEntity,
                name: 'Общество с ограниченной ответственностью "Получатель"',
                inn: "7700765432",
            },
            contacts: { phones: ["+7 495 111-11-11"] },
        },
        deliveryAddress: {
            address: {
                postalCode: "117437",
                regionCode: "77",
                city: "Москва",
                street: "ул. Профсоюзная",
                house: "1",
            },
        },
    },

    operationDesc: "Груз с указанными характеристиками передан водителю лицом, осуществляющим погрузку",

    cargo: [
        {
            description: [
                {
                    name: "Оборудование",
                    tnVedCode: "8479",
                    condition: "Новое",
                    packagingMethod: "Паллеты",
                    containerType: "ПЛ",
                    packageCount: 1,
                    marking: [],
                    plannedWeight: { gross: 500 },
                },
            ],
        },
    ],

    loadingInfo: {
        plannedArrivalDateTime: new Date("2026-08-13T10:00:00+03:00"),
        actualArrivalDateTime: new Date("2026-08-13T09:45:00+03:00"),
        actualDepartureDateTime: new Date("2026-08-13T12:00:00+03:00"),
        grossWeight: "500",
        massDeterminationMethod: MassDeterminationMethod.TotalWeight,
        packageCount: 1,
        loadingAddress: {
            address: {
                postalCode: "117437",
                regionCode: "77",
                city: "Москва",
                street: "ул. Профсоюзная",
                house: "1",
            },
        },
        loadingPerson: {
            matchesShipper: true,
            shipperIdentity: { type: IssuerType.LegalEntity, id: "7700123456" },
        },
        infrastructureOwner: {
            matchesShipper: InfraOwnerMatchesShipper.Matches,
            shipperIdentity: { type: IssuerType.LegalEntity, id: "7700123456" },
        },
    },

    carrier: {
        partyId: {
            type: IssuerType.LegalEntity,
            name: 'Общество с ограниченной ответственностью "Перевозчик"',
            inn: "7712345678",
        },
        contacts: { phones: ["+7 495 222-22-22"] },
    },

    driverInfo: [
        {
            inn: "123456789012",
            phone: ["+7 916 123-45-67"],
            fullName: { lastName: "Петров", firstName: "Пётр", middleName: "Петрович" },
        },
    ],

    vehicleInfo: {
        vehicle: {
            regNumber: "А123ВС77",
            ownershipType: VehicleOwnershipType.Owned,
            specs: {
                type: "Грузовой фургон",
                brand: "КАМАЗ",
                loadCapacity: 10,
                capacity: 40,
            },
        },
    },

    shipperInstructions: {
        readdressingInfo: {
            authority: ReaddressingAuthority.Shipper,
            instructionDeliveryMethod: "Электронное уведомление перевозчика о переадресовке",
            contacts: { phones: ["+7 495 000-00-00"] },
        },
    },

    correction: {
        correctionNumber: 0,
        correctionDate: new Date("2026-08-13T00:00:00+03:00"),
    },
};

export { Document111339 };
