import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";

const helpersUrl = new URL("../src/helpers.ts", import.meta.url).href;

describe("Признак наличия UTC-смещения", () => {
    it.each([
        ["UTC", "09.09.2026T12:30:00+00:00"],
        ["Europe/Kaliningrad", "09.09.2026T14:30:00+02:00"],
        ["Europe/Moscow", "09.09.2026T15:30:00+03:00"],
        ["America/New_York", "09.09.2026T08:30:00-04:00"],
        ["America/St_Johns", "09.09.2026T10:00:00-02:30"],
    ])("указывает UTC при явном смещении в %s", (timezone, dateTime) => {
        const result = JSON.parse(
            execFileSync(
                process.execPath,
                [
                    "--experimental-strip-types",
                    "--input-type=module",
                    "--eval",
                    `import { formatDateTimeWithUtc, toXml } from ${JSON.stringify(helpersUrl)};
                     const result = formatDateTimeWithUtc(new Date("2026-09-09T12:30:00Z"));
                     console.log(JSON.stringify({ ...result, xml: toXml({ ПунктПод: {
                         ДатВрПод: result.dateTime, НалКоорТочВрПод: result.utc,
                     } }) }));`,
                ],
                { env: { TZ: timezone }, encoding: "utf8" },
            ),
        ) as { dateTime: string; utc: string; xml: string };
        expect(result.dateTime).toBe(dateTime);
        expect(result.utc).toBe("1");
        expect(result.xml).toContain(`ДатВрПод="${dateTime}"`);
        expect(result.xml).toContain('НалКоорТочВрПод="1"');
    });
});
