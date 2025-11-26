import { expect } from "@playwright/test";

export class CatalogPage {
  constructor(page) {
    this.page = page;
    this.catalogButton = page.getByTestId("store-tab-catalog");
  }

  /** Abrir catálogo */
  async open() {
    await this.page.goto("/store");
    await this.catalogButton.click();
    await expect(this.page.getByText("Product Catalog")).toBeVisible();
  }

  /** 🔥 FORÇAR SCROLL — ESSENCIAL PARA PRODUTOS COM STOCK 0 */
  async scrollToBottom() {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await this.page.waitForTimeout(500);
  }

  /** Card */
  productCard(name) {
    return this.page.locator("li.flex").filter({ hasText: name }).first();
  }

  /** Botão Add to Cart */
  addToCartButton(name) {
    return this.productCard(name).getByRole("button", { name: "Add to Cart" });
  }

  /** Botão Out of Stock */
  outOfStockButton(name) {
    return this.productCard(name).getByRole("button", { name: "Out of Stock" });
  }

  /** Extrair unidades */
  async getUnits(name) {
    await this.scrollToBottom(); // 👈 obrigatório

    const card = this.productCard(name);
    const spans = card.locator("span");
    const count = await spans.count();

    for (let i = 0; i < count; i++) {
      const txt = await spans.nth(i).innerText();
      if (txt.includes("units")) {
        return Number(txt.split(" ")[0]);
      }
    }

    throw new Error(`Units not found for product: ${name}`);
  }

  async addToCart(name) {
    await this.addToCartButton(name).click();
  }

  async expectVisible(name) {
    await this.scrollToBottom(); // 👈 obrigatório
    await expect(this.productCard(name)).toBeVisible();
  }
}
