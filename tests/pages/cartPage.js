import { expect } from "@playwright/test";

export class CartPage {
  constructor(page) {
    this.page = page;

    // Navigation
    this.cartButton = page.getByTestId("store-tab-cart");

    // Titles / messages
    this.cartTitle = page.getByTestId("cart-title");
    this.emptyMessage = page.getByTestId("cart-empty-message");

    // List of cart items
    this.cartItems = page.locator('[data-testid^="cart-item-"]');

    // Total
    this.totalPrice = page.getByTestId("cart-total-price");

    // Proceed to Payments button
    this.paymentsButton = page.getByRole("button", { name: "Go to Payments" });
  }

  /** Open Cart page */
  async open() {
    await this.page.goto("/store");
    await this.cartButton.click();

    // Cart title is UNIQUE — use testId!
    await expect(this.cartTitle).toBeVisible();
  }

  /** Check if cart is empty */
  async expectEmpty() {
    await expect(this.emptyMessage).toBeVisible();
  }

  /** Return locator for a specific cart item */
  cartItem(name) {
    return this.cartItems.filter({ hasText: name }).first();
  }

  /** Ensure item exists in cart */
  async expectItemVisible(name) {
    await expect(this.cartItem(name)).toBeVisible();
  }

  /** Get subtotal (€) of an item */
  async getSubtotal(name) {
    const item = this.cartItem(name);

    // Example text: "1 × €49.99"
    const priceText = await item.locator("p").nth(1).innerText();

    const cleaned = priceText.replace("1 × €", "").trim();
    return Number(cleaned);
  }

  /** Get cart TOTAL (€) */
  async getTotal() {
    const txt = await this.totalPrice.innerText(); // ex: "€10049.98"
    return Number(txt.replace("€", "").trim());
  }

  /** Click button “Go to Payments” */
  async goToPayments() {
    await this.paymentsButton.click();
  }
}
