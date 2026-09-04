/**
 * Преобразование структуры документа ЭПЛ 1110380 в семантические ключи
 * «Подстановки» — формат, который принимает сервер Saby TMS:
 *
 *   - `СБИС.СгенерироватьВложение` — в поле `Вложение[].Подстановка`;
 *   - `СБИС.ЗаписатьДокумент`     — на верхнем уровне `Документ` (рядом
 *     с `Вложение`, `Медосмотр`, `Техосмотр`, `Выпуск`, `Приемка`).
 *
 * Последнее обязательно: при `ВыполнитьДействие` сервер пересобирает XML из
 * семантической модели. Если в `ЗаписатьДокумент` передать только файл XML
 * (без семантических полей), модель окажется пустой и титул Т1 будет
 * «поломан» (потеряются ВидПрв/ВидСообщ/СвТС/СвВодит и т.п.).
 *
 * Формат ключей приведён в официальной документации Saby TMS (ЭПЛ) и в
 * Postman-коллекции «Путевой лист (ЭПЛ)».
 */

import { formatDate } from '../../../helpers'
import {
    AddressType,
    IdentificationKind,
    ParticipantKind,
    formatCommercialTransportKind,
    formatMessageKind,
    formatTransportKind,
    formatTripStartSign,
    formatWaybillIssuerKind,
} from './consts'
import type { TDocument1110380 } from './doc'
import type { TWaybillIssuer } from './data/5.5-WaybillIssuer'
import type { TIdentificationDetails } from './data/5.6-IdentificationDetails'
import type { TVehicleInfo } from './data/5.9-VehicleInfo'
import type { TDriverInfo } from './data/5.12-DriverInfo'
import type { TShipperInfo } from './data/5.14-ShipperInfo'
import type { TParticipantIdentification } from './data/5.16-ParticipantIdentification'
import type { TAddress } from './data/5.29-Address'
import type { TRussianAddress } from './data/5.30-RussianAddress'
import type { TFiasAddress } from './data/5.31-FiasAddress'
import type { TContacts } from '../../common/Contacts'

type Semantic = Record<string, unknown>

/** Склеивает структурированный адрес РФ (ЕГРЮЛ) в свободный текст. */
function buildRussianAddressText(addr: TRussianAddress): string {
    const parts: string[] = [];

    const locality = addr.city || addr.settlement;
    if (locality) parts.push(`г. ${locality}`);
    if (addr.district) parts.push(addr.district);
    if (addr.street) parts.push(addr.street);
    if (addr.house) parts.push(`д. ${addr.house}`);
    if (addr.building) parts.push(`корп. ${addr.building}`);
    if (addr.apartment) parts.push(`кв. ${addr.apartment}`);
    if (addr.otherInfo) parts.push(addr.otherInfo);

    return parts.join(", ");
}

/** Склеивает адрес ФИАС в свободный текст (best-effort). */
function buildFiasAddressText(addr: TFiasAddress): string {
    const parts: string[] = [];

    if (addr.municipalDistrict?.name) parts.push(addr.municipalDistrict.name);
    if (addr.urbanRuralSettlement?.name) parts.push(addr.urbanRuralSettlement.name);
    if (addr.locality?.name) parts.push(addr.locality.name);
    if (addr.planningStructureElement?.name) parts.push(addr.planningStructureElement.name);
    if (addr.streetRoadNetworkElement?.name) parts.push(addr.streetRoadNetworkElement.name);
    if (addr.landPlot) parts.push(addr.landPlot);
    for (const b of addr.buildings ?? []) {
        if (b.elementNumber) parts.push(`${b.elementType ?? ""} ${b.elementNumber}`.trim());
    }
    if (addr.buildingPremises?.elementNumber) {
        parts.push(addr.buildingPremises.elementNumber);
    }
    if (addr.apartmentPremises?.elementNumber) {
        parts.push(addr.apartmentPremises.elementNumber);
    }

    return parts.join(", ");
}

/** Адрес → семантическая пара `{КодСтраны, АдресТекст}`. */
function mapAddressToPair(address: TAddress | undefined): Semantic | undefined {
    if (!address) return undefined;

    switch (address.addressType) {
        case AddressType.ForeignAddressInfo:
            return {
                "КодСтраны": address.foreignAddressInfo.countryCode,
                "АдресТекст": address.foreignAddressInfo.addressText,
            };

        case AddressType.RussianAddress:
            return {
                "КодСтраны": "643",
                "АдресТекст": buildRussianAddressText(address.russianAddress),
            };

        case AddressType.FiasAddress:
            return {
                "КодСтраны": "643",
                "АдресТекст": buildFiasAddressText(address.fiasAddress),
            };
    }
}

/** Реквизиты (`ИдСв`) → семантический `Реквизиты.{ЮЛ|ИП}`. */
function mapRequisites(ident: TIdentificationDetails | undefined): Semantic | undefined {
    if (!ident) return undefined;

    if (ident.identificationKind === IdentificationKind.LegalEntity) {
        const org = ident.legalEntity;
        return {
            "ЮЛ": {
                "ИНН": org.inn,
                "КПП": org.kpp,
                "Название": org.orgName,
                "ОГРН": org.ogrn,
            },
        };
    }

    const ip = ident.individualEntrepreneur;
    return {
        "ИП": {
            "ИНН": ip.inn,
            "ОГРНИП": ip.ogrnip,
            "Фамилия": ip.fullName.lastName,
            "Имя": ip.fullName.firstName,
            "Отчество": ip.fullName.middleName,
        },
    };
}

