import { Locator, Page } from '@playwright/test';

const alphabet = "абвгдежзклмнопрстуфхцчэюя"
const ind = Math.ceil((Math.random()*10));

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
export const values = {
    fields: {
        email: `${Math.floor(Math.random() * 1000)}@gmail.com`,
        secondname: "Иванов".concat(alphabet[ind]),
        name: "Нин".concat(alphabet[ind]),
        surname: "Ивановна",
        birthdate: "09.09.1981",
        gender: "Женский",
        citizenship: "Россия",
},
    warning: {
        date: "Неверный формат даты",
    }

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
    },
    flag: {
            active: ".v-label--active",
    }
}

export const value = {
    nextStepButton: "Следующий шаг",
}

//валидация того, что поля не заполнены
export const emptyFieldsValidation=[
    {name: fieldsName.email, flag: locator.flag.active},
    {name: fieldsName.secondname, flag: locator.flag.active},
    {name: fieldsName.name, flag: locator.flag.active},
    {name: fieldsName.surname, flag: locator.flag.active},
    {name: fieldsName.birthdate, flag: locator.flag.active},
    {name: fieldsName.gender, flag: locator.flag.active},
    {name: fieldsName.citizenship, flag: locator.flag.active},
]

// заполнить поля input
export const fillFields = [
    {testName: "все ", email: values.fields.email, secondname: values.fields.secondname, name: values.fields.name, surname: values.fields.surname, birthdate: values.fields.birthdate, expectedResult: true},
    {testName: ", кроме поля почта", email: "", secondname: values.fields.secondname, name: values.fields.name, surname: values.fields.surname, birthdate:values.fields.birthdate, warning: "Заполните E-mail", expectedResult: true},
    {testName: ", кроме поля Фамилия", email: values.fields.email, secondname: "", name: values.fields.name, surname: values.fields.surname, birthdate: values.fields.birthdate, warning: "Заполните свои ФИО", expectedResult: true},
    {testName: ", кроме поля Имя", email: values.fields.email, secondname: values.fields.secondname, name: "", surname: values.fields.surname, birthdate: values.fields.birthdate, warning: "Заполните свои ФИО", expectedResult: true},
    {testName: ", кроме поля Дата Рождения", email: values.fields.email, secondname: values.fields.secondname, name: values.fields.name, surname: values.fields.surname, birthdate: "", warning: "Заполните свои ФИО", expectedResult: true},
]

// негативные кейсы поля Дата рождения
export const fillBirthdateField = [
{testName: "неверное число ", value: "32.10.2000", warning: values.warning.date},
{testName: "неверный месяц ", value: "31.13.2000", warning: values.warning.date},
{testName: "заполнено только число ", value: "31", warning: values.warning.date},
{testName: "год выше допустимого", value: "31.10.2012", warning: values.warning.date},
{testName: "год ниже допустимого", value: "24.01.1909", warning: values.warning.date},
{testName: "дата начинается с года", value: "1981.09.09", warning: values.warning.date},
]

// заполнить все поля, кроме поля Пол
export const fillWithoutGender = [
{label: fieldsName.email, value: values.fields.email},
{label: fieldsName.secondname, value: values.fields.secondname},
{label: fieldsName.name, value: values.fields.name},
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
