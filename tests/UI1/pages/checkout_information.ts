import { Locator, Page } from '@playwright/test';
import { user } from '../constants/ui.ts';

export class CheckoutInfo {
  firstName: Locator;
  lastName: Locator;
  postalCode: Locator;
  continueButton: Locator;
  cancel: Locator;

  constructor(private page: Page) {
    this.firstName = this.page.locator('[data-test="firstName"]');
    this.lastName = this.page.locator('[data-test="lastName"]');
    this.postalCode = this.page.locator('[data-test="postalCode"]');
    this.continueButton = this.page.locator('[data-test="continue"]');
    this.cancel = this.page.locator('[data-test="cancel"]');
  }
}

export async function fillFieldsForCheckout(checkoutInfo: CheckoutInfo) {
  // заполнить поле First Name
  await checkoutInfo.firstName.fill(user.firstName);
  // заполнить поле Last Name
  await checkoutInfo.lastName.fill(user.lastName);
  // заполнить поле Zip
  await checkoutInfo.postalCode.fill(user.postalCode);
}
