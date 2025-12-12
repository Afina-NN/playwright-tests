import { Locator, Page, expect} from '@playwright/test';

export const locators = {
    menu: '[data-test-id="pageHeaderNavigation.colorElement"]',
    calendar: {
        scrollRight:'[data-test-id="repertoryActors.controlRight"]',
        scrollLeft: '[data-test-id="repertoryActors.controlLeft"]',
        menu: '[data-test-id="horizontalCalendar.root"]',
    },
    banner: {
        menu: '[data-test-id="featured.sliderContainer"]',
        scrollRight: '[data-test-id="featured.sliderNextButton"]',
        scrollLeft: '[data-test-id="featured.sliderPrevButton"]',
        block: '[data-test-id="eventsFeed.eventsFeedList"]',
        item: 'div[data-test-id="eventCard.root"]', 
        favourite: '//div[@aria-label = "Добавить в избранное"]',
    },
    itemEvents: {
       first: '//div[@data-test-id="eventsFeed.eventsFeedList"]//a[@aria-label="Stand-up на Рождественской"]',
       second: '//div[@data-test-id="eventsFeed.eventsFeedList"]//a[@aria-label="Горшенев"]',
       third: '//div[@data-test-id="eventsFeed.eventsFeedList"]//a[@aria-label="Алиса"]',
    },
    top10:{
     header:'div[data-test-id="topEvents.numberLogo"]',
     firstItem: 'div[data-test-id="topEvents.eventContainer"]',
    },
    event:{
        item: 'div[data-component = "EventCard"]',
    }
}

export const value = {
    eventHeading: "События в ближайшие дни",
    abroadHeading: "Зарубежные события",
    watchHeading: "Вы смотрели",
    bigArtFestival: "Big Art Festival",
    kino: "КИНО",
}


export async function menuValidation(page:Page, value1: string, value2: string, value3: string, value4: string, value5: string, value6: string, value7: string, value8: string, value9: string,) {
await expect(page.locator(locators.menu).filter({hasText: value1})).toBeVisible();
await expect(page.locator(locators.menu).filter({hasText: value2})).toBeVisible();
await expect(page.locator(locators.menu).filter({hasText: value3})).toBeVisible();
await expect(page.locator(locators.menu).filter({hasText: value4})).toBeVisible();
await expect(page.locator(locators.menu).filter({hasText: value5})).toBeVisible();
await expect(page.locator(locators.menu).filter({hasText: value6})).toBeVisible();
await expect(page.locator(locators.menu).filter({hasText: value7})).toBeVisible();
await expect(page.locator(locators.menu).filter({hasText: value8})).toBeVisible();
await expect(page.locator(locators.menu).filter({hasText: value9})).toBeVisible();
}


export async function yandexAfishaNavigation(page:Page){
await page.locator('//a[@data-test-id = "logo.afishaLink"]').click();
// ждёт полной загрузки страницы, включая все ресурсы
await page.waitForLoadState('load');
}