const db = require('./Database');

function getOrder(id){
	return await db.Order.findById(id);
}

function cancelOrder(id){
	return await db.Order.findByIdAndDelete(id);
}

function createOrder(name, email, items){
	if(items.length==0) return false;
	var products = await db.Product.find({ '_id': { $in: items.map(a=>db.toObjectId(a.id)) } });
	var order_items = [];
	var total = 0;
	for(var i of items){
		var prod = products.find(a=>a._id==i.id);
		if(!prod) continue;
		order_items.push({
			product: prod._id,
			quantity: i.quantity,
			cost: parseFloat(prod.cost),
			total: parseFloat(prod.cost)*parseFloat(i.quantity)
		});
		total += parseFloat(prod.cost)*parseFloat(i.quantity);
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
	return await db.Order.create(newOrder);
}

function setAddress(id, street, number_interior, number_exterior, neighbohood, city, zipcode, state, country, phone){
	var address = {
		street, number_interior, number_exterior,
		neighbohood, city, zipcode, state, country, phone
	};
	return await db.Order.findByIdAndUpdate(id, address);
}

function orderPaid(id){
	
}

module.exports = {
	getOrder,
	cancelOrder,
	createOrder,
	setAddress,
	orderPaid,
}