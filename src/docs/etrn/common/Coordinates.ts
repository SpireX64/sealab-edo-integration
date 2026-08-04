/**
 * Координаты места
 * (КоордТип)
 *
 * Общий тип для документов 1110339 (таб-5.42) и 1110341 (таб-13.13).
 */

const REGEX_COORDINATE = /^(\d{2,3})\.\d{1,13}$/

function validateCoordinate(name: 'lat' | 'lng', value: string): string {
    const match = REGEX_COORDINATE.exec(value)

    if (match) {
        const angle = parseInt(match[1] as string)
        const angleMinMax = (name === 'lat' ? 90 : 180)
        if (Math.sign(angle) < angleMinMax) {
            return value
        }
    }

    throw new TypeError(`Некорректное значение координаты (${name}="${value}")`)
}

export type TCoordinates = {
    /**
     * Широта в формате: <ХХ.УУУУУУУУУУУУУ>
     * во всемирной системе геоцентрических координат WGS 84, где:
     *
     * - ХХ — градусы в диапазоне от -90 до 90
     * - УУУУУУУУУУУУУ — минуты и секунды, представленные как
     *   десятичные доли с точностью до 13 знаков
     */
    lat: string

    /**
     * Долгота в формате: <ХXХ.УУУУУУУУУУУУУ>
     * во всемирной системе геоцентрических координат WGS 84, где:
     *
     * - ХXХ — градусы в диапазоне от -180 до 180
     * - УУУУУУУУУУУУУ — минуты и секунды, представленные как
     *   десятичные доли с точностью до 13 знаков
     */
    lng: string
}

export function formatCoordinates({ lat, lng }: TCoordinates) {
    return {
        "Широта": validateCoordinate('lat', lat),
        "Долгота": validateCoordinate('lng', lng),
    }
}
