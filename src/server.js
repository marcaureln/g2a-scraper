require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('hello world !');
});

const port = process.env.PORT || 8080;

const listener = app.listen(port, () => {
	console.log('Your app is listening on port ' + listener.address().port);
});
