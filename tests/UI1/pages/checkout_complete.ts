import { Locator, Page } from '@playwright/test';

export class CheckoutComplete {
  checkoutComplete: Locator;
  backHome: Locator;

  constructor(private page: Page) {
    this.checkoutComplete = this.page.locator('[data-test="title"]');
    this.backHome = this.page.locator('[data-test="back-to-products"]');
  }
}
