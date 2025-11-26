import { expect } from "@playwright/test";

export class InventoryPage {
  constructor(page) {
    this.page = page;

    // Inputs
    this.nameInput = page.getByPlaceholder("Product Name");
    this.priceInput = page.getByPlaceholder("Price (€)");
    this.quantityInput = page.getByPlaceholder("Quantity");

    // Add button
    this.addButton = page.getByRole("button", { name: "Add Product" });
  }

  async open() {
    await this.page.goto("/store");
    await this.page.getByRole("button", { name: "Inventory" }).click();
    await expect(this.addButton).toBeVisible();
  }

  async createProduct({ name, price, quantity }) {
    await this.nameInput.fill(name);
    await this.priceInput.fill(String(price));
    await this.quantityInput.fill(String(quantity));
    await this.addButton.click();
  }

  /**
   * Descobre o índice do produto usando o NAME
   */
  async getProductIndexByName(name) {
    const locator = this.page.locator('[data-testid^="inventory-product-name-"]');
    const count = await locator.count();

    for (let i = 0; i < count; i++) {
      const text = await locator.nth(i).innerText();
      if (text.trim() === name) return i;
    }

    throw new Error(`Product "${name}" not found`);
  }

  /**
   * Validar se o produto aparece na lista
   */
  async expectVisible(name) {
    const index = await this.getProductIndexByName(name);
    await expect(
      this.page.getByTestId(`inventory-product-name-${index}`)
    ).toBeVisible();
  }

  /**
   * Validar PREÇO — usando o WRAPPER correto encontrado na tua UI
   */
  async expectPrice(name, price) {
    const index = await this.getProductIndexByName(name);

    const wrapper = this.page.getByTestId(
      `inventory-product-price-wrapper-${index}`
    );

    await expect(wrapper).toContainText(String(price));
  }

  /**
   * Validar QUANTIDADE
   */
  async expectQuantity(name, quantity) {
    const index = await this.getProductIndexByName(name);

    await expect(
      this.page.getByTestId(`inventory-product-quantity-${index}`)
    ).toHaveText(String(quantity));
  }

  /**
   * AÇÕES: aumentar / diminuir stock
   */
  async increaseQuantity(name) {
    const index = await this.getProductIndexByName(name);
    await this.page.getByTestId(`inventory-product-increase-${index}`).click();
  }

  async decreaseQuantity(name) {
    const index = await this.getProductIndexByName(name);
    await this.page.getByTestId(`inventory-product-decrease-${index}`).click();
  }
}
