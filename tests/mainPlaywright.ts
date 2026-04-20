import { Locator, Page, expect } from '@playwright/test';

export const valueMain = {
  rightMenu: {
    gitIcon: 'GitHub repository',
    discordIcon: 'Discord server',
    switchMode: 'Switch between dark and light mode (currently system mode)',
    search: 'Search (Ctrl+K)',
  },
  leftMenu: {
    playwright: 'Playwright',
    docs: 'Docs',
    api: 'API',
    nodeJS: 'Node.js',
    mcp: "MCP",
    cli: "CLI",
  },
  banner: {
    getStart: 'Get started',
    star: 'Star microsoft/playwright on GitHub',
  },
  section: {
    name: 'logosSection',
    title: 'Chosen by companies and open source projects',
    vsCode: 'VS Code',
    bing: 'Bing',
    outlook: 'Outlook',
    disney: 'Disney+ Hotstar',
    material: 'Material UI',
    ing: 'ING',
    adobe: 'Adobe',
    react: 'React Navigation',
    accessibility: 'Accessibility Insights',
  },
  footer: {
    learn: 'Learn',
    gettingStarted: 'Getting started',
    playwrightTraining: 'Playwright Training',
    learnVideos: 'Learn Videos',
    featureVideos: 'Feature Videos',
    community: 'Community',
    stackOverflow: 'Stack Overflow',
    discord: 'Discord',
    twitter: 'Twitter',
    linkdin: 'LinkedIn',
    more: 'More',
    github: 'GitHub',
    youTube: 'YouTube',
    blog: 'Blog',
    ambassadors: 'Ambassadors',
  },
};

export const locatorMain = {
  menu: '.navbar__inner',
  gitIcon: `.navbar__inner div a[aria-label="${valueMain.rightMenu.gitIcon}"]`,
  discordIcon: `.navbar__inner div a[aria-label="${valueMain.rightMenu.discordIcon}"]`,
  switchModeIcon: `.navbar__inner div button[aria-label="${valueMain.rightMenu.switchMode}"]`,
  search: `.navbar__inner div button[aria-label="${valueMain.rightMenu.search}"]`,
  star: `a[aria-label="${valueMain.banner.star}"]`,
  logosSection: `//section[contains(@class, "${valueMain.section.name}")]`,
  footer: {
    rowTitle: '.footer__links',
    rowItem: '.footer__item',
  },
};

export const role = {
  link: 'link',
  button: 'button',
  banner: 'banner',
  heading: 'heading',
  tablist: 'tablist',
  tabpanel: 'tabpanel',
  list: "list",
  searchbox: "searchbox",
} as const;

// левое верхнее меню
export const leftMenuChecks = [
  { role: role.link, name: valueMain.leftMenu.playwright },
  { role: role.link, name: valueMain.leftMenu.docs },
    { role: role.link, name: valueMain.leftMenu.mcp },
  { role: role.link, name: valueMain.leftMenu.cli },
  { role: role.link, name: valueMain.leftMenu.api },
  { role: role.button, name: valueMain.leftMenu.nodeJS },
];

// правое верхнее меню
export const rightMenuChecks = [
  locatorMain.gitIcon,
  locatorMain.discordIcon,
  locatorMain.switchModeIcon,
  locatorMain.search,
];

// валидация кликабельных изображение в section
export const sectionImgValidation = [
  valueMain.section.vsCode,
  valueMain.section.bing,
  valueMain.section.outlook,
  valueMain.section.disney,
  valueMain.section.material,
  valueMain.section.ing,
  valueMain.section.adobe,
  valueMain.section.react,
  valueMain.section.accessibility,
];

export async function footerColumnNameValidation(page: Page, menuValue: string) {
  await expect(
    page.locator(locatorMain.footer.rowTitle).getByText(menuValue, { exact: true }),
  ).toBeVisible();
}

export const footerItemValidation = [
  valueMain.footer.gettingStarted,
  valueMain.footer.playwrightTraining,
  valueMain.footer.learnVideos,
  valueMain.footer.featureVideos,
  valueMain.footer.stackOverflow,
  valueMain.footer.discord,
  valueMain.footer.twitter,
  valueMain.footer.linkdin,
  valueMain.footer.github,
  valueMain.footer.youTube,
  valueMain.footer.blog,
  valueMain.footer.ambassadors,
];

export class RegistrationPage {
  roleBanner: Locator;

  constructor(private page: Page) {
    this.roleBanner = this.page.getByRole(role.banner);
  }
}
