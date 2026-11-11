import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
    Document1110486,
    AuthorityConfirmationMethod,
    MunicipalDistrictKind,
    SettlementKind,
    type TAddress,
    type TIdentification,
} from "../src/docs/exp/1110486";
import { Document1110487, VatRate } from "../src/docs/exp/1110487";
import { Document1110488 } from "../src/docs/exp/1110488";
import {
    schema1110486,
    schema1110487,
    schema1110488,
} from "../src/docs/exp/validation/schemas.generated";
import type { Particle } from "../src/docs/exp/validation/schema-types";
import { validateInstructionNode } from "../src/docs/exp/validation/validate";
import { encodeWindows1251, toXml, type XmlNode } from "../src/helpers";
import { exp1110486Fixture as client } from "./fixtures/exp-client";
import { exp1110487Fixture as forwarder } from "./fixtures/exp-forwarder";
import { exp1110488Fixture as withdrawal } from "./fixtures/exp-withdrawal";

const meta = {
    programTag: "TOS TEST",
    documentId: "00000000-0000-4000-8000-000000000001",
};
const date = new Date(2026, 8, 24);
const fullName = {
    lastName: "Тестов",
    firstName: "Тест",
    middleName: "Тестович",
};
const correction = {
    previousFileId: "ON_POREXPKLT_PREVIOUS",
    number: 1,
    issuedAt: date,
};
const gar: TAddress = {
    kind: "gar",
    gar: {
        id: "00000000-0000-4000-8000-000000000002",
        postalCode: "101000",
        regionCode: "77",
        regionName: "Москва",
        municipalDistrict: {
            kindCode: MunicipalDistrictKind.MunicipalDistrict,
            name: "Тестовый район",
        },
        urbanRuralSettlement: {
            kindCode: SettlementKind.UrbanSettlement,
            name: "Поселение",
        },
        locality: { kind: "г", name: "Москва" },
        planningStructureElement: { elementType: "кв-л", name: "Первый" },
        streetRoadNetworkElement: { elementType: "ул", name: "Тестовая" },
        landPlot: "1",
        buildings: [
            { elementType: "д", elementNumber: "1" },
            { elementType: "стр", elementNumber: "2" },
            { elementType: "корп", elementNumber: "3" },
        ],
        buildingPremises: { elementType: "оф", elementNumber: "1" },
        apartmentPremises: { elementType: "ком", elementNumber: "2" },
    },
};

const identities: TIdentification[] = [
    {
        kind: "soleProprietor",
        soleProprietor: {
            inn: "770000000000",
            registrationDetails: "Запись",
            ogrnip: "300000000000000",
            ogrnipIssuedAt: date,
            otherDetails: "Сведения",
            fullName,
        },
    },
    {
        kind: "individual",
        individual: { inn: "770000000000", fullName, otherDetails: "Сведения" },
    },
    {
        kind: "individual",
        individual: { otherDetails: "Документ физического лица" },
    },
    {
        kind: "foreign",
        foreign: {
            legalEntity: true,
            countryCode: "112",
            countryName: "Беларусь",
            name: "Организация",
            id: "123",
            otherDetails: "Сведения",
        },
    },
    {
        kind: "foreign",
        foreign: {
            legalEntity: false,
            countryCode: "112",
            countryName: "Беларусь",
            name: "Физическое лицо",
            otherDetails: "Паспорт",
        },
    },
];

const russian: TAddress = {
    kind: "russian",
    gln: "0000000000000",
    russian: {
        postalCode: "101000",
        regionCode: "77",
        regionName: "Москва",
        district: "Район",
        city: "Москва",
        settlement: "Поселок",
        street: "Тестовая",
        house: "1",
        building: "2",
        apartment: "3",
        otherInfo: "Сведения",
    },
};
const foreign: TAddress = {
    kind: "foreign",
    foreign: {
        countryCode: "112",
        countryName: "Беларусь",
        addressText: "Минск",
    },
};
const info = [
    {
        fileId: "00000000-0000-4000-8000-000000000004",
        textEntries: [{ identifier: "Тест", content: "Сведения" }],
    },
];
const paperSigner = {
    ...client.signer,
    fullName,
    authorityConfirmationMethod: AuthorityConfirmationMethod.PaperPOA,
    electronicPOAs: [],
    paperPOAs: [
        {
            issuedAt: date,
            internalNumber: "1",
            issuerInfo: "Доверитель",
            signerFullName: fullName,
        },
    ],
};
const issuers = [
    { kind: "individual" as const, inn: "770000000000" },
    { kind: "authority" as const, name: "Орган власти" },
    {
        kind: "foreign" as const,
        foreign: {
            legalEntity: true,
            countryCode: "112",
            countryName: "Беларусь",
            name: "Организация",
            id: "123",
            otherDetails: "Сведения",
        },
    },
];

