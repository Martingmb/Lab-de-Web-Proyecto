const mongoose = require('mongoose');
const Config = require('./Config');
const Schema = mongoose.Schema;

mongoose.connect(Config.database.url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	authSource: 'admin'
})


const categorySchema = new Schema({
	name: String,
	active: Boolean,
	description: String
});
const productSchema = new Schema({
	name: String,
	description: String,
	amount: Number,
	cost: Number,
	category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
	available: Boolean
});
const addressSchema = new Schema({
	address: String,
	number_interior: String,
	number_exterior: String,
	neighborhood: String,
	city: String,
	zipcode: String,
	state: String,
	country: String,
	phone: String
})
const orderSchema = new Schema({
	items: [{
		products: { type: Schema.Types.ObjectId, ref: 'Product' },
		quantity: Number,
		cost: Number,
		total: Number
	}],
	total: Number,
	email: String,
	address: { type: Schema.Types.ObjectId, ref: 'address' }
})
const adminSchema = new Schema({
	name: String,
	email: String,
	password: String
});

var Category = mongoose.model('Category', categorySchema);
var Product = mongoose.model('Product', productSchema);
var Address = mongoose.model('Address', addressSchema);
var Order = mongoose.model('Order', orderSchema);
var Admin = mongoose.model('Admin', adminSchema);

module.exports = {
	Category,
	Product,
	Address,
	Order,
	Admin
}