const express = require('express');
const bodyParser = require('body-parser');
const env = require('./config/environment');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const apiRouter = require('./config/routes');
const port = env.db.port;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined'));

app.use('/api', apiRouter);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`);
	require('./db');
});

module.exports = app;