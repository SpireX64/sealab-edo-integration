function padZero2(v: string | number): string {
    return v.toString().padStart(2, '0')
}

/** Представление даты в виде строки "ДД.ММ.ГГГГ" */
export function formatDate(date: Date) {
    const dd = padZero2(date.getDate());
    const mm = padZero2(date.getMonth() + 1);
    const yyyy = date.getFullYear();
    return [dd, mm, yyyy].join('.')
}

export function formatTime(date: Date) {
    const hh = padZero2(date.getHours());
    const mm = padZero2(date.getMinutes());
    const ss = padZero2(date.getSeconds());
    return [hh,mm,ss].join(':');
}

export function mapArrayIfNotEmpty<T, R>(
    arr: readonly T[] | undefined,
    mapItem: (item: T) => R,
): R[] | undefined {
    return arr && arr.length > 0 
        ? arr.map(it => mapItem(it))
        : undefined
}

/**
 * Форматирует булево значение в строку "0" или "1" (со сдвигом).
 * Если передан undefined — возвращает undefined.
 *
 * @param value - Булево значение.
 * @param shift - Сдвиг результата. По умолчанию 0: false→"0", true→"1".
 *                При shift=1: false→"1", true→"2".
 *
 * @example formatFlag(true) → "1", formatFlag(false) → "0", formatFlag(undefined) → undefined
 * @example formatFlag(true, 1) → "2", formatFlag(false, 1) → "1"
 */
export function formatFlag(value: boolean | undefined, shift: number = 0): string | undefined {
    return value != null ? String(Number(value) + shift) : undefined
}

/**
 * Форматирует дату/время в формате ISO с UTC-смещением:
 * ДД.ММ.ГГГГТЧЧ:ММ:СС±ЧЧ:ММ
 * @example formatDateTimeUTC(new Date()) → "01.08.2026T14:30:00+03:00"
 */
export function formatDateTimeUTC(date: Date): string {
    const dd = padZero2(date.getDate())
    const mm = padZero2(date.getMonth() + 1)
    const yyyy = date.getFullYear()
    const hh = padZero2(date.getHours())
    const min = padZero2(date.getMinutes())
    const ss = padZero2(date.getSeconds())

    const tzOffset = -date.getTimezoneOffset()
    const tzSign = tzOffset >= 0 ? '+' : '-'
    const tzAbs = Math.abs(tzOffset)
    const tzH = padZero2(Math.floor(tzAbs / 60))
    const tzM = padZero2(tzAbs % 60)

    return `${dd}.${mm}.${yyyy}T${hh}:${min}:${ss}${tzSign}${tzH}:${tzM}`
}

/**
 * Форматирует дату/время с флагом наличия UTC.
 * Возвращает { dateTime: строка ДД.ММ.ГГГГТЧЧ:ММ:СС±ЧЧ:ММ, utc: "0"|"1" }.
 * isUtc (флаг = "1") означает, что у переданного Date нет таймзоны (смещение = 0).
 */
export function formatDateTimeWithUtc(date: Date) {
    const isUtc = date.getTimezoneOffset() === 0

    return {
        dateTime: formatDateTimeUTC(date),
        utc: formatFlag(isUtc),
    }
}