function verify(nodes: XmlNode[], schema: typeof schema1110486) {
    const cases = nodes.map(node => ({
        schema: schema.file,
        filename: (node.Файл as Record<string, unknown>).ИдФайл,
        xml: encodeWindows1251(toXml(node)).toString("base64"),
    }));
    const result = execFileSync(
        "python3",
        [
            fileURLToPath(
                new URL("../scripts/validate-exp-xml.py", import.meta.url),
            ),
        ],
        {
            input: JSON.stringify(cases),
            encoding: "utf8",
        },
    );
    expect(result).toContain("все документы прошли");
    const covered = new Set<string>();
    const expected = new Set<string>();
    function elements(
        particle: Particle,
    ): Extract<Particle, { kind: "element" }>[] {
        return particle.kind === "element"
            ? [particle]
            : particle.children.flatMap(elements);
    }
    function collect(value: unknown, index: number) {
        const type = schema.types[index]!;
        if (type.kind === "simple") return;
        const data = value as Record<string, unknown>;
        for (const key of Object.keys(type.attributes))
            if (data[key] != null) covered.add(`${index}/@${key}`);
        for (const element of type.model.flatMap(elements)) {
            const raw = data[element.name];
            const values = raw == null ? [] : Array.isArray(raw) ? raw : [raw];
            if (values.length) covered.add(`${index}/${element.name}`);
            values.forEach(child => collect(child, element.type));
        }
    }
    schema.types.forEach((type, index) => {
        if (type.kind === "simple") return;
        Object.keys(type.attributes).forEach(key =>
            expected.add(`${index}/@${key}`),
        );
        type.model
            .flatMap(elements)
            .forEach(element => expected.add(`${index}/${element.name}`));
    });
    nodes.forEach(node => collect(node.Файл, schema.root));
    expect(
        [...expected].filter(key => !covered.has(key)),
        "Каждое поле XSD должно быть достижимо через публичный конструктор",
    ).toEqual([]);
}

