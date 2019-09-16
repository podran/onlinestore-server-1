const mongoose = require('mongoose');
const env = require('./config/environment');
mongoose.connect(`mongodb://${env.db.URL}/${env.db.name}`, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('connected to DB');
});