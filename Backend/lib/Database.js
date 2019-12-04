const mongoose = require('mongoose');
const Config = require('./Config');
const Schema = mongoose.Schema;

mongoose.connect(Config.database.url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	authSource: 'admin'
})

const productSchema = new Schema({
	name: String,
	description: String,
	amount: Number,
	cost: Number,
	category: {
		siempreverde: Boolean,
		rojo: Boolean
	},
	available: Boolean,
	image: String,
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

var Product = mongoose.model('Product', productSchema);
var Order = mongoose.model('Order', orderSchema);
var Admin = mongoose.model('Admin', adminSchema);

var toObjectId = id=>mongoose.Types.ObjectId(id);

module.exports = {
	Product,
	Order,
	Admin,
	toObjectId
}