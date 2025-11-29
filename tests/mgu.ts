import { Locator, Page } from '@playwright/test';

export class RegistrationMguPage {
disabled: Locator;
toggle: Locator;
navigationTab: Locator;

constructor(private page: Page){
this.disabled = this.page.locator("//input[@disabled='disabled']");
this.toggle = this.page.locator("#patronymic-toggle");
this.navigationTab = this.page.locator(".nav-tabs li a");
}

}

// название полей
export const fieldsName = {
email: "Электронная почта",
password: "Пароль",
secondName: "Фамилия",
name: "Фамилия",
surname: "Отчество",
gender: "Пол",
birthdate: "День рождения"
}

// значения полей
export const fieldsValue = {
email: "123@ya.ru",
password: "12345",
secondName: "Петрова",
name: "Нина",
surname: "Сергеевна",
gender: "женский",
birthdate: "01.01.2000"
}

// селекторы полей
export const fieldsSelectors = {
email: "#fos_user_registration_form_email",
password: "#fos_user_registration_form_plainPassword",
secondName: "#fos_user_registration_form_lastName",
name: "#fos_user_registration_form_firstName",
surname: "#fos_user_registration_form_patronymic",
gender: "#fos_user_registration_form_gender",
birthdate: ".datepicker-msu__input",
checkbox: ".svg-control__checkbox",
genderDropdown: ".form__custom-select"
}

// значения поля пол
export const gender = {
male: "мужской",
female: "женский"
}

// кнопки на клавиатуре
export const keyBoardButton = {
escape: "Escape",
pageDown: "PageDown"
}

// кнопки на странице регистрации/входа
export const button = {
exit: "Войти",
enter: "Вход"
}

// валидация пустых полей
export const validationDefoltFields = [
{testName: "Поле email", locator: fieldsSelectors.email, text: ""}, 
{testName: "Поле пароль", locator: fieldsSelectors.password, text: ""}, 
{testName: "Поле фамилия", locator: fieldsSelectors.secondName, text: ""}, 
{testName: "Поле имя", locator: fieldsSelectors.name, text: ""}, 
{testName: "Поле отчество", locator: fieldsSelectors.surname, text: ""}, 
{testName: "Поле пол", locator: fieldsSelectors.gender, text: gender.male}, 
{testName: "Поле дата рождения", locator: fieldsSelectors.birthdate, text: ""}, 
{testName: "Поле чекбокс", locator: fieldsSelectors.checkbox, text: ""}, 
]

// заполнение полей
export const fillFields = [
{testName: "верно", email: fieldsValue.email, password: fieldsValue.password, secondname: fieldsValue.secondName, name: fieldsValue.name, surname: fieldsValue.surname, gender: fieldsValue.gender, birthdate: fieldsValue.birthdate, success: true}, 
{testName: ", поле пароль пустое", email: fieldsValue.email, password: "", secondname: fieldsValue.secondName, name: fieldsValue.name, surname: fieldsValue.surname, gender: fieldsValue.gender, birthdate: fieldsValue.birthdate, success: false}, 
{testName: ", поле фамилия ", email: fieldsValue.email, password: fieldsValue.password, secondname: "", name: fieldsValue.name, surname: fieldsValue.surname, gender: fieldsValue.gender, birthdate: fieldsValue.birthdate, success: false}, 
{testName: ", поле имя пустое", email: fieldsValue.email, password: fieldsValue.password, secondname: fieldsValue.secondName, name: "", surname: fieldsValue.surname, gender: fieldsValue.gender, birthdate: fieldsValue.birthdate, success: false}, 
{testName: ", поле отчество пустое", email: fieldsValue.email, password: fieldsValue.password, secondname: fieldsValue.secondName, name: fieldsValue.name, surname: "", gender: fieldsValue.gender, birthdate: fieldsValue.birthdate, success: false}, 
{testName: ", поле пол пустое", email: fieldsValue.email, password: fieldsValue.password, secondname: fieldsValue.secondName, name: fieldsValue.name, surname: fieldsValue.surname, gender: "", birthdate: fieldsValue.birthdate, success: false}, 
{testName: ", поле дата рождения пустое", email: fieldsValue.email, password: fieldsValue.password, secondname: fieldsValue.secondName, name: fieldsValue.name, surname: fieldsValue.surname, gender: fieldsValue.gender, birthdate: "", success: false}, 
]

