import { formatAddress as formatT3Address } from "../src/docs/etrn/1110341/data/13.20-Address";
import { formatConsigneeAcceptance, type TConsigneeAcceptance } from "../src/docs/etrn/1110341/data/13.5-ConsigneeAcceptance";
import { formatDriverInfo, type TDriverInfo } from '../src/docs/etrn/1110339/data/5.15-DriverInfo'
import { toXml } from '../src/helpers'
import { describe, expect, it } from 'vitest'
import { formatCargoInfo } from '../src/docs/etrn/1110339/data/5.8-CargoInfo'
import { formatSettlementDoc, type TSettlementDoc } from '../src/docs/etrn/1110339/data/5.45-SettlementDoc'
import { formatVehicleParams } from '../src/docs/etrn/1110339/data/5.37-VehicleParams'
import { formatShipperWaybill } from '../src/docs/etrn/1110339/data/5.3-ShipperWaybill'
import { IssuerType, VehicleOwnershipType } from '../src/docs/etrn/1110339/consts'
import { etrnFixture } from './fixtures/etrn'

const partyDetails: TSettlementDoc['partyDetails'] = [{ type: IssuerType.LegalEntity, id: '7700000000' }]
const requisites: TSettlementDoc = {
    name: 'Договор', documentNumber: '001', documentDate: new Date('2026-09-08T12:00:00Z'), partyDetails,
}

describe('ЭТрН Т1: локальные регрессии формата, без оператора', () => {
    it('сохраняет общую стоимость и информационные поля в тегах XSD', () => {
        const cargo = formatCargoInfo({
            description: etrnFixture.cargo[0]!.description,
            totalDeclaredValue: { amount: 1234.5, currencyCode: '643', currencyName: 'Российский рубль' },
            infoField: [{ textEntries: [{ identifier: 'Условия', content: 'Беречь от влаги' }] }],
        })
        expect(cargo['ОбЦеннГр']).toEqual({ СтЦеннГр: '1234.50', КодОКВ: '643', НаимОКВ: 'Российский рубль' })
        expect(cargo['ИнфПол']?.[0]?.ТекстИнф?.[0]?.Значение).toBe('Беречь от влаги')
        expect(cargo).not.toHaveProperty('ОбщСтоим')
        expect(cargo).not.toHaveProperty('ИнфПоле')
    })

    it('отклоняет пустое обязательное описание груза', () => {
        expect(() => formatCargoInfo({ description: [] })).toThrow('описание груза')
    })

    it.each(['name', 'documentNumber', 'documentDate'] as const)('без ID требует реквизит %s', field => {
        const incomplete = { ...requisites }
        delete incomplete[field]
        expect(() => formatSettlementDoc(incomplete)).toThrow('данные о документе')
    })

    it('при идентификации по ID не выдумывает отсутствие номера', () => {
        expect(formatSettlementDoc({ id: 'external-document', partyDetails })['НомерДок']).toBeUndefined()
    })

    it('сохраняет явный номер и подтверждённое отсутствие номера', () => {
        expect(formatSettlementDoc(requisites)['НомерДок']).toBe('001')
        expect(formatSettlementDoc({ ...requisites, documentNumber: 'Без номера' })['НомерДок']).toBe('Без номера')
    })

    it('не принимает пробелы как идентификатор вместо реквизитов', () => {
        expect(() => formatSettlementDoc({ id: ' ', partyDetails })).toThrow()
    })

    it.each([VehicleOwnershipType.Lease, VehicleOwnershipType.Leasing, VehicleOwnershipType.GratuitousUse])('владение %s требует непустого основания', ownershipType => {
        const vehicle = { ...etrnFixture.vehicleInfo.vehicle, ownershipType }
        expect(() => formatVehicleParams({ ...vehicle, ownershipDocs: [] })).toThrow('документы-основания')
        expect(() => formatVehicleParams({ ...vehicle, ownershipDocs: [requisites] })).not.toThrow()
    })

    it('проверяет ведомость даже при отсутствии всего блока сопроводительных документов', () => {
        const waybill = structuredClone(etrnFixture)
        waybill.cargo[0]!.description[0]!.name = 'Контейнер'
        delete waybill.accompanyingDocs
        expect(() => formatShipperWaybill(waybill)).toThrow('сопроводительной ведомости')
        waybill.accompanyingDocs = {}
        expect(() => formatShipperWaybill(waybill)).toThrow('сопроводительной ведомости')
    })
})

