import { test } from "@playwright/test";
import { INVENTORY_DATA } from "../data/inventory.data.js";
import { InventoryPage } from "../pages/InventoryPage.js";


test.describe("STORE — INVENTORY", () => {
  let inventory;

  test.beforeEach(async ({ page }) => {
    inventory = new InventoryPage(page);
    await inventory.open();
  });

  // 1️⃣ Add new product
  test(INVENTORY_DATA.ADD.scenario, async ({ page }) => {
    const { product } = INVENTORY_DATA.ADD;

    await inventory.createProduct(product);

    await inventory.expectVisible(product.name);
    await inventory.expectPrice(product.name, product.price);
    await inventory.expectQuantity(product.name, product.quantity);
  });

  // 2️⃣ Increase and decrease stock
  test(INVENTORY_DATA.STOCK.scenario, async ({ page }) => {
    const { product } = INVENTORY_DATA.STOCK;

    await inventory.createProduct(product);
    await inventory.expectVisible(product.name);

    // Increase
    await inventory.increaseQuantity(product.name);
    await inventory.expectQuantity(product.name, product.quantity + 1);

    // Decrease
    await inventory.decreaseQuantity(product.name);
    await inventory.expectQuantity(product.name, product.quantity);
  });

  // 3️⃣ Quantity cannot go below 0
  test(INVENTORY_DATA.LIMIT.scenario, async ({ page }) => {
    const { product } = INVENTORY_DATA.LIMIT;

    await inventory.createProduct(product);
    await inventory.expectVisible(product.name);

    // Go to zero
    await inventory.decreaseQuantity(product.name);
    await inventory.decreaseQuantity(product.name);

    // Must stay 0
    await inventory.expectQuantity(product.name, 0);
  });
  
});
