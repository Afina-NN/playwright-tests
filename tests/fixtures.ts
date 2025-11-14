import { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';

export const fields = { 
email: "E-mail", 
name: "Имя", 
familyName: "Фамилия", 
surname: "Отчество", 
birthDate: "Дата рождения", 
gender: "Пол",
citizenship: "Гражданство"
};

export const values = { 
email: "123asd4567$@gmail.com", 
name: "Ирина", 
familyName: "Иванова", 
surname: "Ивановна", 
birthDate: "09.09.1981", 
gender: "Женский",
citizenship: "Россия"
}

export const warnings = {
  name: "Заполните свои ФИО",
  birthDate: "Заполните дату рождения",
};

// значения полей input (текстовые поля)
 export const registrationTestData = [
{ testName: "все поля заполнены корректно", email: values.email, username: values.name, familyname: values.familyName, surname: values.surname, birthName: values.birthDate, gender: values.gender, citizenship: values.citizenship, expectedSuccess: true },
{ testName: "заполнены все поля, кроме поля Имя", email: values.email, username: "", familyname: values.familyName, surname: values.surname, birthName: values.birthDate, gender: values.gender, citizenship: values.citizenship,  message: warnings.name, expectedSuccess: false},
{ testName: "заполнены все поля, кроме поля, кроме поля Фамилия", email: values.email, username: values.familyName, familyname: "", surname: values.surname, birthName: values.birthDate, gender: values.gender, citizenship: values.citizenship, message: warnings.name, expectedSuccess: false },
{ testName: "заполнены все поля, кроме поля, кроме поля Дата рождения", email: values.email, username: values.familyName, familyname: values.familyName, surname: values.surname, birthName: "", gender: values.gender, citizenship: values.citizenship, message: warnings.birthDate, expectedSuccess: false },
];

// поля input
 export const inputLabels = [fields.email, fields.familyName, fields.name, fields.surname, fields.birthDate];

 // поля dropdown (выпадашки)
 export const dropdownLabels = [fields.gender, fields.citizenship];

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
 }
 