import { test, expect } from '@playwright/test';
import { selector, fillFields, RegistrationMguPage, validationDefoltFields, value} from './mgu.ts';

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

test.describe('Заполнение полей. Позитивный и негативные кейсы (пустое поле)', () => {
 fillFields.forEach(element=>{
test(`Заполнены все поля ${element.testName}`, async ({ page }) => {
await page.locator(selector.email).fill(element.email)
await page.locator(selector.name).fill(element.name)
await page.locator(selector.secondName).fill(element.secondname)
await page.locator(selector.surname).fill(element.surname)
await page.locator(selector.password).fill(element.password)
await page.locator(selector.birthdate).fill(element.birthdate)


await page.keyboard.press(value.keyBoardButton.escape)
await page.locator(selector.gender).selectOption(value.gender.female);
await page.keyboard.press(value.keyBoardButton.escape)  
await page.locator(selector.checkbox).check()
  })
}
)
}
)

test('Проверка флага У меня нет отчества', async ({ page }) => {
await expect(registrationPage.disabled).not.toBeVisible()
await registrationPage.toggle.getByText(value.toggle.name).click()
await expect(registrationPage.disabled).toBeVisible()
  }
)

test('Переключение на табу Вход', async ({ page }) => {
await registrationPage.navigationTab.getByText(value.button.enter).click();
await expect(page.getByRole("button").filter({hasText: value.button.exit})).toBeVisible();
  }
)
