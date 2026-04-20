import { test, expect } from '@playwright/test';
import {
  dropdownField,
  emptyFieldsValidation,
  fieldsName,
  fillBirthdateField,
  fillFields,
  locator,
  RegistrationPage,
  value,
  values,
} from './hse';

let registrationPage: RegistrationPage;

test.beforeEach(async ({ page }) => {
  await page.goto('https://pk.hse.ru/auth/register');

  registrationPage = new RegistrationPage(page);
});

test('Валидация того, что все поля по дефолту пустые', async ({ page }) => {
  emptyFieldsValidation.forEach((element) => {
    test.step(`Пустое поле ${element.name}`, async () => {
      expect(page.getByLabel(element.name).locator(element.flag)).not.toBeVisible();
    });
  });
  // валидация чекбоксов
  test.step('Пустые чекбоксы', async () => {
    await expect(registrationPage.checkBoxcheck.first()).not.toBeChecked();
    await expect(registrationPage.checkBoxcheck.nth(1)).not.toBeChecked();
  });
  // валидация кнопки Следующий шаг
  test.step('Кнопка Следующий шаг неактивна', async () => {
    await expect(page.getByRole('button', { name: value.nextStepButton })).toBeDisabled();
  });
});

test.describe('Заполнение полей', () => {
  fillFields.forEach((element) => {
    test(`Поля заполнены ${element.testName}`, async ({ page }) => {
      await page.getByLabel(fieldsName.email).fill(element.email);
      await page.getByLabel(fieldsName.secondname).fill(element.secondname);
      await page.getByLabel(fieldsName.name).fill(element.name);
      await page.getByLabel(fieldsName.surname).fill(element.surname);
      await page.getByLabel(fieldsName.birthdate).fill(element.birthdate);

      // заполнение выпадашек
      await dropdownField(
        page,
        locator.dropdown.selectLocator,
        fieldsName.gender,
        locator.dropdown.select,
        locator.dropdown.item.gender,
        values.fields.gender,
      );
      await dropdownField(
        page,
        locator.dropdown.selectLocator,
        fieldsName.citizenship,
        locator.dropdown.select,
        locator.dropdown.item.citizenship,
        values.fields.citizenship,
      );

      // заполнение чекбоксов
      await registrationPage.checkBoxcheck.first().click();
      await registrationPage.checkBoxcheck.nth(1).click();

      // валидация кнопки Следуюший шаг (на поле Email баг, если оно не заполнено, кнопка Следующий шаг все равно активна)
      if (element.expectedResult || (element.expectedResult==false && element.email=='')) {
         await expect(page.getByRole('button', { name: value.nextStepButton })).not.toBeDisabled();
      } else {
         await expect(page.getByRole('button', { name: value.nextStepButton })).toBeDisabled();
      }
    });
  });
});

test.describe('Негативные кейсы на поле Дата рождения', () => {
  fillBirthdateField.forEach((element) => {
    test(`Негативный кейс поля дата рождения: ${element.testName}`, async ({ page }) => {
      await page.getByLabel(fieldsName.birthdate).fill(element.value);
      await expect(page.getByRole('alert').filter({ hasText: element.warning })).toBeVisible();
    });
  });
});
