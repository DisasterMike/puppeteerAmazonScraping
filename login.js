import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false
});
const page = await browser.newPage();

await page.goto("https://assetstore.unity.com/");

// aria-label="Open user profile menu"
await page.click('[aria-label="Open user profile menu"]');

// await page.screenshot({path: 'unitylogin.png'});

// await page.waitForSelector('.group.focus-outline.rounded.text-white.hover:text-blue.flex.items-center.justify-between.cursor-pointer.w-full.lg:pl-4', {visible: true});

console.log("yea yea yea");

const liItems = await page.$$('.z-modal.relative > ul > li');
console.log(liItems);

// const test = await liItems[2].evaluate(el => el.querySelector('button'));
const signInButton = await liItems[2].$('button');
console.log(signInButton);

await signInButton.click();
await page.waitForNavigation();

await page.screenshot({path: 'unitylogin.png'});

await page.locator('.email.req.ok').fill('maikerustump@gmail.com');

// await browser.close();