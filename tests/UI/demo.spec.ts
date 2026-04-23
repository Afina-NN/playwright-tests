import { test, expect } from '@playwright/test';
import { Goods } from '../../pages/goods.ts';
import { authorization } from '../../pages/authorization.ts';
import { Cart } from '../../pages/cart.ts';
import { CheckoutInfo, fillFieldsForCheckout } from '../../pages/checkout_information.ts';
import { CheckoutOverview } from '../../pages/checkout_overview.ts';
import { CheckoutComplete } from '../../pages/checkout_complete.ts';

import 'dotenv/config';

let goods: Goods;
let cart: Cart;
let checkoutInfo: CheckoutInfo;
let checkoutOverview: CheckoutOverview;
let checkoutComplete: CheckoutComplete;

test.beforeEach(async ({ page }) => {
  goods = new Goods(page);
  cart = new Cart(page);
  checkoutInfo = new CheckoutInfo(page);
  checkoutOverview = new CheckoutOverview(page);
  checkoutComplete = new CheckoutComplete(page);
  await authorization(page);
});

test('Флоу покупки: add to cart, remove, валидация цен на чекауте, complete checkout', async () => {
  // кликнуть добавить в корзину
  await goods.addToCardSaucelabsbackpack.click();
  // валидация количества товаров, которые появились в корзине
  await expect(goods.shoppingCardBadge).toHaveText('1');
  // добавить еще 1 товар
  await goods.addToCartSauceLabsBike.click();

  // положить в константу цену
  const price1 = await goods.priceItem.nth(1).textContent();

  // валидация количества товаров в корзине
  await expect(goods.shoppingCardBadge).toHaveText('2');
  // добавить еще 1 товар
  await goods.addToCartSauceLabsTshirt.click();

  // положить в константу цену
  const price2 = await goods.priceItem.nth(2).textContent();

  // валидация количества товаров в корзине
  await expect(goods.shoppingCardBadge).toHaveText('3');
  // удалить товар из каталога
  await goods.removeSauceLabsTshirt.click();
  // валидация количества товаров в корзине
  await expect(goods.shoppingCardBadge).toHaveText('2');
  // добавить еще 1 товар
  await goods.addToCartSauceLabsTshirt.click();

  // кликнуть на корзину
  await goods.shoppingCartLink.click();
  // удалить товар из корзины
  await goods.removeSauceLabsBackpack.click();
  // валидация количества товаров в корзине
  await expect(goods.shoppingCardBadge).toHaveText('2');
  // проверить, что остались только 2 позиции
  await expect(cart.inventoryItem.nth(2)).not.toBeVisible();

  // положить в константу цену 1 товара
  const price1Cart = await goods.priceItem.nth(0).textContent();
  const numberPrice1Cart = Number(price1Cart!.replace('$', ''));
  // положить в константу цену 2 товара
  const price2Cart = await goods.priceItem.nth(1).textContent();
  const numberPrice2Cart = Number(price2Cart!.replace('$', ''));

  // сравнить цены в каталоге и в корзине
  expect(price1).toBe(price1Cart);
  expect(price2).toBe(price2Cart);

  // перейти обратно в корзину
  await goods.shoppingCartLink.click();

  // кликнуть на checkout
  await cart.checkout.click();

  // заполнить поля first name, last name, zip
  await fillFieldsForCheckout(checkoutInfo);
  //кликнуть на Continue
  await checkoutInfo.continueButton.click();

  // сравнить сумму товаров с Item total
  const itemTotel = numberPrice1Cart + numberPrice2Cart;
  await expect(checkoutOverview.itemTotal).toContainText(String(itemTotel));
  // вынуть число из tax
  const tax = await checkoutOverview.tax.textContent();
  const indTax = tax!.indexOf('$');
  const numberTax = Number(tax!.slice(indTax + 1));
  // вынуть число из total
  const total = await checkoutOverview.total.textContent();
  const indTotal = total!.indexOf('$');
  // сравнить Total с суммой Item total и tax
  const numberTotal = Number(total!.slice(indTotal + 1));
  const checkTotal = Number((numberTax + itemTotel).toFixed(2));
  expect(numberTotal).toBe(checkTotal);

  // кликнуть Finish
  await checkoutOverview.finish.click();

  //валидация того, что заказ ушел
  await expect(checkoutComplete.checkoutComplete.getByText('Checkout: Complete!')).toBeVisible();
});

test('Флоу покупки: сортировка, валидаци цен, continue shopping, cancel, back home', async ({
  page,
}) => {
  // отсортировать по цене от low к high
  await page.selectOption(goods.sortSelect, 'lohi');

  // цена 1 товара
  const price1Cart = await goods.priceItem.nth(0).textContent();
  const numberPrice1Cart = Number(price1Cart!.replace('$', ''));
  // цена 2 товара
  const price2Cart = await goods.priceItem.nth(1).textContent();
  const numberPrice2Cart = Number(price2Cart!.replace('$', ''));
  // цена 3 товара
  const price3Cart = await goods.priceItem.nth(2).textContent();
  const numberPrice3Cart = Number(price3Cart!.replace('$', ''));

  // проверить, что 1 товар дешевле 2
  expect(numberPrice2Cart).toBeGreaterThan(numberPrice1Cart);
  // проверить, что 2 товар дешевле 3
  expect(numberPrice3Cart).toBeGreaterThan(numberPrice2Cart);

  //  добавить товар
  await goods.addToCardSaucelabsbackpack.click();
  // добавить еще 1 товар
  await goods.addToCartSauceLabsTshirt.click();
  // валидация количества товаров в корзине
  await expect(goods.shoppingCardBadge).toHaveText('2');
  // удалить товар из каталога
  await goods.removeSauceLabsTshirt.click();
  // удалить товар из каталога
  await goods.removeSauceLabsBackpack.click();
  // проверить, что корзина пустая (цифр нет)
  await expect(goods.shoppingCardBadge).not.toBeVisible();
  // кликнуть на корзину
  await goods.shoppingCartLink.click();
  // провалидировать, что в корзине нет позиций
  await expect(cart.inventoryItem).not.toBeVisible();
  // нажать на continue shopping
  await cart.continueShopping.click();
  // валидация страницы каталога
  await expect(goods.addToCardSaucelabsbackpack).toBeVisible();
  //  добавить товар
  await goods.addToCardSaucelabsbackpack.click();
  // кликнуть на корзину
  await goods.shoppingCartLink.click();
  // кликнуть на checkout
  await cart.checkout.click();
  // кликнуть на cancel
  await checkoutInfo.cancel.click();
  // кликнуть опять на checkout
  await cart.checkout.click();

  // заполнить поля first name, last name, zip
  await fillFieldsForCheckout(checkoutInfo);
  //кликнуть на Continue
  await checkoutInfo.continueButton.click();

  // кликнуть на cancel
  await checkoutInfo.cancel.click();
  // провалидировать переход на главную страницу
  await expect(goods.addToCartSauceLabsTshirt).toBeVisible();
  // кликнуть на корзину
  await goods.shoppingCartLink.click();
  // кликнуть на checkout
  await cart.checkout.click();

  // заполнить поля first name, last name, zip
  await fillFieldsForCheckout(checkoutInfo);
  //кликнуть на Continue
  await checkoutInfo.continueButton.click();
  // кликнуть Finish
  await checkoutOverview.finish.click();
  await checkoutComplete.backHome.click();
  // провалидировать переход на главную страницу
  await expect(goods.addToCardSaucelabsbackpack).toBeVisible();
});