it('omits absent optional TN VED without emitting an empty attribute', () => {
    const description = { ...etrnFixture.cargo[0]!.description[0]! }
    delete description.tnVedCode
    const xml = toXml({ СвГруз: formatCargoInfo({ description: [description] }) })
    expect(xml).not.toContain('КодТовНом')
    description.tnVedCode = '1234'
    expect(toXml({ СвГруз: formatCargoInfo({ description: [description] }) })).toContain('КодТовНом="1234"')
})


describe('ЭТрН Т1: серия ВУ по условию XSD', () => {
    const driver: TDriverInfo = {
        fullName: { firstName: 'Иван', lastName: 'Иванов' }, phone: ['+79990000000'],
        driverLicenseNumber: '123456', driverLicenseSeries: '9901', driverLicenseDate: new Date('2020-01-01T12:00:00Z'),
    }
    it('передаёт отдельную серию без ИНН и при наличии ИНН', () => {
        for (const inn of [undefined, '123456789012']) {
            const result = formatDriverInfo({ ...driver, inn })
            expect(result['СерВУ']).toBe('9901')
            expect(result['НомВУ']).toBe('123456')
            expect(result['ИННФЛ']).toBe(inn)
        }
    })
    it.each(['driverLicenseNumber', 'driverLicenseSeries', 'driverLicenseDate'] as const)('без ИНН требует %s', field => {
        expect(() => formatDriverInfo({ ...driver, [field]: undefined })).toThrow()
    })
    it('при ИНН допускает отсутствие ВУ', () => {
        expect(formatDriverInfo({ fullName: driver.fullName, phone: driver.phone, inn: '123456789012' })['СерВУ']).toBeUndefined()
    })
    it.each(['', ' ', '1'.repeat(21)])('не принимает недопустимую серию %j', driverLicenseSeries => {
        expect(() => formatDriverInfo({ ...driver, driverLicenseSeries })).toThrow()
    })
})


describe('ЭТрН Т3: объём соответствует 17.3 в оригинальной XSD', () => {
    const acceptance: TConsigneeAcceptance = {
        actualArrivalDateTime: new Date('2026-09-08T10:00:00Z'),
        actualDepartureDateTime: new Date('2026-09-08T11:00:00Z'),
        plannedArrivalDateTime: new Date('2026-09-08T09:00:00Z'),
        packageCount: 1, cargoCondition: 'Груз без повреждений', grossWeight: 100,
        unloadingAddress: { addressType: 'gar', garCode: '11111111-1111-4111-8111-111111111111' },
    }
    it.each([[0, '0.000'], [1.234, '1.234'], [1200.321, '1200.321'], [10000.123, '10000.123']])('объём %s без двоичной погрешности', (volume, expected) => {
        expect(formatConsigneeAcceptance({ ...acceptance, volume: Number(volume) })['Объем']).toBe(expected)
    })
    it('не придумывает отсутствующий объём', () => {
        expect(formatConsigneeAcceptance(acceptance)['Объем']).toBeUndefined()
    })
})


it('ЭТрН Т3: КодГАР и ГЛН являются вложенными элементами адреса по XSD', () => {
    const xml = toXml({ АдрВыгруз: formatT3Address({ addressType: 'gar', garCode: '11111111-1111-4111-8111-111111111111', gln: '4601234567893' }) })
    expect(xml).toContain('<ГЛН>4601234567893</ГЛН>')
    expect(xml).toContain('<КодГАР>11111111-1111-4111-8111-111111111111</КодГАР>')
    expect(xml).not.toContain('КодГАР=')
    expect(xml).not.toContain('ГЛН=')
    expect(toXml({ АдрВыгруз: formatT3Address({ addressType: 'gar', garCode: '11111111-1111-4111-8111-111111111111' }) })).not.toContain('ГЛН')
})
