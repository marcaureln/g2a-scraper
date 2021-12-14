const puppeteer = require('puppeteer');
const config = require('./scraper.config.json');

exports.getProduct = async function (url) {
	let product = { url };
	const userAgent =
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36';
	const browserLaunchOptions = {
		headless: true,
		args: ['--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-sandbox'],
	};

	const browser = await puppeteer.launch(browserLaunchOptions);

	const page = await browser.newPage();
	await page.setUserAgent(userAgent);
	await page.goto(url, { waitUntil: 'networkidle2' });

	for (const field of config.fields) {
		const element = await page.$(field.selector);
		const innerText = await (await element.getProperty('innerText')).jsonValue();
		product[field.field] = innerText;
	}

	await browser.close();

	return product;
};
