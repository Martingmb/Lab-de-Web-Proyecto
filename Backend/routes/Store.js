const express = require('express');
const Products = require('../lib/Products');
const Codes = require('../Codes');
var app = express.Router();

app.post('/products', (req, res)=>{
	var { offset, count } = req.body;
	offset = (offset || 0);
	count = (count || 20);
	
	Products.getProductList(offset, count).then(products=>{
		return res.response(products);
	}).catch(err=>{
		return res.error(Codes.unexpectedError);
	})
});

app.post('/products/search', (req, res)=>{
	var { query } = req.body;
	if(!query) return res.error(Codes.missingInfo);

	Products.searchProduct(query).then(products=>{
		return res.response(products);
	}).catch(err=>{
		return res.error(Codes.unexpectedError);
	})
});

app.post('/products/get', (req, res)=>{
	var { id } = req.body;
	if(!id) return res.error(Codes.missingInfo);

	Products.getProduct(id).then(product=>{
		if(!product) return res.error(Codes.noProduct);
		return res.response(product);
	}).catch(err=>{
		return res.error(Codes.noProduct);
	});
});

app.get('/product/image/:id', (req, res)=>{
	return res.redirect(301, 'https://via.placeholder.com/400x400');
});


app.post('/cart', (req, res)=>{
	var { items } = req.body;
	if(!items) return res.error(Codes.missingInfo);
	if(items.length==0) return res.response([]);

	var ids = items.map(a=>a.id);
	Products.getProducts(ids).then(products=>{
		var cart = [];
		for(var i of products){
			var cart_item = items.find(a=>a.id==i._id);
			if(!cart_item) continue;
			cart.push({
				id: i._id,
				name: i.name,
				cost: i.cost,
				amount: cart_item.amount,
				total: parseFloat(i.cost)*parseInt(cart_item.amount)
			});
		}
		return res.response(cart);
	}).catch(err=>{
		return res.error(Codes.unexpectedError);
	})
});

module.exports = app;