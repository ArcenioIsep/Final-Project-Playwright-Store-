import { test, expect } from "@playwright/test";
import { CatalogPage } from "../pages/catalogPage";

test.describe("STORE — CATALOG", () => {

  test("Lightsaber appears in Catalog", async ({ page }) => {
    const catalog = new CatalogPage(page);

    await catalog.open();
    await catalog.expectVisible("Lightsaber (Star Wars)");
  });

  test("Add to Cart reduces units in Catalog", async ({ page }) => {
    const catalog = new CatalogPage(page);

    await catalog.open();

    const before = await catalog.getUnits("Giant Rubber Duck");
    await catalog.addToCart("Giant Rubber Duck");
    const after = await catalog.getUnits("Giant Rubber Duck");

    expect(after).toBe(before - 1);
  });

 
});
