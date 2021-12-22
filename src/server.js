require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const app = express();
const scraper = require('./scraper');
const accessLogStream = fs.createWriteStream(path.join(process.env.LOG_DIR, 'requests.log'), { flags: 'a' });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny', { stream: accessLogStream }));

app.get('/', (req, res) => {
	res.send('hello world !');
});

app.get('/:product', async (req, res) => {
	const product = req.params.product;

	if (product) {
		try {
			const result = await scraper.getProduct('https://www.g2a.com/' + product);
			res.status(200).json(result);
		} catch (e) {
			res.status(500).json({ message: e.message });
		}
	} else {
		res.status(400).json({ message: 'Invalid product id' });
	}
});

const port = process.env.PORT || 8080;

const listener = app.listen(port, () => {
	console.log('Your app is listening on port ' + listener.address().port);
});
