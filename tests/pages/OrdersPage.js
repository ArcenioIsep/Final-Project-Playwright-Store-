export class OrdersPage {
  constructor(page) {
    this.page = page;

    this.orderRow = (id) =>
      page.locator(`tr:has-text("Order #${id}")`);
  }

  async goto() {
    await this.page.goto("/store/orders");
  }

  async getLatestOrder() {
    return await this.page.locator("tbody tr").first();
  }

  async openOrder(id) {
    await this.orderRow(id).click();
  }
}
