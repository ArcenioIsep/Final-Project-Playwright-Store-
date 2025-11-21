import { expect } from "@playwright/test";

export class InventoryPage {
  constructor(page) {
    this.page = page;

    this.nameInput = page.getByPlaceholder("Product name");
    this.priceInput = page.getByPlaceholder("Price");
    this.quantityInput = page.getByPlaceholder("Quantity");
    this.addButton = page.getByRole("button", { name: "Add Product" });

    this.productRow = (name) => page.locator(`tr:has-text("${name}")`);
    this.increaseBtn = (name) =>
      this.productRow(name).getByRole("button", { name: "+" });
    this.decreaseBtn = (name) =>
      this.productRow(name).getByRole("button", { name: "-" });
  }

  async goto() {
    await this.page.goto("/store/inventory");
  }

  async createProduct(name, price, quantity) {
    await this.nameInput.fill(name);
    await this.priceInput.fill(String(price));
    await this.quantityInput.fill(String(quantity));
    await this.addButton.click();
  }

  async getQuantity(name) {
    return await this.productRow(name).locator("td").nth(2).textContent();
  }

  async increaseStock(name) {
    await this.increaseBtn(name).click();
  }

  async decreaseStock(name) {
    await this.decreaseBtn(name).click();
  }
}
