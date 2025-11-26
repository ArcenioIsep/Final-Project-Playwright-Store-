import { test, expect } from "@playwright/test";
import { CatalogPage } from "../pages/catalogPage.js";
import { CartPage } from "../pages/cartPage.js";

test.describe("STORE — CART", () => {
  test.beforeEach(async ({ page }) => {
    // Abre diretamente a página store
    await page.goto("/store");
  });

  // -------------------------------------------------------------
  test("Empty cart displays empty message", async ({ page }) => {
    const cart = new CartPage(page);

    await cart.open();
    await cart.expectEmpty();
  });

  // -------------------------------------------------------------
  test("Cart displays added products with correct subtotal and total", async ({ page }) => {
    const catalog = new CatalogPage(page);
    const cart = new CartPage(page);

    // Abrir catálogo
    await catalog.open();

    // Adicionar 2 produtos
    await catalog.addToCart("Lightsaber (Star Wars)");
    await catalog.addToCart("Giant Rubber Duck");

    // Abrir carrinho
    await cart.open();

    // VALIDAR PRODUTO 1
    const subtotal1 = await cart.getSubtotal("Lightsaber (Star Wars)");
    expect(subtotal1).toBe(9999.99);

    // VALIDAR PRODUTO 2
    const subtotal2 = await cart.getSubtotal("Giant Rubber Duck");
    expect(subtotal2).toBe(49.99);

    // VALIDAR TOTAL FINAL
    const total = await cart.getTotal();
    expect(total).toBeCloseTo(10049.98, 2);
  });

  // -------------------------------------------------------------
  test("Proceed to payments redirects correctly", async ({ page }) => {
    const catalog = new CatalogPage(page);
    const cart = new CartPage(page);

    await catalog.open();
    await catalog.addToCart("Lightsaber (Star Wars)");

    await cart.open();
    await cart.goToPayments();

    await expect(page.getByText("Payment Summary")).toBeVisible();
  });
});
