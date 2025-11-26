import { expect } from "@playwright/test";

export class CatalogPage {
  constructor(page) {
    this.page = page;

    /**
     * Usamos getByRole() porque:
     * - É mais resiliente
     * - Não depende de classes CSS
     * - Funciona igual em Chrome, Firefox e WebKit
     * - É a maneira recomendada pelo Playwright para botões
     */
    this.catalogButton = page.getByRole("button", { name: "Catalog" });
  }

  /**
   * OPEN()
   * --------
   * Abre a página do Catalog da maneira correta.
   * 1) Vai para /store (ponto central da aplicação)
   * 2) Clica no botão "Catalog"
   * 3) Valida que o heading "Product Catalog" está visível
   *
   * Esta verificação evita que o teste avance antes da página carregar.
   */
  async open() {
    await this.page.goto("/store");
    await this.catalogButton.click();
    await expect(this.page.getByText("Product Catalog")).toBeVisible();
  }

  /**
   * productCard(name)
   * ------------------
   * Localiza UM card de produto no Catalog.
   *
   * Porque usar filter({ hasText })?
   * - Os cards têm muitos elementos internos (h3, spans, button…)
   * - O nome do produto aparece dentro do card, não no root
   * - filter() procura em toda a hierarquia interna do card
   *
   * ".first()" garante que sempre selecionamos o primeiro matching
   * (o que evita problemas se houver produtos com nomes parecidos).
   */
  productCard(name) {
    return this.page
      .locator("li.flex")
      .filter({ hasText: name })
      .first();
  }

  /**
   * addToCartButton(name)
   * ----------------------
   * O botão "Add to Cart" fica dentro de cada card.
   *
   * Aqui combinamos:
   * - Localização do card
   * - Um getByRole("button", { name: "Add to Cart" })
   *
   * É mais estável que procurar pela classe ou CSS.
   */
  addToCartButton(name) {
    return this.productCard(name).getByRole("button", {
      name: "Add to Cart",
    });
  }

  /**
   * getUnits(name)
   * --------------
   * Este foi o maior problema do Catalog:
   * - Firefox não suporta filter({hasText}) dentro de spans
   * - WebKit às vezes não devolve innerText corretamente
   * - Chrome funciona com data-testid, mas Firefox NÃO
   *
   * Solução final → STRONG & UNIVERSAL:
   * 1) Tentar via data-testid (mais rápido e direto)
   * 2) Se não existir, fazer fallback procurando qualquer <span> com "units"
   *
   * Assim garantimos compatibilidade TOTAL.
   */
  async getUnits(name) {
    const card = this.productCard(name);

    // 🔹 1) Primeiro tenta via data-testid (Chrome + Firefox + WebKit)
    const testidSpan = card.locator('[data-testid*="quantity"]');
    if (await testidSpan.count()) {
      const txt = await testidSpan.innerText(); // ex: "15 units"
      return Number(txt.split(" ")[0]); // extrai apenas o número
    }

    // 🔸 2) Fallback universal — compatível com Firefox
    const spans = card.locator("span");
    const count = await spans.count();

    for (let i = 0; i < count; i++) {
      const txt = await spans.nth(i).innerText();
      if (txt.includes("units")) {
        return Number(txt.split(" ")[0]);
      }
    }

    // Se nada encontrou, é erro real → melhor debug
    throw new Error(`Units not found for product: ${name}`);
  }

  /**
   * addToCart(name)
   * ----------------
   * Método simples que apenas clica no botão.
   * Mantemos separado porque:
   * - Deixa o POM mais limpo
   * - Torna os testes mais legíveis
   * - Facilita reutilização em testes futuros
   */
  async addToCart(name) {
    await this.addToCartButton(name).click();
  }

  /**
   * expectVisible(name)
   * ---------------------
   * Apenas verifica que o card existe e está visível.
   *
   * Muito útil em testes básicos ou no smoke test.
   */
  async expectVisible(name) {
    await expect(this.productCard(name)).toBeVisible();
  }

  /**
   * expectUnits(name, expectedUnits)
   * ---------------------------------
   * Função de verificação simples.
   * A extração das unidades foi feita no método getUnits,
   * por isso esta função é limpa e legível.
   */
  async expectUnits(name, expectedUnits) {
    const units = await this.getUnits(name);
    expect(units).toBe(expectedUnits);
  }
}
