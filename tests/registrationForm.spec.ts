import { test, expect } from '@playwright/test';
import { RegistrationPage, dropdownLabels, fields, inputLabels, registrationTestData } from './DDB_fixtures';

let registrationPage: RegistrationPage;

  
test.beforeEach(async ({ page }) => {
await page.goto('https://pk.hse.ru/auth/register');
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
  
// заполнение полей: положительный кейс со всеми полями; отрицательные кейсы с полями input
registrationTestData.forEach((data) => {
  test(`Заполнение полей: ${data.testName || 'пустой логин'}`, async ({ page }) => {
//поля input
await registrationPage.textField.getByLabel(fields[0].email).fill(data.email)
await registrationPage.textField.getByLabel(fields[0].name).fill(data.username);
await registrationPage.textField.getByLabel(fields[0].familyName).fill(data.familyname);
await registrationPage.textField.getByLabel(fields[0].surname).fill(data.surname);
await registrationPage.textField.getByLabel(fields[0].birthDate).fill(data.birthName);
//выпадашки
await registrationPage.dropdownFieldClick.click();
await expect(registrationPage.genderDropdown).toBeVisible();
await registrationPage.dropdownChoose.filter({hasText: data.gender}).click();
await registrationPage.citizenshipFieldClick.click();
await registrationPage.dropdownField.getByLabel(fields[0].citizenship).fill(data.citizenship);
await registrationPage.dropdownChoose.nth(2).click()
//чекбоксы
await registrationPage.checkboxes.first().check();
await registrationPage.checkboxes.nth(1).check();

if (data.expectedSuccess) {
// кнопка Следующий шаг активна
await expect(registrationPage.nextstepButtonDisabled).not.toBeVisible();
} else {
// кнопка Следующий шаг не активна
await expect(registrationPage.nextstepButtonDisabled).toBeVisible();
}
}
 )
 } 
 )

