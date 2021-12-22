const UserAgent = require('user-agents');
const puppeteer = require('puppeteer');
const config = require('./scraper.config.json');

exports.getProduct = async function (url) {
	let product = { url };
	const userAgent = new UserAgent({ deviceCategory: 'desktop' });
	const browser = await puppeteer.connect({ browserWSEndpoint: process.env.BROWSER_WS_ENDPOINT });

	const page = await browser.newPage();
	await page.setUserAgent(userAgent.toString());
	await page.goto(url, { waitUntil: 'domcontentloaded' });

	for (const field of config.fields) {
		const element = await page.$(field.selector);
		const innerText = await (await element.getProperty('innerText')).jsonValue();
		product[field.field] = innerText;
	}

	browser.disconnect();

	return product;
};
