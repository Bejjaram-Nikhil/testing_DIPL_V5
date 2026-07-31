import { describe, expect, it } from "vitest";
import { shouldConserveData } from "./network";

function navigatorWithConnection(connection: { saveData?: boolean; effectiveType?: string }) {
  return { connection } as unknown as Navigator;
}

describe("low-network media policy", () => {
  it("blocks automatic media when Data Saver is enabled", () => {
    expect(shouldConserveData(navigatorWithConnection({ saveData: true, effectiveType: "4g" }))).toBe(true);
  });

  it.each(["slow-2g", "2g"])("blocks automatic media on %s", (effectiveType) => {
    expect(shouldConserveData(navigatorWithConnection({ effectiveType }))).toBe(true);
  });

  it.each(["3g", "4g"])("allows deferred automatic media on %s", (effectiveType) => {
    expect(shouldConserveData(navigatorWithConnection({ effectiveType }))).toBe(false);
  });
});
