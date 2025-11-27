import { test, expect } from '@playwright/test';
import { RegistrationPage, dropdownLabels, fields, inputLabels, negativeNamesValue, registrationTestData } from './fixtures';

let registrationPage: RegistrationPage;

  
test.beforeEach(async ({ page }) => {
await page.goto('');
registrationPage = new RegistrationPage(page);
  });

  
test("Валидация пустых полей", async ({ page }) => {
//поля input
inputLabels.forEach((label)=>{
expect(registrationPage.textField.getByLabel(label)).toBeVisible();
}
)
//поля с выпадашками
dropdownLabels.forEach((label)=>{
expect(registrationPage.dropdownField.getByLabel(label)).toBeVisible();
}
)
//чекбоксы неактивны
 await expect(registrationPage.checkboxes.first()).not.toBeChecked();
 await expect(registrationPage.checkboxes.nth(1)).not.toBeChecked();
 
 //кнопка "Следующий шаг" неактивна
 await expect(registrationPage.nextstepButtonDisabled).toBeVisible();
   }
  )
  
// заполнение полей: положительный кейс со всеми полями; отрицательные кейсы  - пустые поля input
test.describe('Заполнение полей', () => {
registrationTestData.forEach((data) => {
  test(`Заполнение полей: ${data.testName}`, async ({ page }) => {
//поля input
await registrationPage.textField.getByLabel(fields.email).fill(data.email)
await registrationPage.textField.getByLabel(fields.name).fill(data.username);
await registrationPage.textField.getByLabel(fields.familyName).fill(data.familyname);
await registrationPage.textField.getByLabel(fields.surname).fill(data.surname);
await registrationPage.textField.getByLabel(fields.birthDate).fill(data.birthName);
//выпадашки
await registrationPage.dropdownFieldClick.click();
await expect(registrationPage.genderDropdown).toBeVisible();
await registrationPage.dropdownChoose.filter({hasText: data.gender}).click();
await registrationPage.citizenshipFieldClick.click();
await registrationPage.dropdownField.getByLabel(fields.citizenship).fill(data.citizenship);
await registrationPage.dropdownChoose.nth(2).click()
//чекбоксы
await registrationPage.checkboxes.first().check();
await registrationPage.checkboxes.nth(1).check();

// валидация ворнингов в негативных кейсах
if (data.expectedSuccess==false) {
    await expect(registrationPage.warningValidation.filter({ hasText: data.message })).toBeVisible();
    }

// валидация кнопки Следующий шаг
if (data.expectedSuccess) {
// активна
await expect(registrationPage.nextstepButtonDisabled).not.toBeVisible();
} else {
// не активна
await expect(registrationPage.nextstepButtonDisabled).toBeVisible();
}
}
 )
 } 
 )
}
)

// негативные тесты в поле Имя
test.describe('Негативные тесты поля Имя', () => {
negativeNamesValue.forEach((data) => {
  test(`Негативные тесты поля Имя: ${data.testName}`, async ({ page }) => {
  await registrationPage.textField.getByLabel(fields.name).fill(data.value)
  await expect(registrationPage.warningValidation.filter({ hasText: data.warning })).toBeVisible();  
  }
)
}
)
}
)
