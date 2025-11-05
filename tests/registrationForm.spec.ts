import { test, expect } from '@playwright/test';
import { RegistrationPage, userData, labels, warnings } from './fixtures';

test.describe('Позитивные тесты_форма регистрации', () => {
   let registrationPage: RegistrationPage;

   test.beforeEach("навигация на исходную страницу", async ({ page }) => {
     await page.goto('https://pk.hse.ru/auth/register');
       registrationPage = new RegistrationPage(page);
  });

test('закрыть форму', async ({ page }) => {
 await registrationPage.navigationMenu.getByRole( "link").locator(".auth-navigation__close").click();
 //валидация, что форма закрылась - кнопки "Следующий шаг" на странице больше нет
 await expect(registrationPage.nextstepButtonDisabled).not.toBeVisible();
  });

  test('проверка, что при открытии формы все поля пустые' , async ({ page }) => {
 await registrationPage.fieldsValidation();

 //чекбоксы неактивны
 await expect(registrationPage.checkboxes.first()).not.toBeChecked();
 await expect(registrationPage.checkboxes.nth(1)).not.toBeChecked();

 //кнопка "Следующий шаг" неактивна
 await expect(registrationPage.nextstepButtonDisabled).toBeVisible();
});

test('заполнить все поля', async ({ page }) => {

 //заполнить инпуты и дропдауны
 await registrationPage.fillFields();

 //нажать на чекбоксы
 await registrationPage.checkboxes.first().check();
 await registrationPage.checkboxes.nth(1).check();

 //валидация, что кнопка Следующий шаг активна
 await expect(registrationPage.nextstepButtonDisabled).not.toBeVisible();

 //Нажать на кнопку Следующий шаг
 await registrationPage.nextStepButton.click();
  });
});

test.describe('Негативные тесты_форма регистрации', () => {
   let registrationPage: RegistrationPage;

   test.beforeEach("навигация на исходную страницу", async ({ page }) => {
     await page.goto('https://pk.hse.ru/auth/register');
       registrationPage = new RegistrationPage(page);
  });

test('Проверка поля Имя', async ({ page }) => {
 //ввести цифры
 await registrationPage.textField.getByLabel(labels.name).fill("23456777")

 //валидация ворнинга
 await expect(registrationPage.fieldNameWarning.filter({hasText: warnings.name})).toBeVisible();  
    
 await registrationPage.textField.getByLabel(labels.name).fill("");

 //ввести английские буквы
 await registrationPage.textField.getByLabel(labels.name).fill("asdsdsfdgfgff");

 //валидация ворнинга
 await expect(registrationPage.fieldNameWarning.filter({hasText: warnings.name})).toBeVisible(); 
    
 //ввести символы
 await registrationPage.textField.getByLabel(labels.name).fill("№%?*");

 //валидация ворнинга
 await expect(registrationPage.fieldNameWarning.filter({hasText: warnings.name})).toBeVisible(); 
    
 //нет ограничения на min и max количество символов 
  }
)
test('Заполнить все поля, кроме поля Имя', async ({ page }) => {

 //заполнить текстовые поля
 await registrationPage.textField.getByLabel(labels.email).fill(userData.email);
 await registrationPage.textField.getByLabel(labels.familyName).fill(userData.name);
 await registrationPage.textField.getByLabel(labels.surname).fill(userData.surname);
 await registrationPage.textField.getByLabel(labels.birthDate).fill(userData.birthDate);

 //заполнить дропдауны
 await registrationPage.dropdownFieldClick.click();
 await expect(registrationPage.genderDropdown).toBeVisible();
 await registrationPage.dropdownChoose.filter({hasText: userData.gender}).click();
 await registrationPage.citizenshipFieldClick.click();
 await registrationPage.dropdownField.getByLabel(labels.citizenship).fill(userData.citizenship);
 await registrationPage.dropdownChoose.nth(2).click()

 //нажать на чекбоксы
 await registrationPage.checkboxes.first().check();
 await registrationPage.checkboxes.nth(1).check();

 //валидация, что кнопка Следующий шаг неактивна
 await expect(registrationPage.nextstepButtonDisabled).toBeVisible(); 
  }
)
}
)

