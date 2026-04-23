import { Locator, Page } from '@playwright/test';

export class Cart {
  continueShopping: Locator;
  checkout: Locator;
  inventoryItem: Locator;

  constructor(private page: Page) {
    this.continueShopping = this.page.locator('[data-test="continue-shopping"]');
    this.checkout = this.page.locator('[data-test="checkout"]');
    this.inventoryItem = this.page.locator('[data-test="inventory-item"]');
  }
}
