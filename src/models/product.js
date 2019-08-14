const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	categoryId: {
		type: mongoose.Schema.Types.ObjectID,
		required: true
	},
});

const Product = mongoose.model('product', productSchema);
module.exports = Product;