const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	}
}, {
	collection: 'categories',
	toJSON: {
		transform: (doc, ret) => {
			ret.id = ret._id;
			delete ret._id;
			return ret;
		}
	}
});

const Category = mongoose.model('category', categorySchema);
module.exports = Category;