const express = require('express');
const jwt = require('jsonwebtoken');
const Codes = require('../Codes');
const Products = require('../lib/Products');
const fs = require('fs');
const Orders = require('../lib/Orders');
var app = express.Router();

const sign_key = fs.readFileSync(__dirname+'/../sign_key.key');

app.post('/checkout', (req, res)=>{
	var { items, name, email } = req.body;
	if(!items || !name || !email) return res.error(Codes.missingInfo);

	Products.productsAvailable(items).then(available=>{
		if(!available) return res.error(Codes.cartUnavailableProduct)
		Orders.createOrder(name, email, items).then(order=>{
			order.order_token = jwt.sign({ id: order.id }, sign_key);
			delete order.id;
			if(!order) return res.error(Codes.invalidOrder);
			return res.response(order);
		}).catch(err=>{
			return res.error(Codes.unexpectedError);
		})
	}).catch(err=>{
		return res.error(Codes.unexpectedError);
	})
});

app.post('/checkout/get', (req, res)=>{
	var { order_token } = req.body;
	if(!order_token) return res.error(Codes.missingInfo);

	var tkn = jwt.verify(order_token, sign_key);
	if(!tkn) return res.error(Codes.noOrder);
	var id = tkn.id;

	Orders.getOrder(id).then(order=>{
		if(!order) return res.error(Codes.noOrder)
		order.id = id;
		return res.response(order);
	}).catch(err=>{
		return res.error(Codes.unexpectedError);
	})
});

app.post('/checkout/address', (req, res)=>{
	var { order_token, street, number_interior, number_exterior, neighborhood, city, zipcode, state, country, phone } = req.body;
	var required = ['order_token', 'street', 'number_exterior', 'neighborhood', 'city', 'zipcode', 'state', 'country', 'phone'];
	for(var i of required){
		if(typeof req.body[i] === 'undefined' || req.body[i].length==0) return res.error(Codes.missingInfo);
	}

	if(!order_token) return res.error(Codes.missingInfo);
	var tkn = jwt.verify(order_token, sign_key);
	if(!tkn) return res.error(Codes.noOrder);
	var id = tkn.id;

	Orders.getOrderSimple(id, 'paid').then(order=>{
		if(!order) return res.error(Codes.noOrder);
		if(order.paid) return res.error(Codes.cantUpdatePaidOrder)
		Orders.setAddress(id, street, number_interior, number_exterior, neighborhood, city, zipcode, state, country, phone).then(done=>{
			if(!done) return res.error(Codes.unexpectedError);
			return res.response({ updated: true })
		}).catch(err=>{
			return res.error(Codes.unexpectedError);
		})
	}).catch(err=>{
		return res.error(Codes.unexpectedError);
	})
});

app.post('/checkout/payment', (req, res)=>{
	
});

module.exports = app;