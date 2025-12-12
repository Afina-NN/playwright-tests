import { test, expect } from '@playwright/test';
import { locators, menuValidation, value, yandexAfishaNavigation } from './mts';

test.beforeEach(async ({ page }) => {
await page.goto('https://afisha.yandex.ru/');

// ждёт полной загрузки страницы, включая все ресурсы
await page.waitForLoadState('load');

  })

  test("Валидация календаря и баннера", async ({ page }) => {
// Валидация меню. Я так понимаю, для валидации серого цвета нужно использовать await expect(element).toHaveCSS('background-color', itemText), но я не работала со стилями, не нахожу нужный локатор
  await menuValidation(page, "Сертификаты", "Ёлки", "Концерты", "Театр", "Детям", "Спорт", "Стендап", "Кино", "Ещё");

  //валидация, что баннеры присутстуют на странице
 await expect(page.locator(locators.banner.menu)).toBeVisible();

 //валидация скролла баннера вправо
  await expect(page.locator(locators.banner.scrollRight)).toBeVisible();

  // валидация скролла баннера влево
  await expect(page.locator(locators.banner.scrollLeft)).toBeVisible();

//проскроллить календарь вправо
 await page.locator(locators.calendar.menu).click();

// валидация, что календарь есть на странице
  await expect(page.locator(locators.calendar.menu)).toBeVisible();

// валидация, что есть скролл вправо и влево
  await expect(page.locator(locators.calendar.scrollRight)).toBeVisible();
  await expect(page.locator(locators.calendar.scrollLeft)).toBeVisible();
  }
)

    test("Валидация Cобытий в ближайшие дни", async ({ page }) => {
// проскроллить до блока событий
const heading = page.getByRole('heading', { name: value.eventHeading });
await heading.scrollIntoViewIfNeeded();

// навести на текст, должен поменяться на красный. также непонятно, как валидировать
await page.getByRole('link', { name: value.eventHeading }).hover();

// валидация, что в "Событиях ближайшего дня" 3 item
// то пробегает, то падает, пока непонятно, как стабилизировать
const listLocator = page.locator(locators.banner.block).filter({hasText: value.eventHeading});
const itemsLocator = listLocator.locator(locators.banner.block).locator(locators.event.item);
await expect(itemsLocator).toHaveCount(3);

// валидация Избранного в 3 item
const favoutite = itemsLocator.locator(locators.banner.favourite);
// 1 item
// валидация названия
const firstItemLocator = page.locator(locators.itemEvents.first);
await expect(firstItemLocator).toHaveCount(1);
// валидация Избранного
await expect(favoutite.first()).toBeVisible();

// 2 item
// валидация названия
const secondItemLocator = page.locator(locators.itemEvents.second);
await expect(secondItemLocator).toHaveCount(1);
//валидация Избранного
await expect(favoutite.nth(1)).toBeVisible();

//3 item
// валидация названия
const thirdItemLocator = page.locator(locators.itemEvents.third);
await expect(thirdItemLocator).toHaveCount(1);
//валидация Избранного
await expect(favoutite.nth(2)).toBeVisible();
  }
)


 test("Кликнуть заголовок, проверить, что страница прогрузилась; прокликать 5 items; провалидировать Вы смотрели", async ({ page }) => {
// кликнуть на События в ближайшие дни
await page.getByRole('link', { name: value.eventHeading }).click();
await page.waitForLoadState('load');

// валидировать, что заголовок прогрузился
await expect(page.getByRole("heading").filter({hasText: "События в ближайшие дни в Нижнем Новгороде"})).toBeVisible();

// вернуться на главную страницу
await yandexAfishaNavigation(page)

// проскроллить до События в ближайшие дни
const event = page.getByRole('heading', { name: value.eventHeading });
await event.scrollIntoViewIfNeeded();

const listLocator = page.locator(locators.banner.block).filter({hasText: value.eventHeading});
const itemsLocator = listLocator.locator(locators.banner.block).locator(locators.event.item);
// кликнуть 1 элемент
await itemsLocator.first().click();

// вернуться на главную страницу
await yandexAfishaNavigation(page)

// кликнуть 2 элемент
await itemsLocator.nth(1).click();

// вернуться на главную страницу
await yandexAfishaNavigation(page)

// кликнуть 3 элемент
await itemsLocator.nth(2).click();
// вернуться на главную страницу
await yandexAfishaNavigation(page)


const abroad = page.locator(locators.banner.block).filter({hasText: value.abroadHeading});
const abroadLocator = abroad.locator(locators.banner.block).locator(locators.event.item);

// кликнуть 4 элемент
await abroadLocator.first().click();

// вернуться на главную страницу
await yandexAfishaNavigation(page)

// кликнуть 5 элемент
await abroadLocator.nth(1).click();

// вернуться на главную страницу
await yandexAfishaNavigation(page)

// проскроллить к Мы смотрели
const watch = page.getByRole('heading', { name: value.watchHeading });
await watch.scrollIntoViewIfNeeded();

// отображаются только 2 последних элемента из Зарубежных событий, хотя должны все 5
await expect(page.locator('h3').filter({ hasText: value.bigArtFestival })).toBeVisible();
await expect(page.locator('h3').filter({ hasText: value.kino })).toBeVisible();
 }

)
