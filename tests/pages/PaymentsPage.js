export class PaymentsPage {
  constructor(page) {
    this.page = page;

    this.methodRadio = (method) =>
      page.getByRole("radio", { name: method });

    this.confirmBtn = page.getByRole("button", {
      name: "Confirm Payment",
    });
  }

  async goto() {
    await this.page.goto("/store/payments");
  }

  async selectMethod(methodName) {
    await this.methodRadio(methodName).check();
  }

  async confirmPayment() {
    await this.confirmBtn.click();
  }
}
