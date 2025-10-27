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
  dropdownFieldClick: Locator;
  genderDropdown: Locator;
  dropdownChoose: Locator;
  citizenshipFieldClick: Locator;
  fieldNameWarning: Locator
  


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
  }

  async fieldsValidation() {
  //поля с заполнением
  await expect(this.textField.getByLabel(email)).toBeVisible();
  await expect(this.textField.getByLabel(name)).toBeVisible();
  await expect(this.textField.getByLabel(family)).toBeVisible();
  await expect(this.textField.getByLabel(surname)).toBeVisible();
  await expect(this.textField.getByLabel(birthDate)).toBeVisible();
  //поля с выпадашками
  await expect(this.dropdownField.getByLabel(gender)).toBeVisible();
  await expect(this.dropdownField.getByLabel(citizenship)).toBeVisible();
  }

  async fillFields() {
  await this.textField.getByLabel(email).fill("123asd4567$@gmail.com");
  await this.textField.getByLabel(name).fill("Ирина");
  await this.textField.getByLabel(family).fill("Бугрова");
  await this.textField.getByLabel(surname).fill("Анатольевна");
  await this.textField.getByLabel(birthDate).fill("09.09.1981");

  await this.dropdownFieldClick.click();
  await expect(this.genderDropdown).toBeVisible();
  await this.dropdownChoose.filter({hasText: "Женский"}).click();

  await this.citizenshipFieldClick.click();
  await this.dropdownField.getByLabel(citizenship).fill("Россия");
  await this.dropdownChoose.nth(2).click()
  }
  }
  // прогнать тесты 10 раз подряд
  // настроить параллельный прогон






