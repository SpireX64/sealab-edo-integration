import { describe, expect, it } from 'vitest'
import { formatCoordinates } from '../src/docs/common/Coordinates'

describe('Координаты WGS 84 в XML ЭТрН/ЭЗЗ', () => {
    it.each([
        ['-55.75', '-123.125', '-55.7500000000000', '-123.1250000000000'],
        ['0.0', '0.0', '0.0000000000000', '0.0000000000000'],
        ['90.0', '180.0', '90.0000000000000', '180.0000000000000'],
        ['-90.0', '-180.0', '-90.0000000000000', '-180.0000000000000'],
        ['09.1234567890123', '009.1234567890123', '09.1234567890123', '009.1234567890123'],
    ])('сохраняет значение %s / %s без округления', (latitude, longitude, expectedLat, expectedLon) => {
        expect(formatCoordinates({ latitude, longitude })).toEqual({ Широта: expectedLat, Долгота: expectedLon })
    })

    it.each(['90.0000000000001', '-90.0000000000001', '91.0', '-91.0', '090.0'])('отклоняет широту %s', latitude => {
        expect(() => formatCoordinates({ latitude, longitude: '37.0' })).toThrow('latitude')
    })

    it.each(['180.0000000000001', '-180.0000000000001', '181.0', '-181.0'])('отклоняет долготу %s', longitude => {
        expect(() => formatCoordinates({ latitude: '55.0', longitude })).toThrow('longitude')
    })

    it.each(['NaN', 'Infinity', '1e2', '55,75', '55.12345678901234', ' 55.75', '55.75 ', '+55.75', '55'])('не исправляет недопустимый формат %s', latitude => {
        expect(() => formatCoordinates({ latitude, longitude: '37.0' })).toThrow()
    })
})
