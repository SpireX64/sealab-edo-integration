/**
 * Установленный маршрут движения тяжеловесного и (или) крупногабаритного
 * транспортного средства или транспортного средства, перевозящего опасный груз
 * (СведМршТип, таб-5.32)
 */

export type TRouteInfo =
    | {
        /** Маршрут в текстовом формате */
        isGeoJson: false
        /** Маршрут, текстовый формат (1-2000 символов) */
        route: string
    }
    | {
        /** Маршрут в формате GeoJSON */
        isGeoJson: true
        /** Описание маршрута в формате GeoJSON в спецификации 7946 (1-2000 символов) */
        route: string
    }

export function formatRouteInfo(data: TRouteInfo) {
     return data.isGeoJson
        ? { "МршМашЧит": data.route }
        : { "МршТекст": data.route }
}
