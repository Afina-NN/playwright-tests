import { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
export { email, familyName, name, surname, birthDate, gender, citizenship, emailValue, nameValue, 
         surnameValue, birthDateValue, genderValue, citizenshipValue, warningFieldName };

const email="E-mail", familyName="Фамилия", name = "Имя", surname="Отчество", birthDate= "Дата рождения", 
      gender="Пол", citizenship="Гражданство", emailValue = "123asd4567$@gmail.com", nameValue = "Ирина", 
      familyNameValue = "Бугрова", surnameValue = "Анатольевна", birthDateValue = "01.01.1981", genderValue = "Женский",
      citizenshipValue = "Россия", warningFieldName = "Введите ФИО кириллицей";

export class RegistrationPage {
  checkboxes: Locator;
  nextstepButtonDisabled: Locator;
  textField: Locator;
  dropdownField: Locator;
  dropdownFieldClick: Locator;
  genderDropdown: Locator;
  dropdownChoose: Locator;
  citizenshipFieldClick: Locator;
  fieldNameWarning: Locator;
  navigationMenu: Locator;
  nextStepButton:Locator; 


  constructor(private page: Page) {
   this.checkboxes = this.page.locator('.custom-checkbox__inner'); 
   this.nextstepButtonDisabled = this.page.locator(".btn-cross-over.btn-cross-over--step1").locator("//button[@disabled='disabled']"); 
   this.textField = this.page.locator(".v-text-field__slot"); 
   this.dropdownField = this.page.locator(".v-select__slot"); 
   this.dropdownFieldClick = this.page.locator(".select-register.select-gender");
   this.genderDropdown = this.page.locator(".v-menu__content");
   this.dropdownChoose = this.page.locator(".v-list-item__content");
   this.citizenshipFieldClick = this.page.locator(".select-register-citizenship")
   this.fieldNameWarning = this.page.locator(".auth-form__input.text-field_required.error--text");
   this.navigationMenu = this.page.locator(".auth-navigation");
   this.nextStepButton = this.page.getByRole("button").filter({hasText: "Следующий шаг"})
  }

  async fieldsValidation() {
  //поля с заполнением
  await expect(this.textField.getByLabel(email)).toBeVisible();
  await expect(this.textField.getByLabel(name)).toBeVisible();
  await expect(this.textField.getByLabel(familyName)).toBeVisible();
  await expect(this.textField.getByLabel(surname)).toBeVisible();
  await expect(this.textField.getByLabel(birthDate)).toBeVisible();
  //поля с выпадашками
  await expect(this.dropdownField.getByLabel(gender)).toBeVisible();
  await expect(this.dropdownField.getByLabel(citizenship)).toBeVisible();
  }

  async fillFields() {
  await this.textField.getByLabel(email).fill(emailValue);
  await this.textField.getByLabel(name).fill(nameValue);
  await this.textField.getByLabel(familyName).fill(familyNameValue);
  await this.textField.getByLabel(surname).fill(surnameValue);
  await this.textField.getByLabel(birthDate).fill(birthDateValue);

  await this.dropdownFieldClick.click();
  await expect(this.genderDropdown).toBeVisible();
  await this.dropdownChoose.filter({hasText: genderValue}).click();

  await this.citizenshipFieldClick.click();
  await this.dropdownField.getByLabel(citizenship).fill(citizenshipValue);
  await this.dropdownChoose.nth(2).click()
  }
  }
 






