import { Locator, Page } from '@playwright/test';

export class Goods {
  addToCardSaucelabsbackpack: Locator;
  addToCartSauceLabsBike: Locator;
  addToCartSauceLabsTshirt: Locator;
  priceItem: Locator;
  removeSauceLabsBackpack: Locator;
  removeSauceLabsBike: Locator;
  removeSauceLabsTshirt: Locator;
  shoppingCardBadge: Locator;
  shoppingCartLink: Locator;
  sortSelect: string;

  constructor(private page: Page) {
    this.addToCartSauceLabsBike = this.page.locator(
      '[data-test="add-to-cart-sauce-labs-bike-light"]',
    );
    this.addToCartSauceLabsTshirt = this.page.locator(
      '[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]',
    );
    this.addToCardSaucelabsbackpack = this.page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]',
    );
    this.priceItem = this.page.locator('[data-test="inventory-item-price"]');
    this.removeSauceLabsBackpack = this.page.locator('[data-test="remove-sauce-labs-backpack"]');
    this.removeSauceLabsBike = this.page.locator('[data-test="remove-sauce-labs-bike-light"]');
    this.removeSauceLabsTshirt = this.page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]');
    this.shoppingCardBadge = this.page.locator('[data-test="shopping-cart-badge"]');
    this.shoppingCartLink = this.page.locator('[data-test="shopping-cart-link"]');
    this.sortSelect = '[data-test="product-sort-container"]';
  }
}
