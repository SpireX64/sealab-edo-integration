import { describe, expect, it } from "vitest";
import { TaxRate, formatTaxRate } from "../src/docs/ezz/1110362/consts";

// FNS ON_ZAKZVPER_1_969_02_05_01_03.xsd, effective 2026-01-01.
const xsdRates = [
    "0%", "5%", "7%", "9,09%", "10%", "16,67%", "18,03%", "20%", "22%",
    "5/105", "7/107", "10/110", "20/120", "22/122", "без НДС",
    "НДС исчисляется налоговым агентом",
];

describe("EZZ carrier VAT classifier (offline)", () => {
    it("formats exactly the 16 values allowed by the current FNS XSD", () => {
        const formatted = Object.values(TaxRate).map(formatTaxRate);
        expect(formatted).toHaveLength(16);
        expect(new Set(formatted)).toEqual(new Set(xsdRates));
    });

    it("preserves existing enum values and their XML spelling", () => {
        expect(TaxRate.TwentyPercent).toBe("TwentyPercent");
        expect(formatTaxRate(TaxRate.TwentyPercent)).toBe("20%");
        expect(formatTaxRate(TaxRate.WithoutVAT)).toBe("без НДС");
        expect(formatTaxRate(TaxRate.VatCalculatedByTaxAgent)).toBe("НДС исчисляется налоговым агентом");
    });
});
