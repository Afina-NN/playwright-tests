import { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { Goods } from './goods';

export class Authorization {
  username: Locator;
  password: Locator;
  login: Locator;

  constructor(private page: Page) {
    this.username = this.page.locator('[data-test="username"]');
    this.password = this.page.locator('[data-test="password"]');
    this.login = this.page.locator('[data-test="login-button"]');
  }
}

export async function authorization(page: Page) {
  await page.goto('https://www.saucedemo.com/');
  const authorizationPage = new Authorization(page);
  const goods = new Goods(page);
  // заполнить username
  await authorizationPage.username.fill(process.env.USERNAME2!);
  // заполнить password
  await authorizationPage.password.fill(process.env.PASSWORD2!);
  // кликнуть login
  await authorizationPage.login.click();
  // проверяем, что страница прогрузилась
  await expect(goods.addToCardSaucelabsbackpack).toBeVisible();
}
