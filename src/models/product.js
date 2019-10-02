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
	image: {
		type: String,
		required: true
	}
}, {
	toJSON: {
		transform: (doc, ret) => {
			ret.id = ret._id;
			delete ret._id;
			return ret;
		}
	}
});

const Product = mongoose.model('product', productSchema);
module.exports = Product;