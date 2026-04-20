import { Page } from '@playwright/test';
import { role } from './mainPlaywright';

export const locatorDocs = {
  leftMenu: {
    collapse: {
      list: '.menu__list-item-collapsible',
      item: '.theme-doc-sidebar-menu.menu__list li ul',
    },
    menuItem: '.menu__link',
  },
  rightMenu: {
    menuItem: '.table-of-contents__left-border',
  },
  path:{
    home: '.breadcrumbs',
    item: '.breadcrumbs li',
  }
};

export const valueDocs = {
  heading: 'Installation',
  collapseListName: {
    getttingStarted: 'Getting Started',
    playwrightTest: 'Playwright Test',
    migration: 'Migration',
    integration: 'Integrations',
    instalation: 'Installation',
    writingTests: 'Writing tests',
    generatingTests: 'Generating tests',
    runDebugTetsts: 'Running and debugging tests',
    traceView: 'Trace viewer',
    settingUpCI: 'Setting up CI',
    agents: 'Agents',
    annotations: 'Annotations',
    commandLine: 'Command line',
    configuration: 'Configuration',
    configurationUse: 'Configuration (use)',
    emulation: 'Emulation',
    fixtures: 'Fixtures',
    globalSetup: 'Global setup and teardown',
    parallelelism: 'Parallelism',
    migrationFromProtactor: 'Migrating from Protractor',
    migrationFromPuppeteer: 'Migrating from Puppeteer',
    migrationFromLibrary: 'Migrating from Testing Library',
    docker: 'Docker',
    ci: 'Continuous Integration',
    seleniumGrid: 'Selenium Grid (experimental)',
    supportedLanguages: 'Supported languages',
  },
  releaseNotes: 'Release notes',
  canaryReleases: 'Canary releases',
  tabMenu: {
    list: {
    npm: "npm",
    yarn: "yarn",
    pnpm: "pnpm"
    },
    panel: "npm init playwright@latest",
  },
  path:{
homepage: 'Home page',
gettingStarted: 'Getting Started',
installation: 'Installation',
  }
  };

export const collapseMenuVisible = [
  // Раскрывающееся меню Getting Started
  {
    locator: locatorDocs.leftMenu.collapse.list,
    role: role.button,
    value: valueDocs.collapseListName.getttingStarted,
  },
  {
    locator: locatorDocs.leftMenu.collapse.item,
    role: role.link,
    value: valueDocs.collapseListName.instalation,
  },
  {
    locator: locatorDocs.leftMenu.collapse.item,
    role: role.link,
    value: valueDocs.collapseListName.writingTests,
  },
  {
    locator: locatorDocs.leftMenu.collapse.item,
    role: role.link,
    value: valueDocs.collapseListName.generatingTests,
  },
  {
    locator: locatorDocs.leftMenu.collapse.item,
    role: role.link,
    value: valueDocs.collapseListName.runDebugTetsts,
  },
  {
    locator: locatorDocs.leftMenu.collapse.item,
    role: role.link,
    value: valueDocs.collapseListName.traceView,
  },
  {
    locator: locatorDocs.leftMenu.collapse.item,
    role: role.link,
    value: valueDocs.collapseListName.settingUpCI,
  },
  // Раскрывающееся меню Playwright Test
  {
    locator: locatorDocs.leftMenu.collapse.list,
    role: role.button,
    value: valueDocs.collapseListName.playwrightTest,
  },
  {
    locator: locatorDocs.leftMenu.collapse.item,
    role: role.link,
    value: valueDocs.collapseListName.agents,
  },
  {
    locator: locatorDocs.leftMenu.collapse.item,
    role: role.link,
    value: valueDocs.collapseListName.annotations,
  },
  {
    locator: locatorDocs.leftMenu.collapse.item,
    role: role.link,
    value: valueDocs.collapseListName.commandLine,
  },
  {
    locator: locatorDocs.leftMenu.collapse.item,
    role: role.link,
    value: valueDocs.collapseListName.configuration,
  },
  {
    locator: locatorDocs.leftMenu.collapse.item,
    role: role.link,
    value: valueDocs.collapseListName.configurationUse,
  },
  {
    locator: locatorDocs.leftMenu.collapse.item,
    role: role.link,
    value: valueDocs.collapseListName.emulation,
  },
  {
    locator: locatorDocs.leftMenu.collapse.item,
    role: role.link,
    value: valueDocs.collapseListName.fixtures,
  },
  {
    locator: locatorDocs.leftMenu.collapse.item,
    role: role.link,
    value: valueDocs.collapseListName.globalSetup,
  },
  {
    locator: locatorDocs.leftMenu.collapse.item,
    role: role.link,
    value: valueDocs.collapseListName.parallelelism,
  },
];

export const menuItem = [
  { locator: locatorDocs.leftMenu.menuItem, value: valueDocs.releaseNotes },
  { locator: locatorDocs.leftMenu.menuItem, value: valueDocs.canaryReleases },
];

// Removed unused type Roles to fix lint error
// кликнуть на раскрывающееся меню и провалидировать его
export async function collapseMenuClick(page: Page, menuValue: string) {
  await page
    .locator(locatorDocs.leftMenu.collapse.list)
    .getByRole(role.button, { name: menuValue })
    .click();
}

export const migrationSubmenu = [
  valueDocs.collapseListName.migrationFromProtactor,
  valueDocs.collapseListName.migrationFromPuppeteer,
  valueDocs.collapseListName.migrationFromLibrary,
];

export const integrationSubmenu = [
  valueDocs.collapseListName.docker,
  valueDocs.collapseListName.ci,
  valueDocs.collapseListName.seleniumGrid,
  valueDocs.collapseListName.supportedLanguages,
];

// валидация меню справа
 export const rightMenuLinks = [
      { name: 'Introduction' },
      { name: 'Installing Playwright' },
      { name: 'Using npm, yarn or pnpm' },
      { name: 'Using the VS Code Extension' },
      { name: "What's Installed" },
      { name: "Running the Example Test", exact: true },
      { name: "HTML Test Reports" },
      { name: "Running the Example Test in UI Mode" },
      { name: "Updating Playwright" },
      { name: "System requirements" },
      { name: "What's next" },
    ];

    // валидация табменю
    export const tabMenu = [
      { role: role.tablist, name: valueDocs.tabMenu.list.npm },
      { role: role.tablist, name: valueDocs.tabMenu.list.yarn },
      { role: role.tablist, name: valueDocs.tabMenu.list.pnpm },
      { role: role.tabpanel, name: valueDocs.tabMenu.panel },
    ];

    // Doc's path
    // валидация табменю
    export const path = [valueDocs.path.gettingStarted, valueDocs.path.installation];
