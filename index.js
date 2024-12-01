import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
	headless: false
});
const page = await browser.newPage();

await page.goto("https://www.google.com");

await page.setViewport({width: 1080, height: 1020});

await page.screenshot({path: "index-screenshot.png"});

await page.locator(".gLFyf").fill("hello");

await page.screenshot({path: "index-screenshot2.png"});

const list = await page.locator(".G43f7e");
console.log(list);



setTimeout(() => {
	browser.close();
}, 1000)

