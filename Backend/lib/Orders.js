const db = require('./Database');

async function getOrder(id){
	var order = await db.Order.findById(id, { _id: 0 }).select('items total paid createdAt').populate('items.product', 'name');
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
		createdAt: order.createdAt
	}
	return o;
}

function cancelOrder(id){
	return db.Order.findByIdAndDelete(id);
}

async function createOrder(name, email, items){
	if(items.length==0) return false;
	var products = await db.Product.find({ '_id': { $in: items.map(a=>db.toObjectId(a.id)) } });
	var order_items = [];
	var total = 0;
	for(var i of items){
		var prod = products.find(a=>a._id==i.id);
		if(!prod) continue;
		order_items.push({
			product: prod._id,
			quantity: i.amount,
			cost: parseFloat(prod.cost),
			total: parseFloat(prod.cost)*parseInt(i.amount)
		});
		total += parseFloat(prod.cost)*parseInt(i.amount);
	}
	if(order_items.length==0) return false;

	var newOrder = {
		items: order_items,
		total,
		name,
		email,
		paid: 0,
		address: null
	}
	var order = await db.Order.create(newOrder);
	return { id: order._id, ...newOrder };
}

function setAddress(id, street, number_interior, number_exterior, neighbohood, city, zipcode, state, country, phone){
	var address = {
		street, number_interior, number_exterior,
		neighbohood, city, zipcode, state, country, phone
	};
	return db.Order.findByIdAndUpdate(id, { address });
}

function getOrderSimple(id, select=false){
	if(select){
		return db.Order.findById(id).select(select);
	}else{
		return db.Order.findById(id);
	}
}


function orderPaid(id){

}

module.exports = {
	getOrder,
	cancelOrder,
	createOrder,
	setAddress,
	orderPaid,
	getOrderSimple
}