/**
 * Координаты места
 * (КоордТип)
 *
 * Общий тип для документов ЭТрН (1110339, 1110341) и ЭЗЗ (1110361).
 */

const REGEX_COORDINATE = /^(-?)(\d{1,3})\.(\d{1,13})$/

function validateCoordinate(name: 'latitude' | 'longitude', value: string): string {
    const match = REGEX_COORDINATE.exec(value)

    if (match) {
        const angle = Number(value)
        const angleMax = name === 'latitude' ? 90 : 180
        const integer = match[2] as string
        const fraction = match[3] as string
        const maxIntegerDigits = name === 'latitude' ? 2 : 3
        if (integer.length <= maxIntegerDigits && Math.abs(angle) <= angleMax) {
            // Дополнение нулями сохраняет значение без округления и обеспечивает
            // минимальную длину 15 символов, установленную КоордТип в XSD.
            return `${match[1]}${integer}.${fraction.padEnd(13, '0')}`
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
     * (15-17 символов)
     */
    latitude: string

    /**
     * Долгота в формате: <ХXХ.УУУУУУУУУУУУУ>
     * во всемирной системе геоцентрических координат WGS 84, где:
     *
     * - ХXХ — градусы в диапазоне от -180 до 180
     * - УУУУУУУУУУУУУ — минуты и секунды, представленные как
     *   десятичные доли с точностью до 13 знаков
     * (16-18 символов)
     */
    longitude: string
}

export function formatCoordinates(data: TCoordinates) {
    return {
        "Широта": validateCoordinate('latitude', data.latitude),
        "Долгота": validateCoordinate('longitude', data.longitude),
    }
}
