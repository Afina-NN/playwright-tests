import { Locator, Page } from '@playwright/test';

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

// значения
export const value = {
    field:{
email: "123@ya.ru",
password: "12345",
secondName: "Петрова",
name: "Нина",
surname: "Сергеевна",
gender: "женский",
birthdate: "01.01.2000"
},
    gender:{
male: "мужской",
female: "женский"
},
    keyBoardButton:{
escape: "Escape",
pageDown: "PageDown"
},
    button:{
exit: "Войти",
enter: "Вход"
},
    toggle:{
name:"У меня нет отчества"
    }
}

// селекторы полей
export const selector = {
email: "#fos_user_registration_form_email",
password: "#fos_user_registration_form_plainPassword",
secondName: "#fos_user_registration_form_lastName",
name: "#fos_user_registration_form_firstName",
surname: "#fos_user_registration_form_patronymic",
gender: "#fos_user_registration_form_gender",
birthdate: ".datepicker-msu__input",
checkbox: ".svg-control__checkbox",
genderDropdown: ".form__custom-select",
disable: "//input[@disabled='disabled']",
toggle: "#patronymic-toggle",
tab: ".nav-tabs li a",
}


// валидация пустых полей
export const validationDefoltFields = [
{testName: "Поле email", locator: selector.email, text: ""}, 
{testName: "Поле пароль", locator: selector.password, text: ""}, 
{testName: "Поле фамилия", locator: selector.secondName, text: ""}, 
{testName: "Поле имя", locator: selector.name, text: ""}, 
{testName: "Поле отчество", locator: selector.surname, text: ""}, 
{testName: "Поле пол", locator: selector.gender, text: value.gender.male}, 
{testName: "Поле дата рождения", locator: selector.birthdate, text: ""}, 
{testName: "Поле чекбокс", locator: selector.checkbox, text: ""}, 
]

// заполнение полей
export const fillFields = [
{testName: "верно", email: value.field.email, password: value.field.password, secondname: value.field.secondName, name: value.field.name, surname: value.field.surname, gender: value.field.gender, birthdate: value.field.birthdate, success: true}, 
{testName: ", поле пароль пустое", email: value.field.email, password: "", secondname: value.field.secondName, name: value.field.name, surname: value.field.surname, gender: value.field.gender, birthdate: value.field.birthdate, success: false}, 
{testName: ", поле фамилия ", email: value.field.email, password: value.field.password, secondname: "", name: value.field.name, surname: value.field.surname, gender: value.field.gender, birthdate: value.field.birthdate, success: false}, 
{testName: ", поле имя пустое", email: value.field.email, password: value.field.password, secondname: value.field.secondName, name: "", surname: value.field.surname, gender: value.field.gender, birthdate: value.field.birthdate, success: false}, 
{testName: ", поле отчество пустое", email: value.field.email, password: value.field.password, secondname: value.field.secondName, name: value.field.name, surname: "", gender: value.field.gender, birthdate: value.field.birthdate, success: false}, 
{testName: ", поле пол пустое", email: value.field.email, password: value.field.password, secondname: value.field.secondName, name: value.field.name, surname: value.field.surname, gender: "", birthdate: value.field.birthdate, success: false}, 
{testName: ", поле дата рождения пустое", email: value.field.email, password: value.field.password, secondname: value.field.secondName, name: value.field.name, surname: value.field.surname, gender: value.field.gender, birthdate: "", success: false}, 
]

export class RegistrationMguPage {
disabled: Locator;
toggle: Locator;
navigationTab: Locator;

constructor(private page: Page){
this.disabled = this.page.locator(selector.disable);
this.toggle = this.page.locator(selector.toggle);
this.navigationTab = this.page.locator(selector.tab);
}
}


