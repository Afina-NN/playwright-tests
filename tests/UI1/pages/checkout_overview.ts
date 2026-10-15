import { Locator, Page } from '@playwright/test';

export class CheckoutOverview {
  paymentInfo: Locator;
  paymentValue: Locator;
  shippingInfo: Locator;
  shippingValue: Locator;
  totalValue: Locator;
  itemTotal: Locator;
  tax: Locator;
  total: Locator;
  finish: Locator;

  constructor(private page: Page) {
    this.paymentInfo = this.page.locator('[data-test="payment-info-label"]');
    this.paymentValue = this.page.locator('[data-test="payment-info-value"]');
    this.shippingInfo = this.page.locator('[data-test="shipping-info-label"]');
    this.shippingValue = this.page.locator('[data-test="shipping-info-value"]');
    this.totalValue = this.page.locator('[data-test="total-info-label"]');
    this.itemTotal = this.page.locator('[data-test="subtotal-label"]');
    this.tax = this.page.locator('[data-test="tax-label"]');
    this.total = this.page.locator('[data-test="total-label"]');
    this.finish = this.page.locator('[data-test="finish"]');
  }
}