describe("Поручение: независимая проверка XSD и встроенного Schematron", () => {
    it("закрепляет исходные схемы и воспроизводимость ограничений", () => {
        for (const schema of [schema1110486, schema1110487, schema1110488]) {
            const bytes = readFileSync(
                new URL(`../schemas/exp/${schema.file}`, import.meta.url),
            );
            expect(createHash("sha256").update(bytes).digest("hex")).toBe(
                schema.sha256,
            );
        }
        execFileSync("python3", [
            fileURLToPath(
                new URL("../scripts/generate-exp-schema.py", import.meta.url),
            ),
            "--check",
        ]);
    });

    it("Т1: все виды сторон, адресов, составителей и доверенностей; опасный груз и ГИС", () => {
        const variants = [structuredClone(client)];
        variants[0]!.content.client.address = russian;
        variants[0]!.content.infoField = info;
        for (const identification of identities) {
            const data = structuredClone(client);
            data.content.client = { ...data.content.client, identification };
            data.content.client.address = gar;
            data.content.forwarder.address = {
                kind: "foreign",
                foreign: {
                    countryCode: "112",
                    countryName: "Беларусь",
                    addressText: "Минск",
                },
            };
            data.content.contract.issuers = [
                { kind: "individual", inn: "770000000000" },
                { kind: "authority", name: "Орган власти" },
                {
                    kind: "foreign",
                    foreign: {
                        legalEntity: true,
                        countryCode: "112",
                        countryName: "Беларусь",
                        name: "Организация",
                        id: "123",
                    },
                },
            ];
            data.signer = {
                fullName,
                authorityConfirmationMethod:
                    AuthorityConfirmationMethod.PaperPOA,
                signatureType: 3,
                paperPOAs: [
                    {
                        issuedAt: date,
                        internalNumber: "1",
                        issuerInfo: "Доверитель",
                        signerFullName: fullName,
                    },
                ],
            };
            variants.push(data);
        }
        const data = structuredClone(client);
        data.content.originalFileId = "ON_POREXPKLT_ORIGINAL";
        data.content.correction = correction;
        data.content.withdrawnInstructionId =
            "00000000-0000-4000-8000-000000000003";
        data.content.actualValue = data.content.declaredValue!;
        delete data.content.declaredValue;
        const part = data.content.consignments[0]!;
        part.actualValue = part.declaredValue!;
        delete part.declaredValue;
        part.receipt.address.coordinates = {
            latitude: "55.75",
            longitude: "037.61",
        };
        const cargo = part.cargo[0]!;
        cargo.actualValue = cargo.declaredValue!;
        delete cargo.declaredValue;
        cargo.dangerous = true;
        cargo.dangerousGoods = [
            {
                regulation: "ДОПОГ",
                unNumber: "1234",
                shippingName: "Тестовый груз",
                hazardClass: "7",
                technicalName: "Наименование",
                description: "Описание",
                classificationCode: "Код",
                packingGroup: "II",
                hazardLabel: "7",
                tunnelCode: "E",
                radionuclide: "Радионуклид",
                physicalChemicalForm: "Форма",
                maxActivity: "1",
                packageCategory: "II",
                transportIndex: "1",
                criticalitySafetyIndex: "1",
                approvalCertificateId: "1",
                totalActivity: "1",
                controlTemperature: "10",
                emergencyTemperature: "20",
            },
        ];
        cargo.stateRegistration = 1;
        cargo.stateSystems = [
            {
                code: "99",
                otherName: "Тестовая ГИС",
                accountingUnit: "Единица",
                otherInfo: "Сведения",
                unitId: "123",
            },
        ];
        part.containers![0]!.nonstandardId = "Тестовый контейнер";
        delete part.containers![0]!.internationalId;
        variants.push(data);
        const minimal = structuredClone(client);
        delete minimal.compilerName;
        delete minimal.compilerAuthority;
        minimal.content.hasAccompanyingDocuments = false;
        delete minimal.content.accompanyingDocuments;
        minimal.signer = {
            fullName,
            authorityConfirmationMethod:
                AuthorityConfirmationMethod.SignatureData,
        };
        const simplePart = minimal.content.consignments[0]!;
        simplePart.notifyParties = false;
        delete simplePart.notifications;
        simplePart.carriageType = 0;
        delete simplePart.containers;
        const simpleCargo = simplePart.cargo[0]!;
        delete simpleCargo.containerNumbers;
        simpleCargo.packaged = false;
        delete simpleCargo.packaging;
        simpleCargo.commodityCodeAvailable = false;
        delete simpleCargo.commodityCode;
        simpleCargo.volumeKnown = false;
        delete simpleCargo.volume;
        simpleCargo.stateRegistration = 2;
        variants.push(minimal);
        verify(
            variants.map(value => Document1110486(value, meta)),
            schema1110486,
        );
    });

    it("Т2: исправление, все виды транспорта, НДС и способы исполнения", () => {
        const variants = [structuredClone(forwarder)];
        variants[0]!.signer = client.signer;
        variants[0]!.content.infoField = info;
        for (const identification of [
            client.content.client.identification,
            ...identities,
        ]) {
            for (const address of [russian, foreign, gar]) {
                const data = structuredClone(forwarder);
                const service = data.content.services![0]!;
                service.thirdParty!.participant = {
                    ...client.content.client,
                    identification,
                    address,
                };
                service.thirdParty!.authority = {
                    ...client.content.contract,
                    issuers,
                };
                service.payment = {
                    amountIncludingVat: 100,
                    currencyCode: "643",
                    currencyName: "Российский рубль",
                    vatRate: VatRate.WithoutVat,
                    vatAmount: "без НДС",
                };
                data.signer = paperSigner;
                variants.push(data);
            }
        }
        for (const mode of [1, 2, 3, 4, 5] as const) {
            const data = structuredClone(forwarder);
            data.content.originalFileId = "ON_POREXPEXP_ORIGINAL";
            data.content.correction = correction;
            const service = data.content.services![0]!;
            service.executionMode = 3;
            service.thirdParty!.participant.bankDetails =
                client.content.client.bankDetails!;
            service.thirdParty!.participant.contacts =
                client.content.client.contacts!;
            service.transportation = [
                { route: "Тестовый маршрут", vehicles: [{ mode }] },
            ];
            variants.push(data);
        }
        const minimal = structuredClone(forwarder);
        delete minimal.content.services;
        minimal.signer = {
            fullName,
            authorityConfirmationMethod:
                AuthorityConfirmationMethod.SignatureData,
        };
        variants.push(minimal);
        verify(
            variants.map(value => Document1110487(value, meta)),
            schema1110487,
        );
    });

    it("Т3: исправление, оба способа возврата, полный ГАР и отсутствие возврата", () => {
        const data = structuredClone(withdrawal);
        data.content.originalFileId = "ON_POREXPOTZ_ORIGINAL";
        data.content.correction = correction;
        data.content.cargoReturn!.method = 2;
        data.content.cargoReturn!.address = { address: gar };
        data.content.cargoReturn!.contacts = { otherContacts: "Способ связи" };
        const minimal = structuredClone(withdrawal);
        minimal.content = {
            instructionId: withdrawal.content.instructionId,
            withdrawnOn: date,
        };
        minimal.signer = {
            fullName,
            authorityConfirmationMethod:
                AuthorityConfirmationMethod.SignatureData,
        };
        const complete = structuredClone(withdrawal);
        complete.signer = client.signer;
        complete.content.infoField = info;
        complete.content.cargoReturn!.contactPerson = fullName;
        complete.content.cargoReturn!.address = {
            address: russian,
            coordinates: { latitude: "55.75", longitude: "037.61" },
        };
        const foreignReturn = structuredClone(complete);
        foreignReturn.signer = paperSigner;
        foreignReturn.content.cargoReturn!.address = { address: foreign };
        verify(
            [withdrawal, data, minimal, complete, foreignReturn].map(value =>
                Document1110488(value, meta),
            ),
            schema1110488,
        );
    });
});

