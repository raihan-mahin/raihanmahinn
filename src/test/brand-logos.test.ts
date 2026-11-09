import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { brandLogos } from "@/data/brandLogos";
import { awards } from "@/data/portfolio";

describe("brand logos", () => {
  it("has logo files for Pureit, A. O. Smith, Upay, IDLC and City Bank", () => {
    expect(Object.keys(brandLogos).sort()).toEqual(["A. O. Smith", "City Bank", "IDLC", "Pureit", "Upay"]);
    for (const l of Object.values(brandLogos)) expect(existsSync(`public${l.src}`)).toBe(true);
  });
  it("uses City Bank, never Citibank", () => {
    expect(brandLogos["Citibank"]).toBeUndefined();
  });
  it("no competition case brand has a logo entry", () => {
    for (const b of awards.flatMap((a) => a.caseBrands ?? [])) expect(brandLogos[b]).toBeUndefined();
  });
});
