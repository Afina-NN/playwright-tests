import { Locator, Page } from '@playwright/test';

// название поля
export const fieldsName = {
    email: "E-mail",
    secondname: "Фамилия",
    name: "Имя",
    surname: "Отчество",
    birthdate: "Дата рождения",
    gender: "Пол",
    citizenship: "Гражданство",
}

// значения поля
export const fieldsValue = {
email: `${Math.floor(Math.random() * 1000)}@gmail.com`,
secondname: "Иванова",
name: "Нина",
surname: "Ивановна",
birthdate: "09.09.1981",
gender: "Женский",
citizenship: "Россия",
}

// флаги
export const flag = {
    active: ".v-label--active",
}

// локаторы
export const locator = {
    checkbox:{
      check: ".custom-checkbox__inner",
    },
    button: {
      disabled: "//button[@disabled='disabled']",
    },
    dropdown: {
        select: {
            gender: ".select-register.select-gender",
            citizenship: ".select-register-citizenship",
        },
        item: {
            gender: ".v-list-item--link",
            citizenship: ".v-list-item__content",
        }
    }
}

export const value = {
    nextStepButton: "Следующий шаг",
}

//валидация того, что поля не заполнены
export const emptyFieldsValidation=[
    {name: fieldsName.email, flag: flag.active},
    {name: fieldsName.secondname, flag: flag.active},
    {name: fieldsName.name, flag: flag.active},
    {name: fieldsName.surname, flag: flag.active},
    {name: fieldsName.birthdate, flag: flag.active},
    {name: fieldsName.gender, flag: flag.active},
    {name: fieldsName.citizenship, flag: flag.active},
]

// заполнить поля input
export const fillFields = [
    {testName: "все ", email: fieldsValue.email, secondname: fieldsValue.secondname, name: fieldsValue.name, surname: fieldsValue.surname, birthdate: fieldsValue.birthdate, expectedResult: true},
    {testName: ", кроме поля почта", email: "", secondname: fieldsValue.secondname, name: fieldsValue.name, surname: fieldsValue.surname, birthdate: fieldsValue.birthdate, warning: "Заполните E-mail", expectedResult: true},
    {testName: ", кроме поля Фамилия", email: fieldsValue.email, secondname: "", name: fieldsValue.name, surname: fieldsValue.surname, birthdate: fieldsValue.birthdate, warning: "Заполните свои ФИО", expectedResult: true},
    {testName: ", кроме поля Имя", email: fieldsValue.email, secondname: fieldsValue.secondname, name: "", surname: fieldsValue.surname, birthdate: fieldsValue.birthdate, warning: "Заполните свои ФИО", expectedResult: true},
    {testName: ", кроме поля Дата Рождения", email: fieldsValue.email, secondname: fieldsValue.secondname, name: fieldsValue.name, surname: fieldsValue.surname, birthdate: "", warning: "Заполните свои ФИО", expectedResult: true},
]

// негативные кейсы поля Дата рождения
export const fillBirthdateField = [
{testName: "неверное число ", value: "32.10.2000", warning: "Неверный формат даты"},
{testName: "неверный месяц ", value: "31.13.2000", warning: "Неверный формат даты"},
{testName: "заполнено только число ", value: "31", warning: "Неверный формат даты"},
{testName: "год выше допустимого", value: "31.10.2012", warning: "Неверный формат даты"},
{testName: "год ниже допустимого", value: "24.01.1909", warning: "Неверный формат даты"},
{testName: "дата начинается с года", value: "1981.09.09", warning: "Неверный формат даты"},
]

// заполнить все поля, кроме поля Пол
export const fillWithoutGender = [
{label: fieldsName.email, value: fieldsValue.email},
{label: fieldsName.secondname, value: fieldsValue.secondname},
{label: fieldsName.name, value: fieldsValue.name},
]
export class RegistrationPage {
checkBoxcheck: Locator;

constructor(private page: Page){
this.checkBoxcheck = this.page.locator(locator.checkbox.check)
}

}

// заполнить поля dropdown
export async function dropdownField(page:Page, selectLocator: string,  selectText: string, itemLocator: string, itemText: string){
 await page.locator(selectLocator).filter({hasText: selectText}).click();
 await page.locator(itemLocator).filter({hasText: itemText}).click();
}
