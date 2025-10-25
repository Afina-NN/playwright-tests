import { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
export { email, family, name, surname, birthDate, gender, citizenship };

const email="E-mail", family="Фамилия", name = "Имя", surname="Отчество", birthDate= "Дата рождения", 
      gender="Пол", citizenship="Гражданство";

export class RegistrationPage {
  checkboxes: Locator;
  nextstepButtonDisabled: Locator;
  textField: Locator;
  dropdownField: Locator;

  constructor(private page: Page) {
   this.checkboxes = this.page.locator('.custom-checkbox__inner'); 
   this.nextstepButtonDisabled = this.page.locator(".btn-cross-over.btn-cross-over--step1").locator("//button[@disabled='disabled']"); 
   this.textField = this.page.locator(".v-text-field__slot"); 
   this.dropdownField = this.page.locator(".v-select__slot"); 
  }

  async textFieldsValidation() {
  await expect(this.textField.getByLabel(email)).toBeVisible();
  await expect(this.textField.getByLabel(family)).toBeVisible();
  await expect(this.textField.getByLabel(surname)).toBeVisible();
  await expect(this.textField.getByLabel(birthDate)).toBeVisible();
  }

  async selectFieldsValidation() {
  await expect(this.dropdownField.getByLabel(gender)).toBeVisible();
  await expect(this.dropdownField.getByLabel(citizenship)).toBeVisible();
  }

  async fullfillAllFields(name: string) {

  }
  }






