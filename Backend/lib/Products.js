var db = require('./Database');

function getProduct(id){
	return await db.Product.findById(id);
}

async function getProductList(offset=0, count=20){
	var products = await db.Product.find().skip(offset).limit(count);
	return products;
}

module.exports = {
	getProduct,
	getProductList
}