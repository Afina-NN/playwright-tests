import { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';

export const userData = {
  email: '123asd4567$@gmail.com',
  name: 'Ирина',
  familyName: 'Бугрова',
  surname: 'Анатольевна',
  birthDate: '01.01.1981',
  gender: 'Женский',
  citizenship: 'Россия',
};

export const labels = {
  email: 'E-mail',
  name: 'Имя',
  familyName: 'Фамилия',
  surname: 'Отчество',
  birthDate: 'Дата рождения',
  gender: 'Пол',
  citizenship: 'Гражданство',
};

export const warnings = {
  name: 'Введите ФИО кириллицей',
};


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
  await expect(this.textField.getByLabel(labels.email)).toBeVisible();
  await expect(this.textField.getByLabel(labels.name)).toBeVisible();
  await expect(this.textField.getByLabel(labels.familyName)).toBeVisible();
  await expect(this.textField.getByLabel(labels.surname)).toBeVisible();
  await expect(this.textField.getByLabel(labels.birthDate)).toBeVisible();
  //поля с выпадашками
  await expect(this.dropdownField.getByLabel(labels.gender)).toBeVisible();
  await expect(this.dropdownField.getByLabel(labels.citizenship)).toBeVisible();
  }

  async fillFields() {
  await this.textField.getByLabel(labels.email).fill(userData.email);
  await this.textField.getByLabel(labels.name).fill(userData.name);
  await this.textField.getByLabel(labels.familyName).fill(userData.familyName);
  await this.textField.getByLabel(labels.surname).fill(userData.surname);
  await this.textField.getByLabel(labels.birthDate).fill(userData.birthDate);

  await this.dropdownFieldClick.click();
  await expect(this.genderDropdown).toBeVisible();
  await this.dropdownChoose.filter({hasText: userData.gender}).click();

  await this.citizenshipFieldClick.click();
  await this.dropdownField.getByLabel(labels.citizenship).fill(userData.citizenship);
  await this.dropdownChoose.nth(2).click()
  }
  }
 






