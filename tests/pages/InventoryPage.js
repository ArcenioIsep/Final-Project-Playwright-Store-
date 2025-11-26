import { expect } from "@playwright/test";

export class InventoryPage {
  constructor(page) {
    this.page = page;

    // Inputs
    this.nameInput = page.getByPlaceholder("Product Name");
    this.priceInput = page.getByPlaceholder("Price (€)");
    this.quantityInput = page.getByPlaceholder("Quantity");

    // Submit button
    this.addButton = page.getByTestId("inventory-submit-button");
  }

  /**
   * OPEN()
   * Abre o Inventory da forma mais confiável possível
   * usando o data-testid REAL da navegação.
   */
  async open() {
    await this.page.goto("/store");

    // Botão REAL (confirmado via screenshot)
    await this.page.getByTestId("store-tab-inventory").click();

    // Garante que carregou
    await expect(this.addButton).toBeVisible();
  }

  /** Criar produto */
  async createProduct({ name, price, quantity }) {
    await this.nameInput.fill(name);
    await this.priceInput.fill(String(price));
    await this.quantityInput.fill(String(quantity));
    await this.addButton.click();
  }

  /** Util – encontra índice real do produto */
  async getProductIndexByName(name) {
    const locator = this.page.locator('[data-testid^="inventory-product-name-"]');
    const count = await locator.count();

    for (let i = 0; i < count; i++) {
      const text = await locator.nth(i).innerText();
      if (text.trim() === name) return i;
    }

    throw new Error(`❌ Product "${name}" not found`);
  }

  async expectVisible(name) {
    const index = await this.getProductIndexByName(name);
    await expect(this.page.getByTestId(`inventory-product-name-${index}`)).toBeVisible();
  }

  async expectPrice(name, price) {
    const index = await this.getProductIndexByName(name);
    const wrapper = this.page.getByTestId(`inventory-product-price-wrapper-${index}`);
    await expect(wrapper).toContainText(String(price));
  }

  async expectQuantity(name, quantity) {
    const index = await this.getProductIndexByName(name);
    await expect(this.page.getByTestId(`inventory-product-quantity-${index}`))
      .toHaveText(String(quantity));
  }

  async increaseQuantity(name) {
    const index = await this.getProductIndexByName(name);
    await this.page.getByTestId(`inventory-product-increase-${index}`).click();
  }

  async decreaseQuantity(name) {
    const index = await this.getProductIndexByName(name);
    await this.page.getByTestId(`inventory-product-decrease-${index}`).click();
  }
}
