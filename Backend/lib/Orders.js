const db = require('./Database');

async function getOrder(id, complete=false){
	var addr_query = complete ? 'address' : 'address.city address.zipcode';
	var order = await db.Order.findById(id, { _id: 0 }).select('items total paid createdAt email name fulfilled cancelled ' + addr_query).populate('items.product', 'name');
	// console.log(order);
	order.id = id;
	var items = []
	for(var i of order.items){
		items.push({
			id: i.product._id,
			name: i.product.name,
			quantity: i.quantity,
			cost: i.cost,
			total: i.total
		})	
	}
	var o = {
		id,
		items,
		total: order.total,
		paid: order.paid,
		createdAt: order.createdAt,
		email: order.email,
		name: order.name,
		address: order.address,
		fulfilled: order.fulfilled,
		cancelled: order.cancelled
	}
	return o;
}

function cancelOrder(id){
	return db.Order.findByIdAndDelete(id);
}

async function createOrder(items){
	if(items.length==0) return false;
	var products = await db.Product.find({ '_id': { $in: items.map(a=>db.toObjectId(a.id)) } });
	var order_items = [];
	var total = 0;
	for(var i of items){
		var prod = products.find(a=>a._id==i.id);
		if(!prod) continue;
		order_items.push({
			product: prod._id,
			name: prod.name,
			quantity: i.quantity,
			cost: parseFloat(prod.cost),
			total: parseFloat(prod.cost)*parseInt(i.quantity)
		});
		total += parseFloat(prod.cost)*parseInt(i.quantity);
	}
	if(order_items.length==0) return false;

	var newOrder = {
		items: order_items,
		total,
		paid: false,
		cancelled: false,
		address: null,
		fulfilled: false,
	}
	var order = await db.Order.create(newOrder);
	return { id: order._id, ...newOrder };
}

function setAddress(id, name, email, street, number_interior, number_exterior, neighborhood, city, zipcode, state, country, phone){
	var address = {
		street, number_interior, number_exterior,
		neighborhood, city, zipcode, state, country, phone,
	};
	return db.Order.findByIdAndUpdate(id, { address, name, email, paid: true });
}

function getOrderSimple(id, select=false){
	if(select){
		return db.Order.findById(id).select(select);
	}else{
		return db.Order.findById(id);
	}
}

async function orderFulfilled(id){
	return await db.Order.findByIdAndUpdate(id, { fulfilled: true });
}

async function getFulfulledOrders(){
	return await db.Order.find({ fulfilled: true, cancelled: false });
}

async function getMissingOrders(){
	return await db.Order.find({ fulfilled: false, cancelled: false });
}

module.exports = {
	getOrder,
	cancelOrder,
	createOrder,
	setAddress,
	getOrderSimple,
	orderFulfilled,
	getFulfulledOrders,
	getMissingOrders
}