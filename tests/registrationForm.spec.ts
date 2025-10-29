import { test, expect } from '@playwright/test';
import { RegistrationPage } from './fixtures';
import { email, familyName, name, surname, birthDate, gender, citizenship, emailValue, nameValue, 
        surnameValue, birthDateValue, genderValue, citizenshipValue, warningFieldName } from './fixtures';

test.beforeEach("навигация на исходную страницу", async ({ page }) => {
    await page.goto('https://pk.hse.ru/auth/register');
  });

test.describe('Позитивные тесты_форма регистрации', () => {
  test('закрыть форму', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
      await registrationPage.navigationMenu.getByRole( "link").locator(".auth-navigation__close").click();
    
 //валидация, что форма закрылась - кнопки "Следующий шаг" на странице больше нет
await expect(registrationPage.nextstepButtonDisabled).not.toBeVisible();
  });

  test('проверка, что при открытии формы все поля пустые' , async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
      await registrationPage.fieldsValidation();

 //чекбоксы неактивны
 await expect(registrationPage.checkboxes.first()).not.toBeChecked();
 await expect(registrationPage.checkboxes.nth(1)).not.toBeChecked();

 //кнопка "Следующий шаг" неактивна
 await expect(registrationPage.nextstepButtonDisabled).toBeVisible();
});

  test('заполнить все поля', async ({ page }) => {
    const registrationPage = new RegistrationPage(page); 

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
  test('Проверка поля Имя', async ({ page }) => {
    const registrationPage = new RegistrationPage(page); 

    //ввести цифры
    await registrationPage.textField.getByLabel(name).fill("23456777")

    //валидация ворнинга
    await expect(registrationPage.fieldNameWarning.filter({hasText: warningFieldName})).toBeVisible();  
    
    await registrationPage.textField.getByLabel(name).fill("");

    //ввести английские буквы
    await registrationPage.textField.getByLabel(name).fill("asdsdsfdgfgff");

    //валидация ворнинга
    await expect(registrationPage.fieldNameWarning.filter({hasText: warningFieldName})).toBeVisible(); 
    
    //ввести символы
    await registrationPage.textField.getByLabel(name).fill("№%?*");

    //валидация ворнинга
    await expect(registrationPage.fieldNameWarning.filter({hasText: warningFieldName})).toBeVisible(); 
    
    //нет ограничения на min и max количество символов 

  }
)
 test('Заполнить все поля, кроме поля Имя', async ({ page }) => {
    const registrationPage = new RegistrationPage(page); 
   
  await registrationPage.textField.getByLabel(email).fill(emailValue);
  await registrationPage.textField.getByLabel(familyName).fill(nameValue);
  await registrationPage.textField.getByLabel(surname).fill(surnameValue);
  await registrationPage.textField.getByLabel(birthDate).fill(birthDateValue);

  await registrationPage.dropdownFieldClick.click();
  await expect(registrationPage.genderDropdown).toBeVisible();
  await registrationPage.dropdownChoose.filter({hasText: genderValue}).click();

  await registrationPage.citizenshipFieldClick.click();
  await registrationPage.dropdownField.getByLabel(citizenship).fill(citizenshipValue);
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

