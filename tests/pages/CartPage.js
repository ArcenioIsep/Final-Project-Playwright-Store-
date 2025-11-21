import { expect } from "@playwright/test";

export class CartPage {
  constructor(page) {
    this.page = page;

    this.itemRow = (name) => page.locator(`tr:has-text("${name}")`);
    this.totalValue = page.locator("#total"); 
    this.goToPaymentsBtn = page.getByRole("button", { name: "Go to Payments" });
  }

  async goto() {
    await this.page.goto("/store/cart");
  }

  async getItemQuantity(name) {
    return await this.itemRow(name).locator("td").nth(1).textContent();
  }

  async getTotal() {
    return await this.totalValue.textContent();
  }

  async goToPayments() {
    await this.goToPaymentsBtn.click();
  }
}
