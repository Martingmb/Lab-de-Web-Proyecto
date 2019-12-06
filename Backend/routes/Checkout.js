const express = require('express');
const jwt = require('jsonwebtoken');
const Codes = require('../Codes');
const Products = require('../lib/Products');
const fs = require('fs');
const sendgrid = require('@sendgrid/mail');
const Orders = require('../lib/Orders');
const Config = require('../lib/Config');
var app = express.Router();

sendgrid.setApiKey(Config.sendgrid)


const sign_key = fs.readFileSync(__dirname+'/../sign_key.key');

app.post('/checkout', (req, res)=>{
	var { items } = req.body;
	if(!items || items.length==0) return res.error(Codes.missingInfo);

	Products.productsAvailable(items).then(available=>{
		if(!available) return res.error(Codes.cartUnavailableProduct)
		Orders.createOrder(items).then(order=>{
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

app.post('/checkout/finish', (req, res)=>{
	var { order_token, name, email, street, number_interior, number_exterior, neighborhood, city, zipcode, state, country, phone } = req.body;
	var required = ['order_token', 'name', 'email', 'street', 'number_exterior', 'neighborhood', 'city', 'zipcode', 'state', 'phone'];
	country = 'Mexico';
	for(var i of required){
		if(typeof req.body[i] === 'undefined' || req.body[i].length==0) return res.error(Codes.missingInfo);
	}

	if(!order_token) return res.error(Codes.missingInfo);
	var tkn = jwt.verify(order_token, sign_key);
	if(!tkn) return res.error(Codes.noOrder);
	var id = tkn.id;

	Orders.getOrder(id).then(order=>{
		if(!order) return res.error(Codes.noOrder);
		if(order.paid) return res.error(Codes.cantUpdatePaidOrder)
		Orders.setAddress(id, name, email, street, number_interior, number_exterior, neighborhood, city, zipcode, state, country, phone).then(done=>{
			if(!done) return res.error(Codes.unexpectedError);
			var html = `<h2>Resumen de compra</h2>
			<ul>
				<li><b>No. de Orden</b>: ${id}</li>
				<li><b>Total a pagar</b>: ${order.total}</li>
				<li><b>Nombre</b>: ${name}</li>
				<li><b>Correo</b>: ${email}</li>
				<li><b>Dirección</b>: ${city}, ${zipcode}</li>
			</ul>
			<table style="width: 100%;">
				<thead>
					<th>Producto</th>
					<th>Cantidad</th>
					<th>Subtotal</th>
				</thead>
				<tbody>
			`
			for(var i of order.items){
				html += `<tr>
					<td style="text-align: center;">${i.name}</td>
					<td style="text-align: center;">${i.quantity}</td>
					<td style="text-align: center;">$${i.total}</td>
				</tr>`
			}
			html += `<tr>
					<td style="text-align: right; font-weight: 600;" colspan="2">Total</td>
					<td>$${order.total}</td>
				</tr>
				</tbody>
			</table>
			`

			var msg = {
				to: email,
				from: {
					name: 'Vivero de los Santos',
					email: 'a00819118@itesm.mx'
				},
				subject: 'Resumen de tu compra',
				text: 'Resumen de la compra',
				html
			}
			sendgrid.send(msg).catch(err=>{
				console.log(err.response.body.errors)
			})

			return res.response({ updated: true, id });
		}).catch(err=>{
			return res.error(Codes.unexpectedError);
		})
	}).catch(err=>{
		console.log(err);
		return res.error(Codes.unexpectedError);
	})
});

app.post('/order/get', (req, res)=>{
	var { id } = req.body;
	if(!id) return res.error(Codes.missingInfo);

	Orders.getOrder(id).then(order=>{
		if(!order) return res.error(Codes.noOrder)
		order.id = id;
		return res.response(order);
	}).catch(err=>{
		return res.error(Codes.unexpectedError);
	})
})

module.exports = app;