export class CatalogPage {
  constructor(page) {
    this.page = page;

    this.productCard = (name) =>
      page.locator(`div:has(h3:text-is("${name}"))`);
    this.addToCartBtn = (name) =>
      this.productCard(name).getByRole("button", { name: "Add to Cart" });
  }

  async goto() {
    await this.page.goto("/store/catalog");
  }

  async addToCart(productName) {
    await this.addToCartBtn(productName).click();
  }

  async isOutOfStock(productName) {
    return await this.productCard(productName)
      .getByRole("button")
      .isDisabled();
  }
}
