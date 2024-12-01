import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
	headless: false,
	defaultViewport: null
});
// userDataDir: "./tmp"
const page = await browser.newPage();


// await page.goto("https://www.amazon.co.jp/s?i=computers&srs=8130460051&bbn=2127210051&rh=n%3A2127209051%2Cn%3A2151981051&pf_rd_i=8130460051&pf_rd_m=AN1VRQENFRJN5&pf_rd_p=d717a1c4-4673-41d6-9a1a-c854f2216b1a&pf_rd_r=HAK0GRTSQKW4HDQVTW9Y&pf_rd_s=merchandised-search-6&pf_rd_t=101&ref=s9_bw_cg_renewed_2a1_w", {
// 	waitUntil: "load"
// });

await page.goto("https://www.amazon.co.jp/s?i=computers&srs=8130460051&bbn=2127210051&rh=n%3A2127209051%2Cn%3A2151981051&page=198&pf_rd_i=8130460051&pf_rd_m=AN1VRQENFRJN5&pf_rd_p=d717a1c4-4673-41d6-9a1a-c854f2216b1a&pf_rd_r=HAK0GRTSQKW4HDQVTW9Y&pf_rd_s=merchandised-search-6&pf_rd_t=101&qid=1733030424&ref=sr_pg_198", {
	waitUntil: "load"
});

// await page.goto("https://www.amazon.co.jp/s?i=computers&srs=8130460051&bbn=2127210051&rh=n%3A2127209051%2Cn%3A2151981051&page=200&pf_rd_i=8130460051&pf_rd_m=AN1VRQENFRJN5&pf_rd_p=d717a1c4-4673-41d6-9a1a-c854f2216b1a&pf_rd_r=HAK0GRTSQKW4HDQVTW9Y&pf_rd_s=merchandised-search-6&pf_rd_t=101&qid=1733030335&ref=sr_pg_199", {
// 	waitUntil: "load"
// });

// const productDiv = await page.$$("div.s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item");

let items = [];

let nextButtonDisabled = false;

console.log(nextButtonDisabled);

while(!nextButtonDisabled){
	//scrape all items and then click the next button

	await page.waitForSelector('[data-cel-widget="search_result_1"]');

	const productDiv = await page.$$("div.s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item");

	for(const products of productDiv){

		try{
			const title = await page.evaluate(el => el.querySelector("h2 > a > span").textContent, products);

			const price = await page.evaluate(el => el.querySelector(".a-price > span").textContent, products);

			const image = await page.evaluate(el => el.querySelector(".s-image").src, products);

			// console.log(title, price, image);

			items.push({title, price, image});

		} catch(error){
		}

	}

	await page.waitForSelector('.s-pagination-item.s-pagination-next', {visable: true});
	

	nextButtonDisabled = await page.$(".s-pagination-item.s-pagination-next.s-pagination-disabled") !== null;

	if(!nextButtonDisabled){
		// await page.click(".s-pagination-item.s-pagination-next");
		// await page.waitForNavigation({waitUntil: "networkidle2"});

		await Promise.all([
			page.click(".s-pagination-item.s-pagination-next"),
			page.waitForNavigation({waitUntil: "networkidle2"})
		]);
	}
}

console.log(items);
console.log(items.length);

await browser.close();