describe("Блокировка некорректных XML до сериализации", () => {
    it.each([
        ["Документ.КНД", "1110487"],
        ["Документ.ДатИнфКлнт", "31.02.2026"],
        ["Документ.СодИнфКлнт.НомДок", ""],
        ["Документ.СодИнфКлнт.НомДок", "Я".repeat(1001)],
        ["Документ.СодИнфКлнт.УИД_ПорЭксп", "123"],
        ["Документ.СодИнфКлнт.СвГруз.0.ОпГруз.0.КолМестГр", "1.5"],
        [
            "Документ.СодИнфКлнт.СвГруз.0.ОпГруз.0.ВесГруз.ВесНетто",
            "12345678901234567890",
        ],
        ["Документ.СодИнфКлнт.СвГруз.0.ОпГруз.0.ВесГруз.ВесНетто", "1.1234"],
        ["Документ.СодИнфКлнт.ДогТрЭксп", undefined],
        ["Документ.ПодпИнфКлнт.ФИО.Имя", undefined],
    ])("runtime и libxml2 отвергают %s = %s", (path, value) => {
        const node = structuredClone(Document1110486(client, meta));
        let target = node.Файл as Record<string, unknown>;
        const keys = path.split(".");
        const last = keys.pop()!;
        for (const key of keys) target = target[key] as Record<string, unknown>;
        target[last] = value;
        expect(() => validateInstructionNode(node, schema1110486)).toThrow(
            TypeError,
        );
        const result = execFileSync(
            "python3",
            [
                "-c",
                "import sys,base64,json; from lxml import etree; c=json.load(sys.stdin); s=etree.XMLSchema(etree.parse(c['schema'])); print(s.validate(etree.fromstring(base64.b64decode(c['xml']))))",
            ],
            {
                input: JSON.stringify({
                    schema: fileURLToPath(
                        new URL(
                            `../schemas/exp/${schema1110486.file}`,
                            import.meta.url,
                        ),
                    ),
                    xml: encodeWindows1251(toXml(node)).toString("base64"),
                }),
                encoding: "utf8",
            },
        );
        expect(result.trim()).toBe("False");
    });
    it.each([
        ["нет имени", ""],
        ["длинное имя", "Я".repeat(1001)],
        ["управляющий символ", "Груз\u0000"],
        ["потеря CP1251", "Груз 🚚"],
    ])("%s", (_label, name) => {
        const data = structuredClone(client);
        data.content.consignments[0]!.cargo[0]!.name = name;
        expect(() => Document1110486(data, meta)).toThrow(TypeError);
    });
    it.each([NaN, Infinity, 1e30])("невалидная масса %s", mass => {
        const data = structuredClone(client);
        data.content.consignments[0]!.cargo[0]!.weight.netKg = mass;
        expect(() => Document1110486(data, meta)).toThrow(/ВесНетто/);
    });
    it.each(["1", "00abcdefgh", "77000000000"])("невалидный ИНН %s", inn => {
        const data = structuredClone(client);
        data.content.client.identification = {
            kind: "legalEntity",
            legalEntity: { name: "Организация", inn },
        };
        expect(() => Document1110486(data, meta)).toThrow(/ИННЮЛ/);
    });
    it("блокирует неверную дату, дробное число мест и неизвестный код транспорта", () => {
        const data = structuredClone(client);
        data.createdAt = new Date(NaN);
        expect(() => Document1110486(data, meta)).toThrow();
        data.createdAt = date;
        data.content.consignments[0]!.cargo[0]!.packageCount = 1.5;
        expect(() => Document1110486(data, meta)).toThrow(/КолМестГр/);
        data.content.consignments[0]!.cargo[0]!.packageCount = 1;
        data.content.consignments[0]!.transport = [{ mode: 99 as 1 }];
        expect(() => Document1110486(data, meta)).toThrow(/ВидТС/);
    });
    it("требует реальную подпись исходного файла и УИД в Т2/Т3", () => {
        expect(() =>
            Document1110487(
                {
                    ...forwarder,
                    clientFileId: { ...forwarder.clientFileId, signBase64: "" },
                },
                meta,
            ),
        ).toThrow(/ЭП/);
        expect(() =>
            Document1110488(
                {
                    ...withdrawal,
                    content: { ...withdrawal.content, instructionId: "" },
                },
                meta,
            ),
        ).toThrow(/УИД_ПорЭксп/);
    });
});
