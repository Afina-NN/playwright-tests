import { Locator, Page } from '@playwright/test';
import { User } from '../models/registration-user';

export class RegistrationPage {
  getEmailInput: Locator;
  //  и так далее все поля регистрации описаны тут
  checkBoxcheck: Locator;

  constructor(private page: Page) {
    this.checkBoxcheck = this.page.locator('locator.checkbox.check');
    this.getEmailInput = this.page.locator('#input-18');
  }

  async fillEmail(email: string) {
    this.getEmailInput.fill(email);
  }

  async registerUser(user: User) {
    this.getEmailInput.fill(user.email);
    this.getEmailInput.fill(user.lastname);
  }
}