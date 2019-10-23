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
}, { timestamps: true });
const productSchema = new Schema({
	name: String,
	description: String,
	amount: Number,
	cost: Number,
	category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
	available: Boolean
}, { timestamps: true });
const orderSchema = new Schema({
	items: [{
		product: { type: Schema.Types.ObjectId, ref: 'Product' },
		quantity: Number,
		cost: Number,
		total: Number
	}],
	total: Number,
	name: String,
	email: String,
	paid: Boolean,
	address: {
		street: String,
		number_interior: String,
		number_exterior: String,
		neighborhood: String,
		city: String,
		zipcode: String,
		state: String,
		country: String,
		phone: String
	}
}, { timestamps: true })
const adminSchema = new Schema({
	name: String,
	email: String,
	password: String
}, { timestamps: true });

var Category = mongoose.model('Category', categorySchema);
var Product = mongoose.model('Product', productSchema);
var Order = mongoose.model('Order', orderSchema);
var Admin = mongoose.model('Admin', adminSchema);

var toObjectId = id=>mongoose.Types.ObjectId(id);

module.exports = {
	Category,
	Product,
	Order,
	Admin,
	toObjectId
}