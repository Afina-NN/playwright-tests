import { test, expect } from '@playwright/test';
import {
  locatorMain,
  leftMenuChecks,
  rightMenuChecks,
  role,
  valueMain,
  RegistrationPage,
  sectionImgValidation,
  footerColumnNameValidation,
  footerItemValidation,
} from './mainPlaywright';

import {
  collapseMenuVisible,
  locatorDocs,
  menuItem,
  valueDocs,
  collapseMenuClick,
  migrationSubmenu,
  integrationSubmenu,
  rightMenuLinks,
  tabMenu,
  path,
} from './docsPlaywright';

import { locatorTrace, valueTrace } from './traceViewer';

let registrationPage: RegistrationPage;

test.beforeEach(async ({ page }) => {
  // ссылка в baseUrl
  await page.goto('./');
  registrationPage = new RegistrationPage(page);
});

test('menu validation', async ({ page }) => {
  // валидация меню в левом верхнем углу
  for (const item of leftMenuChecks) {
    await expect(
      page.locator(locatorMain.menu).getByRole(item.role, { name: item.name }),
    ).toBeVisible();
  }

  // валидация меню в правом верхнем углу
  for (const item of rightMenuChecks) {
    await expect(page.locator(item)).toBeVisible();
  }
});

test('header validation', async () => {
  await expect(registrationPage.roleBanner.getByRole(role.heading)).toBeVisible();
  await expect(
    registrationPage.roleBanner.getByRole(role.link, { name: valueMain.banner.getStart }),
  ).toBeVisible();
  await expect(registrationPage.roleBanner.locator(locatorMain.star)).toBeVisible();
});

test('section validation', async ({ page }) => {
  // заголовок
  await expect(
    page
      .locator(locatorMain.logosSection)
      .locator(`//h2[normalize-space() = "${valueMain.section.title}"]`),
  ).toBeVisible();
  // валидация элементов секции
  sectionImgValidation.forEach((element) => {
    expect(
      page.locator(locatorMain.logosSection).locator(`//img[@alt="${element}"]`),
    ).toBeVisible();
  });
});

test('footer validation', async ({ page }) => {
  // 1 колонка
  await footerColumnNameValidation(page, valueMain.footer.learn);
  // 2 колонка
  await footerColumnNameValidation(page, valueMain.footer.community);
  // 3 колонка
  await footerColumnNameValidation(page, valueMain.footer.more);

  // валидация позиций под всеми колонками
  for (const item of footerItemValidation) {
    await expect(
      page.locator(locatorMain.footer.rowItem).getByRole(role.link, { name: item }),
    ).toBeVisible();
  }
});

test('Docs menu', async ({ page }) => {
  await page
    .locator(locatorMain.menu)
    .getByRole(role.link, { name: valueMain.leftMenu.docs })
    .click();
  await expect(page.getByRole(role.heading, { name: valueDocs.heading })).toBeVisible();
  // * left menu
  // ** уже раскрытое меню Getting Started и Playwright Test
  for (const item of collapseMenuVisible) {
    await expect(
      page.locator(item.locator).getByRole(item.role, { name: item.value, exact: true }).first(),
    ).toBeVisible();
  }
  // ** меню без раскрывашек
  for (const el of menuItem) {
    await expect(page.locator(el.locator).filter({ hasText: el.value })).toBeVisible();
  }

  // ** кликнуть на меню Migration
  await collapseMenuClick(page, valueDocs.collapseListName.migration);
  // *** провалидировать значения
  for (const value of migrationSubmenu) {
    await expect(
      page.locator(locatorDocs.leftMenu.menuItem).filter({ hasText: value }),
    ).toBeVisible();
  }

  // ** кликнуть на меню Integrations
  await collapseMenuClick(page, valueDocs.collapseListName.integration);
  // *** провалидировать значения
  for (const value of integrationSubmenu) {
    await expect(
      page.locator(locatorDocs.leftMenu.menuItem).filter({ hasText: value }),
    ).toBeVisible();
  }

  // * right menu
  for (const link of rightMenuLinks) {
    await expect(
      page.locator(locatorDocs.rightMenu.menuItem).getByRole(role.link, link),
    ).toBeVisible();
  }

  // * tabs menu
  for (const item of tabMenu) {
    await expect(page.getByRole(item.role).first().getByText(item.name).first()).toBeVisible();
  }
  // doc's path
  await expect(
    page.locator(locatorDocs.path.home).getByRole(role.link, { name: valueDocs.path.homepage }),
  ).toBeVisible();
  for (const item of path)
    await expect(page.locator(locatorDocs.path.item).getByText(item)).toBeVisible();
});

test('Trace viewer', async ({ page }) => {
  // перейти в меню Docs
  await page
    .locator(locatorMain.menu)
    .getByRole(role.link, { name: valueMain.leftMenu.docs })
    .click();
  // провалидировать, что меню Trace viewer прогрузилось
  await expect(
    page
      .locator(locatorDocs.leftMenu.collapse.item)
      .getByRole(role.link, { name: valueDocs.collapseListName.traceView, exact: true })
      .first(),
  ).toBeVisible();
  //перейти в меню Trace viewer
  await page
    .locator(locatorDocs.leftMenu.collapse.item)
    .getByRole(role.link, { name: valueDocs.collapseListName.traceView, exact: true })
    .first()
    .click();
  // валидация, что страница пргрузилась
  await expect(page.getByRole(role.heading, { name: valueTrace.heading })).toBeVisible();
  // кликнуть на кнопку загрузки видео
  await page.locator(locatorTrace.video.button).click();
  // видео начинает загружаться
  await expect(page.locator(locatorTrace.video.load)).toBeVisible();
  //валидация меню в What's next
  await expect(page.getByRole(role.heading).getByText(valueTrace.watsNew.heading)).toBeVisible();
  await expect(
    page.getByRole(role.list).getByRole(role.link, { name: valueTrace.watsNew.list.runTests }),
  ).toBeVisible();
  await expect(
    page.getByRole(role.list).getByRole(role.link, { name: valueTrace.watsNew.list.learnMore }),
  ).toBeVisible();

  await expect(
    page
      .getByRole(role.link)
      .locator(locatorTrace.flipping.pages)
      .filter({ hasText: valueTrace.flippingPage.previous }),
  ).toBeVisible();
  await expect(
    page
      .getByRole(role.link)
      .locator(locatorTrace.flipping.menu)
      .filter({ hasText: valueTrace.flippingMenu.previous }),
  ).toBeVisible();
  await expect(
    page
      .getByRole(role.link)
      .locator(locatorTrace.flipping.pages)
      .filter({ hasText: valueTrace.flippingPage.next }),
  ).toBeVisible();
  await expect(
    page
      .getByRole(role.link)
      .locator(locatorTrace.flipping.menu)
      .filter({ hasText: valueTrace.flippingMenu.next }),
  ).toBeVisible();
});
