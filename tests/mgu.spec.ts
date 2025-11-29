import { test, expect } from '@playwright/test';
import {keyBoardButton, fieldsSelectors, fieldsValue, fillFields, RegistrationMguPage, validationDefoltFields, button} from './mgu.ts';

let registrationPage: RegistrationMguPage;

test.beforeEach(async ({ page }) => {
await page.goto('https://conf.msu.ru/rus/register/');
registrationPage = new RegistrationMguPage(page)
  });


 
test(`Валидация дефолтных полей`, async ({ page }) => {
validationDefoltFields.forEach(element=>{
test.step(`валидация поля ${element.testName}` , async () => {
expect(page.locator(element.locator).filter({hasText: element.text})).toBeVisible();
})
})
})

test.describe('Заполнение полей', () => {
 fillFields.forEach(element=>{
test(`Заполнены все поля ${element.testName}`, async ({ page }) => {
await page.locator(fieldsSelectors.email).fill(element.email)
await page.locator(fieldsSelectors.name).fill(element.name)
await page.locator(fieldsSelectors.secondName).fill(element.secondname)
await page.locator(fieldsSelectors.surname).fill(element.surname)
await page.locator(fieldsSelectors.password).fill(element.password)
await page.locator(fieldsSelectors.birthdate).fill(element.birthdate)


await page.keyboard.press(keyBoardButton.escape)
await page.locator(fieldsSelectors.gender).selectOption(fieldsValue.gender);
await page.keyboard.press(keyBoardButton.escape)  
await page.locator(fieldsSelectors.checkbox).check()
  })
}
)
}
)

test('Проверка флага У меня нет отчества', async ({ page }) => {
await expect(registrationPage.disabled).not.toBeVisible()
await registrationPage.toggle.getByText("У меня нет отчества").click()
await expect(registrationPage.disabled).toBeVisible()
  }
)

test('Переключение на табу Вход', async ({ page }) => {
await registrationPage.navigationTab.getByText(button.enter).click();
await expect(page.getByRole("button").filter({hasText: button.exit})).toBeVisible();
  }
)
