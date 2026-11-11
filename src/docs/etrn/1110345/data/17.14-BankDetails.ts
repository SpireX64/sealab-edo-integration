/** Банковские реквизиты участника (таб-17.14). */
export type TBankDetails = {
    accountNumber: string
    bank?: { name?: string; bik?: string; correspondentAccount?: string }
}
export function formatBankDetails(data: TBankDetails) {
    if (!data.accountNumber?.trim() || data.accountNumber.length > 20) throw new TypeError("Номер счёта должен содержать 1–20 символов")
    if (data.bank?.bik !== undefined && !/^\d{9}$/.test(data.bank.bik)) throw new TypeError("БИК должен содержать 9 цифр")
    return {
        "НомерСч": data.accountNumber,
        "СвБанк": data.bank && { "НаимБанк": data.bank.name, "БИК": data.bank.bik, "КорСчет": data.bank.correspondentAccount },
    }
}
