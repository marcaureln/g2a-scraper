const puppeteer = require('puppeteer');
const config = require('./scraper.config.json');

exports.getProduct = async function (url) {
	let product = { url };
	const userAgent =
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36';
	const browser = await puppeteer.connect({ browserWSEndpoint: process.env.BROWSER_WS_ENDPOINT });

	const page = await browser.newPage();
	await page.setUserAgent(userAgent);
	await page.goto(url, { waitUntil: 'networkidle2' });

	for (const field of config.fields) {
		const element = await page.$(field.selector);
		const innerText = await (await element.getProperty('innerText')).jsonValue();
		product[field.field] = innerText;
	}

	browser.disconnect();

	return product;
};
