var db = require('./Database');

async function getProduct(id){
	return await db.Product.findById(id);
}

async function getAllProducts(){
	var products = await db.Product.find()
	products.sort((a,b)=>b.available-a.available);
	return products;
}

async function getProductList(offset=0, count=9999, category=false){
	var where = {}
	if(category!==false){
		if(category==0){
			where.category = { siempreverde: true, rojo: false };
		}else{
			where.category = { siempreverde: false, rojo: true }
		}
	}
	var products = await db.Product.find(where).skip(offset).limit(count);
	return products;
}

async function createProduct(name, description, amount, cost, information, available, siempreverde, rojo, image){
	var newProduct = {
		name, description, amount, cost, available, image, ...information,
		category: {
			siempreverde: siempreverde,
			rojo: rojo
		}
	}
	var np = await db.Product.create(newProduct);
	return np._id;
}

async function deleteProduct(id){
	return await db.Product.findByIdAndDelete(id);
}

async function editProduct(id, name, description, amount, cost, information, available, siempreverde, rojo){
	return await db.Product.findByIdAndUpdate(id, {
		name, description, amount, cost, available, ...information,
		category: {
			siempreverde: (siempreverde===true),
			rojo: (rojo===true)
		}
	})
}

async function setImage(id, image){
	return await db.Product.findByIdAndUpdate(id, {
		image
	});
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
	setImage,
	productsAvailable
}