/** Контакты → семантический `Контакты`. */
function mapContacts(contacts: TContacts | undefined): Semantic | undefined {
    if (!contacts) return undefined;

    const result: Semantic = {};

    if (contacts.phones.length) {
        result["Телефон"] = contacts.phones.map((value) => ({ "Значение": value }));
    }
    if (contacts.emails?.length) {
        result["ЭлектроннаяПочта"] = contacts.emails.map((value) => ({ "Значение": value }));
    }
    if (contacts.otherContacts) {
        result["ИнКонт"] = contacts.otherContacts;
    }

    return Object.keys(result).length > 0 ? result : undefined;
}

/** Оформитель (`СвЛицПЛ`) → семантический `Оформитель`. */
function mapIssuer(issuer: TWaybillIssuer | undefined): Semantic | undefined {
    if (!issuer) return undefined;

    return {
        "Тип": formatWaybillIssuerKind(issuer.issuerKind),
        "Реквизиты": mapRequisites(issuer.identificationDetails),
        "Адрес": mapAddressToPair(issuer.address),
        "Контакты": mapContacts(issuer.contacts),
    };
}

/** Транспортное средство → семантический `ТранспортноеСредство`. */
function mapVehicle(vehicle: TVehicleInfo | undefined): Semantic | undefined {
    if (!vehicle) return undefined;

    const result: Semantic = {
        "Тип": vehicle.vehicle.type,
        "Марка": vehicle.vehicle.brand,
        "Модель": vehicle.vehicle.model,
        "РегНомер": vehicle.vehicle.registrationNumber,
        "ИнвентарныйНомер": vehicle.vehicle.inventoryNumber,
    };

    if (vehicle.trailers?.length) {
        result["Прицеп"] = vehicle.trailers.map((t) => ({
            "Марка": t.brand,
            "Модель": t.model,
            "РегНомер": t.registrationNumber,
        }));
    }

    return result;
}

/** Водитель → семантический `Водитель`. */
function mapDriver(driver: TDriverInfo): Semantic {
    const result: Semantic = {
        "ИННФЛ": driver.inn,
        "Фамилия": driver.fullName.lastName,
        "Имя": driver.fullName.firstName,
        "Отчество": driver.fullName.middleName,
    };

    if (driver.driverLicense) {
        result["ВУ"] = {
            "ДатаВыдачи": formatDate(driver.driverLicense.issueDate),
            "Номер": driver.driverLicense.number,
            "Серия": driver.driverLicense.series,
        };
    }

    return result;
}

/** Идентификационные сведения участника → ИНН (`ЮЛ.ИНН` / `ИП.ИНН`). */
function mapParticipantInn(ident: TParticipantIdentification): string | undefined {
    switch (ident.participantKind) {
        case ParticipantKind.LegalEntity:
            return ident.legalEntity.inn;
        case ParticipantKind.IndividualEntrepreneur:
            return ident.individualEntrepreneur.inn;
        case ParticipantKind.Individual:
            return ident.individual.inn;
        case ParticipantKind.ForeignEntityNotRegistered:
            return undefined;
    }
}

/** Грузоотправитель → семантический `Маршрут.Грузоотправитель[]`. */
function mapShipper(shipper: TShipperInfo): Semantic {
    return {
        "Реквизиты": {
            "ИНН": mapParticipantInn(shipper.identificationDetails),
        },
    };
}

/**
 * Формирует семантические ключи «Подстановки» из структуры документа ЭПЛ 1110380.
 *
 * Возвращаемый объект передаётся:
 *   - в `ЗаписатьДокумент` на верхнем уровне `Документ` (обязательно);
 *   - в `СгенерироватьВложение` в поле `Вложение[].Подстановка`.
 */
export function toSubstitution(data: TDocument1110380): Semantic {
    const content = data.content;
    const validity = content.validity;

    const route: Semantic = {};
    const [origin, ...routePoints] = content.departurePoints ?? [];

    if (origin) {
        route["Отправление"] = mapAddressToPair(origin.address);
    }
    if (routePoints.length > 0) {
        route["Пункт"] = routePoints
            .map((p) => mapAddressToPair(p.address))
            .filter(Boolean);
    }

    const document: Semantic = {
        "Номер": data.number,
        "ДатаПЛ": data.issueDate ? formatDate(data.issueDate) : undefined,
        "ПризнакНачалаРейса": formatTripStartSign(data.tripStartSign),
        "ВидПеревозки": formatTransportKind(content.transportKind),
        "ВидКоммерческойПеревозки": content.commercialTransportKind
            ? formatCommercialTransportKind(content.commercialTransportKind)
            : undefined,
        "ВидСообщения": formatMessageKind(content.messageKind),
        "ПослерейсовыйМедосмотр": content.isPostTripMedicalExamRequired ? "1" : "2",
        "Длительность": validity.isSingleDay ? "1" : "2",
        "ДатаИсполнения": validity.singleDayDate ? formatDate(validity.singleDayDate) : undefined,
        "ДатаНачалаИсполнение": validity.startDate ? formatDate(validity.startDate) : undefined,
        "ДатаКонцаИсполнение": validity.endDate ? formatDate(validity.endDate) : undefined,
        "Оформитель": mapIssuer(content.issuer),
    };

    return {
        "Документ": document,
        "Маршрут": route,
        "Маршрут.Грузоотправитель": content.shippers?.length
            ? content.shippers.map(mapShipper)
            : undefined,
        "ТранспортноеСредство": mapVehicle(content.vehicle),
        "Водители": content.drivers.length
            ? { "Водитель": content.drivers.map(mapDriver) }
            : undefined,
    };
}
