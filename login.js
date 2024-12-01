import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false
});
const page = await browser.newPage();

await page.goto("https://assetstore.unity.com/");

// aria-label="Open user profile menu"
await page.click('[aria-label="Open user profile menu"]');

const liItems = await page.$$('.z-modal.relative > ul > li');

const signInButton = await liItems[2].$('button');

await signInButton.click();
await page.waitForNavigation();

// await page.screenshot({path: 'unitylogin.png'});

await page.locator('.email.req.ok').fill('maikerustump@gmail.com');

await page.locator('.g12.pb0 > input').fill('Joshrawr1');

await page.click('.btn.larger-btn.bg-gr');
await page.waitForNavigation();

await page.click('[aria-label="Open user profile menu"]');

const menuItems = await page.$$('.z-modal.relative > ul > li');

const accountButton = await menuItems[0].$('a');

await accountButton.click();
await page.waitForNavigation();

// const accountInfoItems = await page.$$('.block.item-list.clear > div');

// const name = await accountInfoItems[1].evaluate(el => el.querySelector('.val').textContent);

// console.log(name);

// block item-list clear

// await browser.close();