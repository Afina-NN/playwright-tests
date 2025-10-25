import { test, expect } from '@playwright/test';
import { RegistrationPage } from './fixtures';
import { email, family, name, surname, birthDate, gender, citizenship } from './fixtures';

 test.beforeEach("навигация на исходную страницу", async ({ page }) => {
    await page.goto('https://pk.hse.ru/auth/register');
  });

test.describe('Позитивные тесты_форма регистрации', () => {
test('закрыть форму', async ({ page }) => {
await page.locator(".auth-navigation").getByRole( "link").locator(".auth-navigation__close").click();
const registrationPage = new RegistrationPage(page);

 //валидация, что форма закрылась - кнопки "Следующий шаг" на странице больше нет
await expect(registrationPage.nextstepButtonDisabled).not.toBeVisible();
  });

  test('проверка, что при открытии формы все поля пустые' , async ({ page }) => {
const registrationPage = new RegistrationPage(page);

 //поля с заполнением пустые
 await registrationPage.textFieldsValidation();

 //поля с выпадашками не заполнены
 await registrationPage.selectFieldsValidation(); 

 //чекбоксы неактивны
 await expect(registrationPage.checkboxes.first()).not.toBeChecked();
 await expect(registrationPage.checkboxes.nth(1)).not.toBeChecked();

 //кнопка "Следующий шаг" неактивна
 await expect(registrationPage.nextstepButtonDisabled).toBeVisible();
  
});

  test('заполнить все поля', async ({ page }) => {
  const registrationPage = new RegistrationPage(page); 
  });
});

