const express = require('express');
var app = express.Router();

app.post('/products', (req, res)=>{
	var { offset, count } = req.body;

});

app.post('/products/:id', (req, res)=>{

});

app.get('/product/image/:id', (req, res)=>{
	return res.redirect(301, 'https://via.placeholder.com/400x400');
});


app.post('/cart', (req, res)=>{

});

module.exports = app;