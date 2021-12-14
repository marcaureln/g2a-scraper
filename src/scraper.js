const puppeteer = require('puppeteer');

exports.getProduct = async function (url) {
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

	const nameElt = await page.$('.indexes__StyledBaseTypography-wgki8j-99');
	const name = await (await nameElt.getProperty('innerText')).jsonValue();

	const priceElt = await page.$('.eIewAh');
	const price = await (await priceElt.getProperty('innerText')).jsonValue();

	const typeElt = await page.$(
		'div.indexes__StyledAttributeItem-wgki8j-0:nth-child(3) > div:nth-child(2) > p:nth-child(2)'
	);
	const type = await (await typeElt.getProperty('innerText')).jsonValue();

	const regionElt = await page.$(
		'div.indexes__StyledAttributeItem-wgki8j-0:nth-child(4) > div:nth-child(2) > p:nth-child(2)'
	);
	const region = await (await regionElt.getProperty('innerText')).jsonValue();

	await browser.close();

	return { url, name, type, price, region };
};
