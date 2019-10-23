var db = require('./Database');

function getProduct(id){
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
	return await db.Product.find({ name: '/'+query+'/gi' });
}

async function getProducts(ids){
	var oids = ids.map(a=>db.toObjectId(a));
	return await db.Product.find({ '_id': { $in: oids } });
}

module.exports = {
	getProduct,
	getProducts,
	getProductList,
	getAllProducts,
	createProduct,
	deleteProduct,
	editProduct,
	searchProduct
}