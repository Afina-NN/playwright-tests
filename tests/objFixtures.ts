import { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';


export class RegistrationPage {
  checkboxes: Locator;
  nextstepButtonDisabled: Locator;
  textField: Locator;
  dropdownField: Locator;

  constructor(private page: Page) {
    this.checkboxes = this.page.locator('.custom-checkbox__inner');
    this.nextstepButtonDisabled = this.page.locator('.btn-cross-over.btn-cross-over--step1').locator("//button[@disabled='disabled']");
    this.textField = this.page.locator('.v-text-field__slot');
    this.dropdownField = this.page.locator('.v-select__slot');

  
  }

}