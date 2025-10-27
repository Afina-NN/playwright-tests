import { test, expect, Page, Locator } from '@playwright/test';
import { RegistrationPage } from './fixtures';

    const fields = [
      {
        locator: (page: Page): Locator => page.locator('.v-text-field__slot').getByLabel("E-mail"),
        name: "Email",
        text: "newMail@ya.ru",
      },
      {
        locator: (page: Page): Locator => page.locator('.v-text-field__slot').getByLabel("Имя"),
        name: "Имя",
        text: "Katya",
      },
      {
        locator: (page: Page): Locator => page.locator('.v-text-field__slot').getByLabel("Фамилия"),
        name: "Фамилия",
        text: "Ivanova",
      },
      {
        locator: (page: Page): Locator => page.locator('.v-text-field__slot').getByLabel("Отчество"),
        name: "Отчество",
        text: "Olegovna",
      },
      {
        locator: (page: Page): Locator => page.locator('.v-text-field__slot').getByLabel("Дата рождения"),
        name: "Дата рождения",
        text: "01.01.2000",
      },
      {
        locator: (page: Page): Locator => page.locator('.v-select__slot').getByLabel("Пол"),
        name: "Пол",
        text: "Женский",
      },
      {
        locator: (page: Page): Locator => page.locator('.v-select__slot').getByLabel("Гражданство"),
        name: "Гражданство",
        text:"Российская федерация",
      },
    ];

test.beforeEach("навигация на исходную страницу", async ({ page }) => {
    await page.goto('https://pk.hse.ru/auth/register');

  });

test.describe('Позитивные тесты_форма регистрации', () => {
  test('проверка, что при открытии формы все поля пустые' , async ({ page }) => {
    fields.forEach(({locator, name})=>{
      test.step(`валидация поля ${name}` , async () => {
        await expect(locator(page)).toBeVisible();
   });
 });
}); 

test('заполнение полей' , async ({ page }) => {
  const registrationPage = new RegistrationPage(page);

  fields.forEach(({locator, name, text})=>{
    test.step(`заполнение поля ${name}` , async () => {
      await locator(page).fill(text);
     });
    });
    await registrationPage.dropdownField.getByLabel("Пол").click();
    await page.locator(".v-list-item__content").filter({hasText: "Женский"}).click();
  });
});

