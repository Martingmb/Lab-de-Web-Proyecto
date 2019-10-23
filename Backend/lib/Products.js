var db = require('./Database');

async function getProduct(id){
	return await db.Product.findById(id);
}

async function getAllProducts(){
	var products = await db.Product.find()
	products.sort((a,b)=>b.available-a.available);
	return products;
}

async function getProductList(offset=0, count=20){
	var products = await db.Product.find().skip(offset).limit(count);
	return products;
}

async function createProduct(name, description, amount, cost, available){
	var newProduct = {
		name, description, amount, cost, available
	}
	var np = await db.Product.create(newProduct);
	return np._id;
}

async function deleteProduct(id){
	return await db.Product.findByIdAndDelete(id);
}

async function editProduct(id, name, description, amount, cost, available){
	return await db.Product.findByIdAndUpdate(id, {
		name, description, amount, cost, available
	})
}

async function searchProduct(query){
	return await db.Product.find({ name: new RegExp(query, 'gi') });
}

async function getProducts(ids){
	var oids = ids.map(a=>db.toObjectId(a));
	return await db.Product.find({ '_id': { $in: oids } });
}

async function productsAvailable(items){
	var ids = items.map(a=>db.toObjectId(a.id));
	if(ids.length==0) return false;
	var products = await db.Product.find({ '_id': { $in: ids } });
	for(var i of items){
		var prod = products.find(a=>a._id==i.id);
		if(!prod) return false;
		if(prod.amount<i.amount) return false;
	}
	return true;
}

module.exports = {
	getProduct,
	getProducts,
	getProductList,
	getAllProducts,
	createProduct,
	deleteProduct,
	editProduct,
	searchProduct,
	productsAvailable
}