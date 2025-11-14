import { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';

export const fields = [
{ email: "E-mail", 
name: "Имя", 
familyName: "Фамилия", 
surname: "Отчество", 
birthDate: "Дата рождения", 
gender: "Пол",
citizenship: "Гражданство"},
];

export const warnings = {
  name: 'Введите ФИО кириллицей',
};

// значения полей input (текстовые поля)
 export const registrationTestData = [
{ testName: "все поля заполнены корректно", email: "123asd4567$@gmail.com", username: "Ирина", familyname: "Иванова", surname: "Ивановна", birthName: "09.09.2000", gender: "Женский", citizenship: "Россия", expectedSuccess: true },
{ testName: "заполнены все поля, кроме поля Имя", email: "123asd4567$@gmail.com", username: "", familyname: "Иванова", surname: "Ивановна", birthName: "09.09.2000", gender: "Женский", citizenship: "Россия",  message: "Заполните свои ФИО", expectedSuccess: false},
{ testName: "заполнены все поля, кроме поля, кроме поля Фамилия", email: "123asd4567$@gmail.com", username: "Ирина", familyname: "", surname: "Ивановна", birthName: "09.09.2000", gender: "Женский", citizenship: "Россия", message: "Заполните свои ФИО", expectedSuccess: false },
{ testName: "заполнены все поля, кроме поля, кроме поля Дата рождения", email: "123asd4567$@gmail.com", username: "Ирина", familyname: "Иванова", surname: "Ивановна", birthName: "", gender: "Женский", citizenship: "Россия", message: "Заполните дату рождения", expectedSuccess: false },
];

// поля input
 export const inputLabels = [fields[0].email, fields[0].familyName, fields[0].name, fields[0].surname, fields[0].birthDate];

 // поля dropdown (выпадашки)
 export const dropdownLabels = [fields[0].gender, fields[0].citizenship];

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
 