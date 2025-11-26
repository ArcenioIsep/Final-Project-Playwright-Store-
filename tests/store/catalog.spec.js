import { test, expect } from "@playwright/test";
import { CatalogPage } from "../pages/catalogPage";
import { InventoryPage } from "../pages/inventoryPage";

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

  test("Out of stock item disables Add to Cart button", async ({ page }) => {
    const catalog = new CatalogPage(page);
    await catalog.open();

    await catalog.expectVisible("Invisible Pen");

    await expect(
      catalog.outOfStockButton("Invisible Pen")
    ).toBeDisabled();
  });

  test("Clicking Add to Cart has no effect when stock = 0", async ({ page }) => {
    const catalog = new CatalogPage(page);
    await catalog.open();

    const units = await catalog.getUnits("Invisible Pen");
    expect(units).toBe(0);

    // Add to Cart não deve existir
    await expect(
      catalog.outOfStockButton("Invisible Pen")
    ).toBeDisabled();
  });
});
